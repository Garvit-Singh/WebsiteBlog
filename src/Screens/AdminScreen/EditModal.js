import React,{ useState,useContext } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import useEditMethod from './useEditMethod'
import { TokenContext } from '../../ScreenRender'

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

function EditModal( props ) {

    const token = useContext(TokenContext)
    const id = props.data._id
    const [modal,setModal] = useState(false)
// props.details.title as initial value
    const [title, bindTitle, resetTitle ] = useEditMethod(props.data.title)
// props.details.content as initial value    
    const [content, bindContent, resetContent ] = useEditMethod(props.data.content)

    const Edit = (title , content) => {
        axios.patch(`https://blog-log-post.herokuapp.com/blogs/${id}`,{
                title: title,
                content: content
            },
            {
                headers: {Authorization: 'Bearer '+token.token}
            })
            .then( result => {
                console.log(result,'result from blogs for edit patch')
            })
            .catch( err => {
                console.log(err,'error in fetching by id')
            })
        }
    const submitHandler = e => {
        e.preventDefault()
        alert(`title: ${title} , content: ${content} , refresh after editing blog`)
        Edit( title , content )
        resetTitle(title)
        resetContent(content)
        setModal(!modal)
    }

    return (
    <React.Fragment>
        <button style={buttonStyle} onClick={() => setModal(!modal)}>
          <i className='material-icons'>create</i>
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
                    <textarea placeholder="Title here..." rows="3" style={inputTitleStyle}
                        {...bindTitle}
                        type='text' 
                    />
                </div>
                <div>
                    {/* <label>Content</label> */}
                    <textarea placeholder="Remember, be nice!" rows="29" style={inputContentStyle}
                        {...bindContent}
                        type='text' 
                    />
                </div>
                <button style={buttonStyle} onClick={() => setModal(!modal)} ><i className='material-icons'>clear</i></button>
                <button style={buttonStyle} type='submit'><i className='material-icons'>send</i></button>
            </form>
        </Modal>
    </React.Fragment>
    )
}

export default EditModal
