import React from 'react'
import profile from './socialicons/profile.jpg'
import Contact from './Contact'
import UserInfo from './UserInfo'

function ProfilePic() {
    return (
        <React.Fragment>
            <div className='box-1'>
                <img src={profile} className='ProfileImage' alt='ProfileImage'></img>
                <pre><strong>Garvit Singh</strong></pre>
            </div>
            <div className='box-2'>
                <UserInfo />
                <Contact />
            </div>
        </React.Fragment>
    )
}

export default ProfilePic
