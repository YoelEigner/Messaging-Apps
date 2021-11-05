const express = require("express");
const router = express.Router();
const { GetAll, CreateUser, NewMessage, FindById, FirstMessage, GetUserNames, FindGroupById, FindGroupsByUserId, CreateGroup, NewGroupMessage, LeaveGroup } = require('../BLs/BL')
const Schema = require('../mongoDB/GroupSchema')

router.route('/:id').get((async (req, res) => {
    let resp = await FindGroupsByUserId(Schema, req.params.id)
    res.json(resp);
}))

router.route('/creategroup').post((async (req, res) => {
    let resp = await CreateGroup(Schema, req.body)
    res.json(resp);
}))

router.route('/newmsg/:id').put((async (req, res) => {
    let resp = await NewGroupMessage(Schema, req.params.id, req.body)
    res.json(resp)
    
}))

router.route('/leavegroup/:id').put( async (req, res) => {
    let resp = await LeaveGroup(Schema,req.params.id, req.body)
    res.json(resp)
})

router.route('/findgroup/:id').get( async (req, res) => {
    let resp = await FindGroupById(Schema,req.params.id)
    res.json(resp)
})


module.exports = router;