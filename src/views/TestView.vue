<template>
  <div class="test">
    <h1>This is an test page</h1>
    <button>测试</button>
    <router-link to="/about">about</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: '',
    }
  },
  mounted() {
    // window.onbeforeunload = function (e) {
    //   // 那个路由页面需要，就把path的名字修改成那个，比如我当前页面的path是/vue
    //   e = e || window.event
    //   if (e) {
    //     e.returnValue = 'returnValue属性值的文字不能自定义，写不写都行的'
    //   }
    //   // Chrome支持, Safari支持, Firefox 4版本以后支持, Opera 12版本以后支持 , IE 9版本以后支持
    //   return 'returnValue属性值的文字不能自定义，写不写都行的'
    // }
    window.addEventListener(
      'beforeunload',
      e =>
        function (e) {
          e.preventDefault()
          e.returnValue = '111'
          // do something meaningful
          console.log('close closeWS', e)
        }
    )
    // window.onunload = function (e) {
    //   // ios 不支持 window.onbeforeunload()
    //   debugger
    // }
  },
  methods: {
    closeWS(e) {
      debugger
      console.log('close closeWS', e)
    },
  },
  beforeDestroy() {
    debugger
    window.removeEventListener('beforeunload', e => this.closeWS(e))
    window.onbeforeunload = () => {}
  },
}
</script>

<style lang="scss" scoped></style>
