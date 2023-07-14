import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [doctors, setDoctors] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState();
    const [isAvailable, setIsAvailable] = useState(false);
    const dispatch = useDispatch();
    // login user data
    const getUserData = async () => {
        try {
            const res = await axios.post(
                "/api/v1/doctor/getDoctorById",
                { doctorId: params.doctorId },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // -----Booking Appointment-------
    const handleBooking = async() => {
        try {
            dispatch(showLoading());
            const res = axios.post('/api/v1/user/book-appointment',
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctors,
                    userInfo: user,
                    date: date,
                    time: time
                },
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
        )
        dispatch(hideLoading());
        if((await res).data.success) {
            message.success((await res).data.message);
        }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
        }
    }

// Check Booking Appointment Availibality
    const handleAvailability = async() => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/book-availability',
            {doctorId: params.doctorId, date, time},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if(res.data.success) {
                setIsAvailable(true);
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData();
        //eslint-disable-next-line
    }, []);
    return (
        <Layout>
            <h3 className="text-center mb-5">Booking Page</h3>
            <div className="container m-2">
                {doctors && (
                    <div>
                        <h4>
                            Dr.{doctors.firstName} {doctors.lastName}
                        </h4>
                        <h4>Fees : {doctors.fees}</h4>
                        <h4>
                            Timing : {doctors.timing && doctors.timing[0]} -{" "}
                            {doctors.timing && doctors.timing[1]}{" "}
                        </h4>
                        <div className="d-flex flex-column w-50">
                            <DatePicker format='DD-MM-YYYY' className="m-2"
                                onChange={(value) => setDate(moment(value).format('DD-MM-YYYY'))} />
                            <TimePicker format='HH:mm' className="m-2"
                                onChange={(value) => setTime(moment(value).format('HH:mm'))} />
                            <button className="btn btn-primary m-2" onClick={handleAvailability}>
                                Check Availability
                            </button>
                            <button className="btn btn-secondary m-2" onClick={handleBooking}>
                                Book Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default BookingPage;