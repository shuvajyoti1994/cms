import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({data}) => {
    const navigation = useNavigate()
  return (
    <>
    <div className="card m-2" style={{cursor: 'pointer'}}
     onClick={() => navigation(`/doctor/book-appointment/${data._id}`)}>
        <div className="card-header">
            Dr.{data.firstName} {data.lastName}
        </div>
        <div className="card-body">
            <p>
                <b>Specialization</b> {data.specialization}
            </p>
            <p>
                <b>Experience</b> {data.experience}
            </p>
            <p>
                <b>Fees</b> {data.fees}
            </p>
            <p>
                <b>Timing</b> {data.timing[0]} - {data.timing[1]}
            </p>
        </div>
    </div>
    </>
  )
}

export default DoctorList