import axios from "axios"

const CreateGroup = async (obj) => {
    let resp = await axios.post('http://localhost:7000/api/group/creategroup', obj)
    return resp
}
export default CreateGroup