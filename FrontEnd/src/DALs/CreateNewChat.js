import axios from "axios"
let config = {
    headers: {
        'Content-Type': 'application/json'
    }
}
const CreateNewChat = async (obj) => {
    let resp = await axios.post('http://localhost:7000/api/chats/firstchat/', obj, config)
    return resp
}
export default CreateNewChat