import blogApi from "../../api/blogApi";
import { blogActionTypes } from "./blog.actionTypes";

export const setBlogState = (state) => async (dispatch) => {
  dispatch({
    type: blogActionTypes.SET_BLOG_STATE,
    payload: state,
  });
};

export const getUserBlogs = (userId) => async (dispatch) => {
  const res = await blogApi.getBlogs(userId);
  const blogs = res?.data;
  if (blogs) dispatch(setBlogState({ blogs }));
  return res;
};

export const setCurrentBlog = (blogId) => async (dispatch) => {
  const res = await blogApi.getBlog(blogId);
  const blog = res.data;
  if (blog) dispatch(setBlogState({ currentBlog: blog }));
  return res;
};

export const postNewBlog =
  ({ title, content }) =>
  async (dispatch, getState) => {
    const token = getState().auth.token;
    const res = await blogApi.postBlog({ title, content, token });
    console.log(res);
    const newBlog = res.data;
    if (newBlog) {
      const userBlogs = getState().blog.blogs;
      userBlogs.unshift(newBlog);
      dispatch(setBlogState({ blogs: userBlogs }));
    }
    return res;
  };

export const postComment =
  ({ comment }) =>
  async (dispatch, getState) => {
    const auth = getState().auth;
    const token = auth.token;
    const blog = getState().blog;
    const params = {
      comment,
      token,
      blogId: blog.currentBlog._id,
    };
    console.log(params);
    const res = await blogApi.postComment(params);
    if (res.data) {
      const currentBlog = getState().blog.currentBlog;
      currentBlog.comments.unshift({
        comment: comment,
        userId: auth.userId,
      });
      dispatch(setBlogState({ ...currentBlog }));
    }
    return res;
  };

export const voteBlog =
  ({ type }) =>
  async (dispatch, getState) => {
    const blog = getState().blog.currentBlog;
    const auth = getState().auth;
    const token = auth.token;
    const res = await blogApi.vote({
      type,
      blogId: blog._id,
      token
    });
    const votes = res.data.votes;
    console.log(votes)
    if (votes) {
      blog.votes = votes;
      dispatch(setBlogState({ currentBlog : blog }));
    }
    return res 
  };
