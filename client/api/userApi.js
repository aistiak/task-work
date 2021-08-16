import axios from "axios"

const getUsers = async () =>{
    try{
        const res = await axios.get(`http://localhost:9000/users`)
        console.log(res)
        return res 
    }catch(err){
        console.log(err)
        return err 
    }
}

export default {
    getUsers 
}