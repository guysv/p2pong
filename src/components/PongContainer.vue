<template>
  <div ref="pongContainer" id="pong-container"/>
</template>

<script>
import Pong from '@/pong/Pong'

export default {
  name: 'pong-container',
  data: () => ({
    game: null
  }),
  mounted () {
    this.game = new Pong(this.$refs.pongContainer)
  }
}
</script>

<style>
  #pong-container {
    
  }
</style>
