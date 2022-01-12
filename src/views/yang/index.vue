<template>
  <div class="index">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'index',

  components: {
  },

  data () {
    return {
      list: [
        {name: '小明', children: [{name: '小明2', children: [{name: '小明3'}]}, {name: '小刚2', children: [{name: '小刚3'}]}]},
        {name: '小王', children: [{name: '小王2'}]}
      ],
      result: []
    }
  },

  props: {
  },
  created() {
    let floor = 1
    let copyFloor = 1
    let arr2 = [{ name: '3-1', child: [{ name: '3-2', child: [{ name: '3-3', child:[{name: '3-4'}]}, { name: '3_3', child:[{name: '3_4', child:[{name: '3-5'}]}]}] }] }]
    let arr = [{ name: '1-1', child: [{ name: '1-2', child: [{ name: '1-3', child: [{name: '1-4'}] }, { name: '1_3', child: [{name: '1_4'}] }] }] }, { name: '2-1', child: [{name: '2-2'}, {name: '2_2'}] }, { name: '3-1', child: [{ name: '3-2', child: [{ name: '3-3', child:[{name: '3-4'}]}, { name: '3_3', child:[{name: '3_4', child:[{name: '3-5'}]}]}] }] }]
    console.log('arr::',arr)
    function getFloor(arr) {
      for (let i=0; i< arr.length; i++) {
        // if ()
        if (arr[i].child) {
          debugger
          copyFloor++
          getFloor(arr[i].child)
        }
        floor = copyFloor > floor ? copyFloor : floor
        copyFloor = 1
        console.log('floor', floor)
      }
    }
    getFloor(arr2)
    let result = numberArr(4)
    let curIndex = 0
    function numberArr(n) {
      let numberArr = new Array()
      for (let i = 0; i < n; i++) {
        numberArr[i] = new Array()
      }
      return numberArr
    }
    function flatArr(arr) {
      arr.forEach((item) => {
        const item1 = JSON.parse(JSON.stringify(item))
        if (item && item.child) {
          result[curIndex + 1] = [...result[curIndex + 1], ...item1.child]
        }
        if (curIndex === 0) result[curIndex].push(item1)
      })
      curIndex++
      if (curIndex < 3) flatArr(result[curIndex])
    }
    flatArr(arr)
    console.log('结果：', result)
  },
  mounted () {
    // let maxFloor = this.getMaxFloor(this.list)
    // console.log('the max floor', maxFloor)
    // axios.get('https://www.fastmock.site/mock/f01872f2e158122edeb3b560dd91c610/mock/getMock').then(res => {
    //   console.log('res', res)
    // })
    // axios.post('http://yapi.xbongbong.com/mock/12/test', {id: 1}).then(res => {
    //   console.log('smile', res)
    // })
    axios.get('http://localhost:8082').then((res) => { // 这个接口是之前用nginx测试跨域
      console.log('local', res)
    })
  },

  methods: {
    getMaxFloor (arr) {
      let maxFloor = 0
      arr.forEach(item => {
        const jsonItem = JSON.stringify(item)
        let itemFloor = jsonItem.match(/\bchildren\b/g)
        if (itemFloor && itemFloor.length > maxFloor) maxFloor = itemFloor.length
      })
      return maxFloor + 1
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
