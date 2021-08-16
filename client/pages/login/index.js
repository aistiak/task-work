import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { login, signup } from "../../store/auth/auht.action";
import useAsyncThunkDispatch from "../../store/hooks/useAsyncDispatch";
// import Login from "../../components/Login";

import styles from "./login.module.scss";

const Auth = () => {
  const router = useRouter();
  const [step, setStep] = useState("login");
  const [msg, setMsg] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const {
    asyncDispatch: asyncLogin,
    isLoading,
    isError,
  } = useAsyncThunkDispatch(login);

  const {asyncDispatch:asyncSignup,isLoading:isSingupLoading,isError:isSignupError} = useAsyncThunkDispatch(signup);

  useEffect(() => {
    console.log(`is logged in ${isLoggedIn}`);
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn]);
  
  return (
    <div className={styles.container}>
      {step == "login" && (
        <div className={styles.login}>
          {isError && <div> user not found </div>}
          <div>
            <input
              type="text"
              placeholder="email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </div>
          <div>
            <button onClick={() => asyncLogin(state)} disabled={isLoading}> { isLoading? 'loggin in..':'login'} </button>
            <a href="#" onClick={() => setStep('signup')}>singup</a>
          </div>
          <div></div>
        </div>
      )}

      {step == "signup" && (
        <div className={styles.login}>
          { isSignupError && <div> Email is already in use</div>}
          { !isSignupError && <div> {msg}</div>}
          <div>
            <input
              type="text"
              placeholder="name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </div>
          <div>
            <button onClick={() => {
              asyncSignup(state).then( res => {
                console.log(res)
                if(res) {
                  setMsg(`signup success`)
                  setState({
                    name : '' , email : '' , password : ''
                  })
                }
              })
            }}>{ isSingupLoading ? 'signing up..': 'signup'}</button>
            <a href="#" onClick={() => setStep('login')}>login</a>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Auth;
