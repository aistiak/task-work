import { blogActionTypes } from "./blog.actionTypes";

export const blogReducerInitialState = {
  blogs: [],
  currentBlog: {},
};

export const blogReducer = (blogState = blogReducerInitialState, action) => {
  switch (action.type) {
    case blogActionTypes.SET_BLOG_STATE:
      return { ...blogState, ...action.payload };
    default:
      return blogState;
  }
};
