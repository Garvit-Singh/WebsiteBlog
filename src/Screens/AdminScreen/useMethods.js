import {useContext} from 'react'
import axios from 'axios'
import {TokenContext} from '../../ScreenRender'

function useMethods( props , like ) {

    const token = useContext(TokenContext)
    const id = props.details._id

    const Delete = () => {
        axios.delete(`https://blog-log-post.herokuapp.com/blogs/${id}`,
        {
            headers: {Authorization: 'Bearer '+token.token}
        })
            .then( result => {
                    console.log(result,'result from deleting method','token','token from delete')
                    document.activeElement.parentElement.parentElement.remove()
            })
            .catch( err => {
                console.log(err,'error in deleting by id','token','token from delete')
            });
    }

    const Likes = () => {
        if( like ) {
            axios.patch(`https://blog-log-post.herokuapp.com/likes/${id}`,{
                likes: props.details.likes 
                })
                .then( result => {
                    console.log(result,'result from Like patch')
                })
                .catch( err => {
                    console.log(err,'error in fetching by id')
                })
        } else {
            axios.patch(`https://blog-log-post.herokuapp.com/likes/${id}`,{
                likes: props.details.likes + 1
                })
                .then( result => {
                    console.log(result,'result from like patch')
                })
                .catch( err => {
                    console.log(err,'error in fetching by id')
                })
        }
    }

    return [ Delete , Likes]
}

export default useMethods
