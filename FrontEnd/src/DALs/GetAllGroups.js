import axios from "axios"

const GetAllGroups = async (id) => {
    let resp = await axios.get('http://localhost:7000/api/group/' + id)
    return resp
}
export default GetAllGroups