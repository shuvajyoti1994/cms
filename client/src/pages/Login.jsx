import React from 'react'
import { Form, Input } from 'antd';
import '../styles/RegisterStyle.css'
import { Link } from 'react-router-dom';

const Login = () => {
  const onFinishHandeler = (val) => {
    console.log(val)
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