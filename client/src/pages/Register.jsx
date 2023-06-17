import React from 'react'
import { Form, Input, message } from 'antd';
import '../styles/RegisterStyle.css'
import { Link } from 'react-router-dom';
import axios from 'axios';


const Register = () => {

     //form handler
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/register", values)
      if (res.data.success) {
        message.success("Register Successfully!")
        // navigate("/login");
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
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