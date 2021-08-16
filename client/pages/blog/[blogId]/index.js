import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogTheme from "../../../layouts/BlogTheme";
import { postComment, voteBlog } from "../../../store/blog/blog.action";
import useAsyncThunkDispatch from "../../../store/hooks/useAsyncDispatch";
import styles from './blog.module.scss'
export const getServerSideProps = async (context) => {
  const { blogId } = context.query;
  console.log(blogId);
  return { props: { blogId } };
};

const BlogDetail = ({ blogId }) => {
  const blog = useSelector((state) => state.blog.currentBlog);
  const votes = useSelector((state) => state.blog.currentBlog.votes || []);
  const upVotes = votes.filter((v) => v.type == "up");
  const downVotes = votes.filter((v) => v.type == "down");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [comment, setComment] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    asyncDispatch: asyncPostComment,
    isError: isError,
    isLoading,
  } = useAsyncThunkDispatch(postComment);
  useEffect(() => {
    console.log(blogId);
  }, [blogId]);
  const vote = (type) => {
    dispatch(voteBlog({ type }));
  };
  return (
    <BlogTheme>
      <div className={styles.container}>
          <div className={styles.title}>{blog.title}</div>
          <div className={styles.content}>{blog.content}</div>
          {!isLoggedIn && <div>login to vote </div>}
          <div className={styles.voting}>
            <div onClick={() => vote("up")}>upvotes  ( {upVotes?.length || 0} )</div>
            <div onClick={() => vote("down")}>downvotes ( {downVotes?.length || 0} )</div>
          </div>
          {isLoggedIn && (
            <div className={styles.post__comment}>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
              <br></br>
              <button
                onClick={() => {
                  asyncPostComment({
                    comment,
                  });
                }}
              >
                {" "}
                post{" "}
              </button>
            </div>
          )}
          <div className={styles.comments}>
            <div>comments</div>
            <div className={styles.comment__list}>
              {blog?.comments?.map((comment, idx) => (
                <div key={idx}> <i>{comment.userName || 'user' } - </i> {comment.comment}</div>
              ))}
            </div>

          </div>

      </div>
    </BlogTheme>
  );
};

export default BlogDetail;
