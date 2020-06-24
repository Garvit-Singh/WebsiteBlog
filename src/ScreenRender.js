import React, { useState } from 'react'
import axios from 'axios'
import AdminComponent from './Components/AdminComponent'
import HomeComponent from './Components/HomeComponent'

export const TokenContext = React.createContext()
function ScreenRender() {

    const [nav,setNav] = useState(false)
    const [token,setToken] = useState('')

    const navigator = () => {
        if(nav) {
            setNav(!nav)
        } else {
            const email = prompt('Email here');
            if( email ) {
                const password = prompt('Password here')
                console.log(email,password)
                axios.post(`https://blog-log-post.herokuapp.com/user/login`,{
                    email: email,
                    password: password
                })
                .then( res => {
                    console.log(res,'Response from login ScreenRender')
                    // console.log(token,'before token',res.data.token)
                    setToken(res.data.token)
                    // console.log(token,'after token')
                    setNav(!nav)
                })
                .catch( err => {
                    alert('Not Authorized')
                    console.log(err,'Error from login ScreenRender')
                    setNav(nav)
                })
            }
        }
    }
    return (
        <React.Fragment>
            <button onClick={navigator}>
                {
                    nav ? <i className='material-icons'>keyboard_arrow_left</i> : 
                    <i className='material-icons'>person</i>
                }
            </button>
            {
                nav ? 
                <TokenContext.Provider value={{ token: token }} >
                    <AdminComponent />
                </TokenContext.Provider>:
                <HomeComponent />
            }
        </React.Fragment>
    )
}

export default ScreenRender
