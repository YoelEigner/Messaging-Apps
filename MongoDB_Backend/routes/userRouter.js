const express = require("express");
const router = express.Router();
const { GetAll, CreateUser, NewMessage, FindById, FirstMessage, GetUserNames } = require('../BLs/BL')
const Schema = require('../mongoDB/Schema')

router.route('/').get((async (req, res) => {
    let resp = await GetAll()
    res.json(resp);
}))

router.route('/newuser').post((async (req, res) => {
    let resp = await CreateUser(Schema,req.body)
    res.json(resp)
}))
router.route('/firstchat').post((async (req, res) => {
    let respNewChat = await FirstMessage(Schema, req.body)
    res.json(respNewChat)
}))


router.route('/:id').get((async (req, res) => {
    let resp = await FindById(Schema, req.params.id)
    res.json(resp)
}))



router.route('/newmsg/:id').put((async (req, res) => {
    let resp = await NewMessage(Schema, req.params.id, req.body)
    res.json(resp)
}))
module.exports = router;