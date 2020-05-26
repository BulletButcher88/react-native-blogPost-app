import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get-blog-post':
      return action.payload;
    case 'add-blog-post':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content
        }
      ]
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
    dispatch({ type: 'get_blog-posts', payload: response.data })
  }
};


const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content })

    // dispatch({ type: 'add-blog-post', payload: { title: title, content: content } })
    callback && callback()
  }
}

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete-blog-post', payload: id })
  }
}

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({ type: 'edit_blog-post', payload: { id, title, content } });
    callback && callback()
  }
}

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
  []
)