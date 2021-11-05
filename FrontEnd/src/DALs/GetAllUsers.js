import axios from "axios"

const GetAllUsers = async () => {
    let resp = await axios.get('http://localhost:8001/api/auth/getusernames')
    return resp.data
}
export default GetAllUsers