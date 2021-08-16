import axios from "axios";

const getBlogs = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:9000/blog/${userId}`);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const getBlog = async (blogId) => {
  const res = await axios.post();
  console.log(res);
  return res;
};
const postBlog = async ({ token, content, title }) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `http://localhost:9000/blog/create`,
      {
        content,
        title,
      },
      {
        headers,
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const vote = async ({type,token,blogId}) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(`http://localhost:9000/blog/vote`,{
      type ,
      blogId
    },{
      headers
    });
    return res 
  } catch (err) {
    console.log(err);
    return err;
  }
};
const postComment = async ({comment,blogId,token}) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(`http://localhost:9000/blog/comment`,{
      comment ,
      blogId 
    },{
      headers
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default {
  postComment,
  getBlogs,
  postBlog,
  vote,
  getBlog,
};
