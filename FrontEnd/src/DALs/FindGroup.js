import axios from "axios"

const FindGroup = async (id) => {
    let resp = await axios.get('http://localhost:7000/api/group/findgroup/' + id)
    return resp
}
export default FindGroup