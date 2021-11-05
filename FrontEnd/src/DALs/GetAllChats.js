import axios from "axios"

const GetAllChats = async (id) => { 
    let resp = await axios.get('http://localhost:7000/api/chats/')
    if(resp.data === null){return []}
    else{return resp.data}
}
export default GetAllChats