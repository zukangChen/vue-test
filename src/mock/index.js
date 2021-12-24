
import Mock from 'mockjs'
Mock.mock('api/user/login', {
  "status": 0,
  "data": {
    name: '张三'
  }
})
// post 返回一个对象
Mock.mock('api/user', 'post', {
  data: [
    {
      name: '小康',
      sex: '男'
    }
  ]
})

// post 返回一个方法的结果
Mock.mock("api/list", "post", () => {
  return [
    {
      name: '小康',
      sex: '男'
    }
  ]
})