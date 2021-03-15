var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel, ChatModel} = require('../db/models')
const filter = {password: 0, __v: 0}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//注册一个路由：用户注册
// router.post('/register', function (req, res) {
//   const {username, password} = req.body
//   if (username === 'admin') {
//     res.send({code: 1, msg: '此用户已存在!'})
//   } else {
//     res.send({code: 0, data: {id: 'abc123', username, password}})
//   }
// })
//注册路由
router.post('/register', function (req, res) {
  const {username, password, type} = req.body
  UserModel.findOne({username}, function (err, user) {
    if (user) {
      res.send({code: 1, msg: '此用户已存在'})
    } else {
      new UserModel({username, type, password: md5(password)}).save(function (error, user) {
        console.log(error, user);
        res.cookie('userId', user._id, {maxAge: 1000*60*60*24})
        const data = {username, type, id: user._id}
        res.send({code: 0, data})
      })
    }
  })
})
//登陆路由
router.post('/login', function (req, res) {
  const {username, password} = req.body
  UserModel.findOne({username, password: md5(password)}, filter, function (err, user) {
    if (user) {
      res.cookie('userId', user._id, {maxAge: 1000*60*60*24})
      res.send({code: 0, data: user})
    } else {
      res.send({code: 1, msg: '用户名或密码不正确'})
    }
  })
})
//更新路由
router.post('/update', function (req, res) {
  const userId = req.cookies.userId
  const user = req.body
  if (!userId) {
    return res.send({code: 1, msg: '请先登陆'})
  }
  UserModel.findByIdAndUpdate({_id: userId}, user, function (error, oldUser) {
    if (!oldUser) {
      res.clearCookie(userId)
      res.send({code: 1, msg: '请先登陆'})
    } else {
      const {username, type, _id} = oldUser
      const data = Object.assign({username, type, _id}, user)
      res.send({code: 0, data})
    }
  })
})
//获取用户信息路由(根据cookies)
router.get('/user', function (req, res) {
  const userId = req.cookies.userId
  if (!userId) {
    return res.send({code: 1, msg: '请先登陆'})
  }
  UserModel.findOne({_id: userId}, filter, function (error, user) {
    res.send({code: 0, data: user})
  })
})
//获取用户列表(根据type)
router.get('/userlist', function (req, res) {
  const {type} = req.query
  UserModel.find({type}, filter, function (error, users) {
    res.send({code: 0, data: users})
  })
})
//获取当前用户的聊天消息列表
router.get('/msglist', function (req, res) {
  const userId = req.cookies.userId
  UserModel.find(function (err, userDocs) {
    const users = userDocs.reduce((users, user) => {
      users[user._id] = {username: user.username, header: user.header}
      return users
    }, {})
    ChatModel.find({'$or': [{from: userId}, {to: userId}]}, filter, function (error, chatMsgs) {
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})
//修改制定消息为已读
router.post('/readmsg', function (req,res) {
  const from = req.body.from
  const to = req.cookies.userId
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    res.send({code: 0, data: doc.nModified})
  })
})


module.exports = router;
