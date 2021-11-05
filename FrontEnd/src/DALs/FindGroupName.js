
const FindGroupName = (storeData, id) => {
    let temp = storeData.find(x => x._id === id)
    return temp
}
export default FindGroupName