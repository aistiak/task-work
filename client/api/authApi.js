import axios from "axios";

const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`http://localhost:9000/auth/login`, {
      email,
      password,
    });
    console.log(res);
    // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    return res;
  } catch (err) {
    return err;
  }
};

const logout = async () => {};
const signup = async ({name,email,password}) => {
  try {
    const res = await axios.post(`http://localhost:9000/auth/signup`,{
      name , email , password 
    })
    console.log(res)
    return res 
  }catch(err){
    console.log(err)
    return err 
  }
}
export default {
  login,
  logout,
  signup
};
