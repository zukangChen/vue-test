<template>
<!-- 防抖节流、table布局 -->
  <div class="wrapper">
    <router-link-to>跳到穿透页面</router-link-to>
    <div class="jicheng"  @click="btn">
      请点击我
    </div>
    <div class="test" >{{num}}</div>
    <button @click="clik">开始</button>
    <!-- table的原生添加 -->
    <div id="table" ref="table"></div>
    <table class="grid"></table>
    <!-- less样式 -->
    <div class="less">
      <div class="content">

      </div>
    </div>
    <div class="content"></div>
    <!-- less的延伸 -->
    <ul>hello</ul>
    <div class="inline">
      <ul>world</ul>
    </div>
  </div>
</template>

<script>
import mixin from './mixins/mixin'
export default {
  components: {},
  props: {},
  data() {
    return {
      a: 6,
      name: "kk",
      num: 1,
      timer: null
    };
  },
  mixins: [mixin],
  methods: {
    btn() {
      console.log(this);
      let obj = {
        name: "obj",
        A: function() {
          () => {
            console.log(this);
          };
        },
        B: () => {
          console.log(this);
          // console.log(this.name)
        }
      };
      obj.A(); //输出 obj
      obj.B(); //输出 this
    },
    jicheng() {
      function Parent(name) {
        this.name = name;
        this.colors = ["blue", "yellow", "green"];
      }

      function Child(name, age) {
        Parent.call(this, name);
        this.age = age;
      }

      Child.prototype = new Parent();
      Child.prototype.sayAge = function() {
        console.log(this.age);
      };
      let child1 = new Child("kk", 22);
      child1.sayAge();
      let p1 = new Parent("zz");
      // p1.__proto__.sayAge();
      console.log("p1", p1);
      console.log("c1", child1);
      console.log("p1p", p1.__proto__);
      console.log("c1c", child1.__proto__);
      console.log("p1", p1);
    },
    // 1、借用构造函数（伪造对象/经典继承）
    one() {
      function Parent(name) {
        this.name = name;
      }
      Parent.prototype.sayAge = function(word) {
        console.log("99", word);
        let age = 66;
        return age;
      };
      function Child() {
        Parent.call(this, "parent");
        this.age = 24;
      }
      Child.prototype = new Parent("pp");
      //因为修改了Student原型链,需要把其原型链上构造器重新指向自己
      Child.prototype.constructor = Child;
      let c1 = new Child();
      let p1 = new Parent("kk");
      console.log("p1", p1.sayAge("66"));
      console.log("c1", c1);
      // c1.sayAge();
    },
    two() {
      class Person {
        constructor(age, name) {
          this.age = age;
          this.name = name;
        }
        sayHi() {
          console.log("I'm a Person! age=" + this.age + " name=" + this.name);
        }
        sayAge() {
          console.log("my age is 22");
        }
      }
      class Student extends Person {
        constructor(sno, age, name) {
          super(age, name);
          this.sno = sno;
        }
      }
      let s = new Student(95001, 24, "小红");
      console.log(Student.prototype.constructor);
      s.sayHi();
      s.sayAge();
    },
    debounce(func, wait) {
      // 立即执行版
      // let timer;
        let context = this; // 这边的 this 指向谁?
        let args = arguments; // arguments中存着e

        if (this.timer) {

          clearTimeout(this.timer);
          console.log('11');
        }

        let callNow = !this.timer;

        this.timer = setTimeout(() => {
          this.timer = null;
          // func.apply(context, args)
        }, wait);

        if (callNow) func.apply(context, args);

    },
    clik() {
      this.debounce(this.add,1000)
    },
    add() {
      this.num++;
    },
    addgrid(x,y) {
      // let tab = document.getElementById("table");
      let tab = this.$refs.table;
      let table = document.createElement('table');
      console.log(tab)
      
      for(let i=0; i<x; i++) {
        let tr = document.createElement('tr');
        console.log('tr',tr)
        table.appendChild(tr);
        for(let j=0; j<y; j++) {
          let td = document.createElement('td');
          td.innerHTML = j
          console.log('td',td)
          table.childNodes[i].appendChild(td)
        }
      }
      tab.appendChild(table);
      console.log(tab)
    }
  },
  created() {
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
table {
 /* table-layout: fixed; */
 width: 120px;
 border: 1px solid; 
}
 
td {
 border: 1px solid blue;
 overflow: hidden;
 white-space: nowrap;
 text-overflow: ellipsis; 
}
.less {
  // position: relative;
  border-color: #000;
  background-color: #000;
  & .content{
    // position: relative;
    width: 220px;
    height: 220px;
    background-color: blue;
  }
}
ul {
  color: pink;
  &:extend(.inline);
}
.inline {
  background-color: blue;
  line-height: 10;
}
</style>