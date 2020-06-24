import React,{ useContext } from 'react'
import { BarLoader } from 'react-spinners'
import { BlogDataContext } from '../../Components/AdminComponent'
import SinglePost from './SinglePost';

function AdminPost() {

    const blogDataContext = useContext(BlogDataContext);
    const state = blogDataContext.blogPostState
    console.log(state)
// you can use dispatch to make a reload button if you want to
    return (
        <div className='wrapper'>
            <div id='posts' className='posts'>
                {
                    state.loading ? <div className='loader'><BarLoader color='#E74C3C' loading={true} /></div> : 
                        state.blogs.reverse().map( blog => {
                        return <SinglePost key={blog._id} id={blog._id} details={blog} />
                    })
                }
                <pre><strong>End of Blogs...</strong></pre>
            </div>
            <div id='historyPost' className='historyPost'>
                <h2>Recent Post</h2>
                {
                    state.loading ? <div className='loader'><BarLoader color='#E74C3C' loading={true} /></div> :
                        state.blogs.map( blog => {
                            // console.log(blog)
                            if( state.blogs.indexOf(blog) <= 3 ){
                                return <a href={`#${blog._id}`} key={blog._id}><p>{blog.title}</p></a>
                            } else {
                                    console.log(blog)
                                    return null
                            }
                        })
                }
            </div>
        </div>
    )
}

export default AdminPost
