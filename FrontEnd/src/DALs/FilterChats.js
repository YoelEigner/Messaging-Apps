import GetAllChats from './GetAllChats';

const FilterChats = async(userId) => {
    let allChats = await GetAllChats()
    return allChats.filter(x => x.users.to === userId)
    // return chats.filter(x => x.username === username)
}
export default FilterChats