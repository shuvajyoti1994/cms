import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row, TimePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'

function ApplyDoctor() {
  const handleFinish = (values) => {
    console.log(values)
  }

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout='vertical' onFinish={handleFinish} className='m-3'>
        <h4 className="">Personal Details</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="First Name" name="firstName" required>
              <Input type='text' placeholder='Enter your first name' required/>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Last Name" name="lastName" required>
              <Input type='text' placeholder='Enter your last name' required/>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Phone No" name="phone" required>
              <Input type='text' placeholder='Enter your phone no' required/>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Email" name="email" required>
              <Input type='text' placeholder='Enter your email' required/>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website" required>
              <Input type='text' placeholder='Enter your website url' required/>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Address" name="address" required>
              <TextArea type='text' placeholder='Enter your address' required/>
            </Form.Item>
          </Col>
        </Row>

        <h4 className="">Professional Details</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Specialization" name="specialization" required>
              <Input type='text' placeholder='Enter your specialization' required/>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Experience" name="experience" required>
              <Input type='text' placeholder='Enter your experience' required/>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Fees" name="fees" required>
              <Input type='number' placeholder='Enter your fees' required/>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timing" name="timing" required>
              <TimePicker.RangePicker format="HH-mm" rules={[{require:true}]}/>
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <button className='btn btn-primary' type='submit'>Submit</button>
        </div>
      </Form>
    </Layout>
  )
}

export default ApplyDoctor