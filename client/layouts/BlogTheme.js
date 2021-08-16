import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/auht.action";
import styles from "./BlogTheme.module.scss";

const BlogTheme = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authUserId = useSelector((state) => state.auth.userId);
  // useEffect(() => {
  //     if(!authUserId) router.push('/')
  // },[authUserId])
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div onClick={() => router.push("/")}>home</div>
        {authUserId && (
          <div onClick={() => router.push(`/user/${authUserId}`)}>myblogs</div>
        )}
        {authUserId && (
          <div
            onClick={() => {
              dispatch(logout());
              router.push("/login");
            }}
          >
            logout
          </div>
        )}
        {!authUserId && (
          <div
            onClick={() => {
              dispatch(logout());
              router.push("/login");
            }}
          >
            login
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default BlogTheme;
