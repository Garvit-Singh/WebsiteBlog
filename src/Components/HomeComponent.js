import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import HomeScreen from '../Screens/HomeScreen'
import HomePost from '../Screens/HomeScreen/HomePost';
import CommentHomeSection from '../Screens/HomeScreen/CommentsSection'

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

function HomeComponent() {
    
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
            <HomeScreen />
            <BlogDataContext.Provider value={{ blogPostState: blogPost , blogDispatch: dispatch }}>
              <HomePost />
            </BlogDataContext.Provider>
            <CommentHomeSection />
        </React.Fragment>
    )
}

export default HomeComponent
