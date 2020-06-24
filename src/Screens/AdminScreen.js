import React from 'react'
import './CommonFiles/HomeCheck.css'
import ProfilePic from './CommonFiles/ProfilePic'

function AdminScreen() {
    console.log('Admin screen')
    return (
        <div className='header'>
            <ProfilePic />
        </div>
    )
}

export default AdminScreen
