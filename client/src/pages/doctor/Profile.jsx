import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Col, Form, Input, message, Row, TimePicker } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'
import {showLoading, hideLoading } from '../../redux/features/alertSlice'

const Profile = () => {
  const {user} = useSelector(state => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams()
  const dispatch = useDispatch();
  const navigation = useNavigate();

  // get doctor detail
  const getDoctorInfo = async() => {
    try {
      const res = await axios.post('/api/v1/doctor/getDoctorInfo',{userId:params.id},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success) {
        setDoctor(res.data.data)
        message.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      message.error('Something went wrong')
    }
  }

  useEffect(() => {
    getDoctorInfo();
  },[])

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/doctor/updateProfile', {...values, userId:user._id},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      dispatch(hideLoading());
      if(res.data.success) {
        message.success(res.data.message)
        navigation('/')
      } else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      message.error('Somthing went wrong')
    }
  }
  return (
    <Layout>
        <h1 className='text-center mb-5'>Manage Profile</h1>
        {doctor && (
          <Form layout='vertical' onFinish={handleFinish} className='m-3'>
          <h4 className="">Personal Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="First Name" name="firstName" >
                <Input type='text' placeholder='Enter your first name' />
              </Form.Item>
            </Col>
  
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Last Name" name="lastName" >
                <Input type='text' placeholder='Enter your last name' />
              </Form.Item>
            </Col>
  
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Phone No" name="phone" >
                <Input type='text' placeholder='Enter your phone no' />
              </Form.Item>
            </Col>
  
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Email" name="email" >
                <Input type='text' placeholder='Enter your email' />
              </Form.Item>
            </Col>
  
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website" >
                <Input type='text' placeholder='Enter your website url' />
              </Form.Item>
            </Col>
  
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Address" name="address" >
                <TextArea type='text' placeholder='Enter your address' />
              </Form.Item>
            </Col>
          </Row>
  
          <h4 className="">Professional Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Specialization" name="specialization" >
                <Input type='text' placeholder='Enter your specialization' />
              </Form.Item>
            </Col>
  
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Experience" name="experience" >
                <Input type='text' placeholder='Enter your experience' />
              </Form.Item>
            </Col>
  
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Fees" name="fees" >
                <Input type='number' placeholder='Enter your fees' />
              </Form.Item>
            </Col>
  
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timing" name="timing" >
                <TimePicker.RangePicker format="HH-mm" rules={[{require:true}]}/>
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <button className='btn btn-primary' type='submit'>Submit</button>
          </div>
        </Form>
        )}
    </Layout>
  )
}

export default Profile