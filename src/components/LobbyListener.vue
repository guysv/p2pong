<template>
  <div/>
</template>

<script>
import { LOBBY_PROTOCOL } from '@/protocol'

export default {
  name: 'lobby-listener',
  methods: {
    async handleLobbyMessage (msg) {
      var nodeId = await this.$root.ipfs.id()
      if (nodeId.id === msg.from) {
        // We don't handle messages from self
        return
      }
      var data = JSON.parse(msg.data.toString())
      this.$root.$emit('newRoom', {
        id: data.id,
        host: msg.from,
        hostname: data.hostname,
        seen: Date.now()
      })
    }
  },

  mounted () {
    this.$root.ipfs.pubsub.subscribe(LOBBY_PROTOCOL, this.handleLobbyMessage)
  },

  destroyed () {
    this.$root.ipfs.pubsub.unsubscribe(LOBBY_PROTOCOL, this.handleLobbyMessage)
  }
}
</script>
