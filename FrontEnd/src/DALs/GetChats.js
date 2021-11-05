import axios from "axios"

const GetChats = async (id) => { 
    let resp = await axios.get('http://localhost:7000/api/chats/' + id)
    if(resp.data === null){return []}
    else{return resp.data}
}
export default GetChats