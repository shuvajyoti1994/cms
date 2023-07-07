import React from 'react'
import { Form, Input, message } from 'antd';
import axios from 'axios';
import '../styles/RegisterStyle.css'
import { Link, useNavigate } from 'react-router-dom';
// redux for loading
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';


const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const onFinishHandeler = async(value) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', value)
      dispatch(hideLoading())
      if(res.data.success) {
        localStorage.setItem('token', res.data.token)
        message.success('Login Successfully')
         navigation('/')
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      message.error('Something went wrong')
    }
  }

  return (
    <>
      <div className="form-contener">
        <Form layout='vertical' onFinish={onFinishHandeler} className='card p-4 br-2'>
          <h3>Login</h3>
          <Form.Item label='Email' name='email'>
            <Input type='text' required />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input type='password' required />
          </Form.Item>
          <button className='btn btn-primary' type='submit'>Login</button>
          <Link to='/register' className='mt-3'>Don't Register User? Please Register here</Link>
        </Form>
      </div>
    </>
  )
}

export default Login