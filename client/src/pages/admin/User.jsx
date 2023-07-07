import { message, Table } from 'antd';
import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'

const User = () => {
  const [users, setUsers] = useState([]);

  // get users
  const getUsers = async() => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success) {
        setUsers(res.data.data)
      }
    } catch (error) {
      message.error(`Can't Fetch User ${error}`)
    }
  }

  useEffect(() => {
   getUsers();
  }, [])
  

  // Fetching data in table
  const columns = [
    {
      title:'Name',
      dataIndex: 'name'
    },
    {
      title:'Email',
      dataIndex: 'email'
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (test, record) =>(
        <span>{record.isDoctor ? "Yes":"No"}</span>
      )
    },
    {
      title:'Actions',
      dataIndex: 'actions',
      render: (text, record) =>(
        <div className="d-flex">
          <button className='btn btn-danger'>Block</button>
        </div>
      )
    }
  ]
  return (
    <Layout>
        <h3>All User List</h3>
        <Table columns={columns} dataSource={users} key={users._id} />
    </Layout>
  )
}

export default User