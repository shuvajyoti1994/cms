import { message, Tabs } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'

const NotificationPage = () => {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleMarkRead = async() => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading())
            if(res.data.success) {
                message.success(res.data.message)
            } else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong')
        }
}

const handleMarkDelete = () => {

}

  return (
    <Layout>
        <h4 className="text-center p-3">Notification Page</h4>
        <Tabs>
            <Tabs.TabPane tab='Unread' key={0}>
                <div className="d-flex justify-content-end">
                    <h6 className='p-2' onClick={handleMarkRead} style={{cursor:'pointer'}}>Mark all Read</h6>
                </div>
                {
                    user?.notification.map((notification)=>(
                        <div className="card" onClick={notification.onClickPath}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab='Read' key={1}>
                <div className="d-flex justify-content-end">
                    <h6 className='p-2' onClick={handleMarkDelete}>Delete all Read</h6>
                </div>
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage