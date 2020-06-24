import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import ModalDiv from '../Screens/Modal/ModalDiv';
import AdminScreen from '../Screens/AdminScreen';
import AdminPost from '../Screens/AdminScreen/AdminPost';
import CommentAdminSection from '../Screens/AdminScreen/CommentsSection';

export const BlogDataContext = React.createContext()

const initialState = {
    loading: true,
    error: '',
    blogs: []
}

const reducer = (state ,action ) => {
    switch(action.type) {
        case 'success' :
            return {
                loading: false,
                error: '',
                blogs: action.payload
            }
        case 'failure' :
            return {
                loading: false,
                error: 'Somthing went wrong!',
                blogs: []
            }
        default:
            return state
    }
}

function AdminComponent() {
    
    const [blogPost , dispatch ] = useReducer(reducer, initialState)
  
    useEffect(() => {
      axios.get(`https://blog-log-post.herokuapp.com/blogs`)
      .then( response => {
        //   console.log(response,'response')
          dispatch({type: 'success', payload: response.data})
      })
      .catch( error => {
          dispatch({type: 'failure'})
      });
  },[])

    return (
        <React.Fragment>
            <ModalDiv />
            <AdminScreen />
            <BlogDataContext.Provider value={{ blogPostState: blogPost , blogDispatch: dispatch }}>
              <AdminPost />
            </BlogDataContext.Provider>
            <CommentAdminSection />
        </React.Fragment>
    )
}

export default AdminComponent
