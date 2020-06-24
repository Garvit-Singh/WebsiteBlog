import React,{ useState, useContext } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import useEditMethod from '../AdminScreen/useEditMethod'
import {TokenContext} from '../../ScreenRender'

Modal.setAppElement('#root')

const buttonStyle = {
    margin: '0px'
}
const inputTitleStyle = {
    position: 'relative',
    width: '100%',
    font: '20px sans-serif',
    border: '0px',
    outline: 'none',
    resize: 'none'
}
const inputContentStyle = {
    position: 'relative',
    height: '80%',
    width: '100%',
    font: '16px sans-serif',
    border: '0px',
    outline: 'none',
    resize: 'none'
}

function ModalDiv() {

    const token = useContext(TokenContext)
    const [modal,setModal] = useState(false)
    const [title, bindTitle, resetTitle ] = useEditMethod('')
    const [content, bindContent, resetContent ] = useEditMethod('')
    const [blogImage, setBlogImage] = useState(false)

    const addUser = () => {
      const email = prompt('Email here');
      const password = prompt('Password here')
      axios.post(`https://blog-log-post.herokuapp.com/user/signup`,{
        email: email,
        password: password
      })
      .then( res => {
        console.log(res,'Response User Created')
        console.log(res.status,'res.status')
        if(res.status === 201) {
          alert('User Created')
        } 
        if(exports.status === 422) {
          alert('User Exist')
        }
      })
      .catch( err => {
        console.log(err,'Error in creating user')
        alert('User can not created')
      })
    }

    const submitHandler = e => {

        e.preventDefault()
        if(title === '') {
            console.log('inside if')
            alert(`Title is required`)
        } else {
            console.log('inside else')
            const fd = new FormData()
            fd.append('title',title)
            fd.append('content',content)
            fd.append('likes',0)
            if(blogImage) {
                fd.append('blogImage',blogImage,blogImage.name)
            }
            console.log(fd,'file in if')
            axios.post(`https://blog-log-post.herokuapp.com/blogs`,
            fd,
            {
              headers: {Authorization: 'Bearer '+token.token}
            })
                .then( response => {
                    console.log(response,'Response from TestingAgain.js')
                })
                .catch( error => {
                    console.log(error , 'Error from TestingAgain.js')
                })
            resetTitle('')
            resetContent('')
        }
        console.log('leaving submitHandler')
        // alert(`title: ${title} , content: ${content} , refresh after editing blog`)
        setModal(!modal)
    }

    return (
      <div>
        <button style={buttonStyle} onClick={() => setModal(!modal)}>
          <i className='material-icons'>chat_bubble_outline</i>
        </button>
        <Modal 
          isOpen={modal} 
          onRequestClose={ () => setModal(!modal)}
          style={
            {
              overlay: {
                backgroundColor: '#D5D8DC'
              }
            }
          }
        >
          <form onSubmit={submitHandler}>
            <div>
                {/* <label>Title</label> */}
                <textarea placeholder="Title Here..." rows="3" style={inputTitleStyle}
                    {...bindTitle}
                    type='text' 
                />
            </div>
            <div>
                {/* <label>Content</label> */}
                <textarea placeholder="Content Here..." rows="29" style={inputContentStyle}
                    {...bindContent}
                    type='text' 
                />
            </div>
            <div>
                <label>BlogImage</label>
                <input type='file' onChange={ e => {
                    console.log(e.target.files[0])
                     setBlogImage(e.target.files[0])
                }} />
            </div>
            <button style={buttonStyle} onClick={() => setModal(!modal)} ><i className='material-icons'>clear</i></button>
            <button style={buttonStyle} type='submit'><i className='material-icons'>send</i></button>
          </form>
          {/* <h2>Title</h2>
          <p>Content</p>
          <button onClick={() => setModal(!modal)} >Close</button> */}
        </Modal>
        <button style={buttonStyle} onClick={addUser}><i className='material-icons'>add</i></button>
        <button style={buttonStyle}><i className='material-icons'>delete</i></button>
      </div>
    )
}

export default ModalDiv
