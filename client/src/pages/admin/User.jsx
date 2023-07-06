import { message } from 'antd';
import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'

const User = () => {
  const [users, setUsers] = useState([]);

  // get users
  const getUsers = async() => {
    try {
      const res = axios.get('/api/v1/admin/getAllUsers', {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if((await res).data.success) {
        setUsers((await res).data.data)
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
      title: 'Created At',
      dataIndex: 'createdAt'
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
        <h4>All User</h4>
    </Layout>
  )
}

export default User