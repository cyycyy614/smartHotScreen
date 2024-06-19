<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/test">test</router-link>
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
    debugger
    window.addEventListener('beforeunload', e => this.closeWS(e))
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
  },
}
</script>

<style lang="scss" scoped></style>
