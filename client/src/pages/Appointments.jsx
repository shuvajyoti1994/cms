import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { message, Table } from 'antd'
import moment from 'moment'

const Appointments = () => {
    const [appointments, setAppointments] = useState([])

    const getAppointments = async() => {
        try {
            const res = await axios.get('/api/v1/user/user-appointments',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setAppointments(res.data.data)
            }
            
        } catch (error) {
            message.error(error)
        }
    }

    useEffect(() => {
        getAppointments();
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.doctorId.firstName} {record.doctorId.lastName}</span>
            )
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            render: (text, record) => (
                <span>{record.doctorInfo.phone}</span>
            )
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} &nbsp;
                    {moment(record.time).format('HH:mm')}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
    ]

  return (
    <Layout>
        <h1>Appointments List</h1>
        <Table columns={columns} dataSource={appointments}/>
    </Layout>
  )
}

export default Appointments