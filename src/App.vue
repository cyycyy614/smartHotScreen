<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    window.addEventListener(
      'beforeunload',
      e =>
        function (e) {
          debugger
          // do something meaningful
          console.log('close closeWS', e)
        }
    )
  },
}
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: rgba(29, 32, 48, 1);
  box-sizing: border-box;
}
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgba(29, 32, 48, 1);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
