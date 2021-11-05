
const FindUserName = (allUsers, id) => {
    try {
        
        let temp = allUsers
        let user = temp.find(x => x.userId === id)
        return user.username
} catch (error) {       
        return id
    }

}

export default FindUserName