import { Spin } from 'antd'
import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import '../App.css'
{/* <ScaleLoader color="#36d7b7" /> */}
const Spinner = () => {
    return (
        <>
        <Spin className='spinner' size='large' />
        </>
    )
}

export default Spinner