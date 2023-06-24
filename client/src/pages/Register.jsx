import React from 'react'
import { Form, Input, message } from 'antd';
import '../styles/RegisterStyle.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';


const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate()

     //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/register", values)
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully!")
        navigation("/login");
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrong")
    }
  };

    return (
        <>
            <div className="form-contener">
                <Form layout='vertical' onFinish={onfinishHandler} className='card p-4 br-2'>
                    <h3>Registretion Form</h3>
                    <Form.Item label='Name' name='name'>
                        <Input type='text' required />
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input type='text' required />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' required />
                    </Form.Item>
                    <button className='btn btn-primary' type='submit'>Register</button>
                    <Link to='/login' className='mt-3'>Already Register! Please Login here</Link>
                </Form>
            </div>
        </>
    )
}

export default Register