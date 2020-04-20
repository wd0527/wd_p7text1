<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  touch-action: none;
}
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
hr,
div,
h3,
h4,
h5,
h6,
p,
button,
a,
ul,
ol,
li,
input {
  margin: 0;
  padding: 0;
}
ul,
ol,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000;
}
hr {
  margin-top: 0.1rem;
}
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
