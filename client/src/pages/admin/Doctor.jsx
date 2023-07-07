import Layout  from '../../components/Layout'
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { message, Table } from 'antd';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
// get doctor
  const getDoctors = async() => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success) {
        setDoctors(res.data.data)
        // console.log(doctors)
      }
    } catch (error) {
      message.error(`Can't Fetch Doctors ${error}`)
    }
  }

  useEffect(() =>{
    getDoctors();
  }, [])

  const columns = [
    {
      title:'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title:'Email',
      dataIndex: 'email'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt'
    },
    {
      title:'Actions',
      dataIndex: 'actions',
      render: (text, record) =>(
        <div className="d-flex">
          {record.status === 'pending' ? <button className='btn btn-success'>Approve</button>
          :<button className='btn btn-danger'>Dicline</button>}
        </div>
      )
    }
  ]

  return (
    <Layout>
        <h4 className='text-center mb-5'>All Doctors List</h4>
        <Table columns={columns} dataSource={doctors} key={doctors._id} />
    </Layout>
  )
}

export default Doctor;