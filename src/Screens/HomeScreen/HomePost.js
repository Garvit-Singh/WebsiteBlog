import React,{ useContext } from 'react'
import { BarLoader } from 'react-spinners'
import { BlogDataContext } from '../../Components/HomeComponent'
import SinglePost from './SinglePost'

function HomePost() {

    const blogDataContext = useContext(BlogDataContext);
    const state = blogDataContext.blogPostState
    // console.log(state,'context from HomePost')

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
                        // console.log(state.blogs)
                        state.blogs.map( blog => {
                            if( state.blogs.indexOf(blog) <= 4 ){
                                return <a href={`#${blog._id}`} key={blog._id}><p>{blog.title}</p></a>} else {
                                    return null
                                }
                        })
                }
            </div>
        </div>
    )
}

export default HomePost
