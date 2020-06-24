import React from 'react'
import fb from './socialicons/Facebook.png'
import Ig from './socialicons/Instagram.png'
import Tw from './socialicons/Twitter.png'
import Li from './socialicons/Linkedin.png'

function Contact() {
    return (
        <div className='contact'>
            <a href='https://m.facebook.com/garvit.singh.10236?ref=bookmarks' alt='facebook'>
                <img src={fb} className='contactImage' alt='Facebook' ></img>
            </a>
            <a href='https://www.instagram.com/garvit_jadon/' alt='Instagram'>
                <img src={Ig} className='contactImage' alt='Instagram' ></img>
            </a>
            <a href='#3' alt='Twitter'>
                <img src={Tw} className='contactImage' alt='Twitter' ></img>
            </a>
            <a href='#4' alt='Linkdein'>
                <img src={Li} className='contactImage' alt='Linkdein' ></img>
            </a>
        </div>
    )
}

export default Contact
