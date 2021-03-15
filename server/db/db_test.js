/**/
/*1 链接数据库*/
//引入mongooos
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')
//连接指定数据库
mongoose.connect('mongodb://localhost:27017/gzhipin_test')
//获取连接对象
const conn = mongoose.connection
//绑定连接完成的监听
conn.on('connected', function () {
  console.log('数据库链接成功')
})

/*2得到对应特定集合的Model*/
//定义schema
const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  header: {type: String}
})
//定义Model
const UserModel = mongoose.model('user', userSchema)

/*3通过Model或其实例对象对集合数据进行CRUD操作*/
//通过Model实例的save()添加数据
function testSave() {
  const userModel = new UserModel({username: 'bob', password: md5('456'), type: 'laoban'})
  userModel.save(function (error, user) {
    console.log('save()', error, user)
  })
}
// testSave()

//通过Model的find()/findOne()查询多个或一个数据
function testFind() {
  UserModel.find(function (error, users) {
    console.log('find()', error, users)
  })
  UserModel.findOne({_id: '604346fd9629f380dc625779'}, function (error, user) {
    console.log('findOne', error, user)
  })
}
// testFind()

//通过 Model 的 findByIdAndUpdate()更新某个数据
function testUpdate() {
  UserModel.findByIdAndUpdate({_id: '604346fd9629f380dc625779'}, {username: 'jack'},
    function (error, oldUser) {
        console.log('findByIdAndUpdate', error, oldUser)
    })
}
// testUpdate()

//通过 Model 的 remove()删除匹配的数据
function testRemove() {
  UserModel.remove({_id: '604346fd9629f380dc625779'}, function (error, doc) {
       console.log('remove()', error, doc)
  })
}
// testRemove()
