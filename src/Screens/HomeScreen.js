import React from 'react'
import './CommonFiles/HomeCheck.css'
import ProfilePic from './CommonFiles/ProfilePic'

function HomeScreen() {
    console.log('Home screen')
    return (
        <div className='header'>
            <ProfilePic />
        </div>
    )
}

export default HomeScreen
