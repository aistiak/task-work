import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogTheme from "../layouts/BlogTheme";
import useAsyncThunkDispatch from "../store/hooks/useAsyncDispatch";
import { getUsers } from "../store/user/users.action";
import styles from './userList.module.scss'
const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter() ;
  const users = useSelector(state => state.user.users)
  const {
    asyncDispatch: getAsyncUsers,
    isError,
    isLoading,
  } = useAsyncThunkDispatch(getUsers);
  useEffect(() => {
    getAsyncUsers();
  }, []);
  return <BlogTheme>
    {isLoading ? <>loading...</> : <>
      <div className={styles.container}>
          <div>list of users </div>
          {users?.map( user => (
            <div key={user._id} onClick={() => {
              router.push(`/user/${user._id}`)
            }}>
              {user?.name} - {user?.email}
            </div>
          ))}

      </div>
    
    </>}
  </BlogTheme>;
};

export default Home;
