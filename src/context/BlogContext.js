import React, { useReducer } from 'react'
import createDataContext from './createDataContext'


const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add-blog-post':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content
        }
      ]
    case 'edit_blogpost':
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


const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({ type: 'add-blog-post', payload: { title: title, content: content } })
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
    dispatch({ type: 'edit_blogpost', payload: { id, title, content } });
    callback && callback()
  }
}

// const editBlogPost = (dispatch) => {
//   return (id, title, content, callback) => {
//     dispatch({ type: 'edit_blogpost', payload: { id, title, content } });
//     if (callback) {
//       callback();
//     }
//   };

// };

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ title: 'TEST TITLE', content: "TEST CONTENT", id: 1 }]
)