<template>
  <div id="app">
    <Overlay />
  </div>
</template>

<script>
import Overlay from '@/components/Overlay'

export default {
  name: 'app',
  components: {
    Overlay
  }
}
</script>

<style>
body {
  margin: 0;
  color: #65e0b7;
  background-color: #091914;
  line-height: 1.5;
}

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
