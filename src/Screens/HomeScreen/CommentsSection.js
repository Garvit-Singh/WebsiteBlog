import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../CommonFiles/HomeCheck.css'

const btn = {
    margin: '4px',
    border: 'none',
    outline: 'none'
}
const nameStyle = {
    color: '#E74C3C'
}
const NameStyle={
    outline: 'none',
    border: 'none',
    width: '40%',
    margin: '4px',
    font: '16px sans-serif',
    resize: 'none'
}
const commentStyle={
    outline: 'none',
    border: 'none',
    width: '98%',
    margin: '4px',
    font: '16px sans-serif',
    resize: 'none'
}

function CommentsSection() {

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({_id: 0,name: '', newcmt: ''})
    useEffect(() => {
        axios.get(`https://blog-log-post.herokuapp.com/comments`)
        .then( response => {
            // console.log(response,'Response from Comments Section')
            setComments(response.data)
        })
        .catch(error => {
            console.log(error,'Error from Comments Section')
        })
    },[])

    const postComment = e => {
        e.preventDefault()
        if(newComment.name === '' && newComment.newcmt === '') {
            alert('Both fields are required')
        } else {
            axios.post(`https://blog-log-post.herokuapp.com/comments`,{
                name: newComment.name,
                comment: newComment.newcmt
            })
            .then( respone => {
                // console.log(respone,'response form comment post')
                setNewComment({_id: 0,name: '', newcmt: ''})
                setComments([...comments,respone.data])
            })
            .catch( err => {
                console.log(err,'error from comment post')
            })
        }
    }
    return (
        <React.Fragment>
            <h2 className='headerStyle'>
                Comments Section
            </h2>
            <div className='CommentSection'>
                {
                    comments.map( comment => {
                        return <div key={comment._id} className='SingleComment'>
                            <p>{comment.comment}</p>
                            <p style={nameStyle}>--@{comment.name}</p>
                        </div>
                    })
                }
            </div>
            <div className='inputCommentSec'>
                <button style={btn} onClick={postComment}><i className='material-icons'>add_comment</i></button>
                <textarea style={NameStyle} rows='1' type='text' value={newComment.name} 
                    onChange={e => setNewComment({...newComment,name: e.target.value})} 
                    placeholder='Name' 
                />
                <textarea style={commentStyle} rows='3' type='text' value={newComment.newcmt} 
                    onChange={e => setNewComment({...newComment,newcmt: e.target.value})} 
                    placeholder='Comment' 
                />
            </div>
        </React.Fragment>
    )
}

export default CommentsSection
