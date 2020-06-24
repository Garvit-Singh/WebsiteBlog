import React,{ useState} from 'react'
import useMethod from './useMethods'
import EditModal from './EditModal'

const likeColor = {
    color: '#E74C3C'
}

function SinglePost( props ) {
    
    const [like, setLike] = useState(false)
    const [ Delete , Likes ] = useMethod( props , like)

    // console.log(props,'props',like,'like')
    return (
        <React.Fragment>
            <div className='SinglePost'>
                <div className='postContent'>
                    {/* image */}
                    {
                        props.details.blogImage ? 
                        <img src={'https://blog-log-post.herokuapp.com/'+props.details.blogImage} alt='BlogImage' /> :
                        null
                    }
                    {/* title */}
                    <h3>{props.details.title}</h3>
                    {/* content */}
                    <pre>{props.details.content}</pre>
                </div>
                <div className='postButtons'>
                    <button onClick={() => {
                        setLike(!like);
                        Likes()
                    }}>
                        {
                            like ? <i className='material-icons' style={likeColor}>favorite</i> :
                                        <i className='material-icons'>favorite_border</i>
                        }
                    </button>
                    <button>
                        {`${props.details.likes}`}
                    </button>
                    <EditModal data={props.details} />
                    <button onClick={() => {Delete()}}>
                        <i className='material-icons'>delete</i>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SinglePost
