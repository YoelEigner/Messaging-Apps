const Schema = require('../mongoDB/Schema')
const { schema } = require('../mongoDB/Schema')
// const Schema = require('../mongoDB/Schema')

exports.GetAll = (Schema) => {
    return new Promise((resolve, reject) => {
        Schema.find({}, (err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        })
    })
}

exports.CreateUser = (Schema, obj) => {
    return new Promise((resolve, reject) => {
        Schema.create(obj, ((err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        }))
    })
}

// exports.FindById = (Schema, id) => {
//     return new Promise((resolve, reject) => {
//         Schema.find({ $or: [{ "users.from": id  },  { "users.to": id } ] }, (err, data) => {
//             if (err) { reject(err) }
//             else {
//                 resolve(data)
//             }
//         })
//     })
// }
exports.FindById = (Schema, id) => {
    return new Promise((resolve, reject) => {
        Schema.find({ 'users': id }, (err, data) => {
            if (err) { reject(err) }
            else {
                resolve(data)
            }
        })
    })
}


exports.NewMessage = (Schema, id, obj) => {
    return new Promise(async (resolve, reject) => {
        Schema.findByIdAndUpdate(id, { "$push": { "chats": obj } }, (err, doc) => {
            if (err) { reject(err) }
            else { 
                console.log(obj)

                resolve(doc) }
        })

    })
}

exports.FirstMessage = (Schema, obj) => {
    return new Promise((resolve, reject) => {
        Schema.create(obj, ((err, data) => {
            if (err) { reject(err) }
            else {

                resolve(data)
            }
        }))
    })
}
///groups
exports.FindGroupsByUserId = (Schema, id) => {
    return new Promise((resolve, reject) => {
        Schema.find({ 'users': id }, (err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        })
    })
}

exports.FindGroupById = (Schema, id) => {
    return new Promise((resolve, reject) => {
        Schema.find({ _id: id }, (err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        })
    })
}

exports.CreateGroup = (Schema, obj) => {
    return new Promise((resolve, reject) => {
        Schema.create(obj, ((err, data) => {
            if (err) { reject(err) }
            else { resolve(data) }
        }))
    })
}

exports.NewGroupMessage = (Schema, id, obj) => {
    return new Promise(async (resolve, reject) => {
        Schema.findByIdAndUpdate(id, { "$push": { "chats": obj } }, (err, doc) => {
            if (err) { reject(err) }
            else { resolve(doc) }
        })

    })
}
exports.LeaveGroup = (Schema, id, obj) => {
    return new Promise((resolve, reject) => {
        Schema.findByIdAndUpdate(id, { "users": obj }, (err, data) => {
            if (err) { reject(err) }
            else {
                resolve(data)
            }
        })
    })
}