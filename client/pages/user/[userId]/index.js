import { useRouter } from "next/dist/client/router";
import { div } from "prelude-ls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogTheme from "../../../layouts/BlogTheme";
import {
  getUserBlogs,
  postNewBlog,
  setBlogState,
} from "../../../store/blog/blog.action";
import useAsyncThunkDispatch from "../../../store/hooks/useAsyncDispatch";
import styles from "./blogs.module.scss";
export const getServerSideProps = async (context) => {
  const { userId } = context.query;
  console.log(userId);
  return { props: { userId } };
};

const UserBlogs = ({ userId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userBlogs = useSelector((state) => state.blog.blogs);
  const authUser = useSelector((state) => state.auth);

  const {
    asyncDispatch: getAsyncBlogs,
    isError,
    isLoading,
  } = useAsyncThunkDispatch(getUserBlogs);
  const {
    asyncDispatch: asyncBlogPost,
    isError: isBlogError,
    isLoading: isBlogPostLoading,
  } = useAsyncThunkDispatch(postNewBlog);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });
  useEffect(() => {
    getAsyncBlogs(userId);
  }, [userId]);
  return (
    <BlogTheme>
      <div className={styles.container}>
      {userBlogs.length == 0 && <div>no blogs yet </div>}
        {authUser.userId == userId && (
          <div className={styles.new__blog}>
            post a new blog <br></br>
            <textarea
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            ></textarea>
            <br></br>
            <button
              onClick={() => {
                asyncBlogPost(blog);
              }}
            >
              post
            </button>
          </div>
        )}
        <div>{/* show option to post blog if in own profile  */}</div>
        {isLoading ? (
          <>loading...</>
        ) : (
          <div className={styles.blogs}> 
            
            {userBlogs?.map((blog) => (
              <div key={blog._id}
                onClick={() => {
                  // goto blog detail
                  dispatch(setBlogState({ currentBlog: blog })).then((_) => {
                    router.push(`/blog/${blog._id}`);
                  });
                }}
              >
                {blog.content.substring(1,30)}  {'...'}
              </div>  
            ))}
          </div>
        )}
      </div>
    </BlogTheme>
  );
};

export default UserBlogs;
