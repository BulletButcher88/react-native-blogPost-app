import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get-blog-posts':
      return action.payload;
    case 'edit_blog-post':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id
          ? action.payload
          : blogPost;
      });
    case 'delete-blog-post':
      return state.filter((blogPost) => blogPost.id !== action.payload)
    default:
      return state
  }
}

const getBlogPost = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/blogposts')
    dispatch({ type: 'get-blog-posts', payload: response.data })
  }
};


const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content })
    callback && callback()
  }
}

const deleteBlogPost = (dispatch) => {

  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: 'delete-blog-post', payload: id })
  }
}

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content })

    dispatch({
      type: 'edit_blog-post',
      payload: { id, title, content }
    });
    callback && callback()
  }
}

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
  []
)