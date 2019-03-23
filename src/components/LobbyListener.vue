<template>
  <div/>
</template>

<script>
import { LOBBY_PROTOCOL } from '@/protocol'

export default {
  name: 'lobby-listener',
  data: () => ({
    refreshTask: null
  }),
  methods: {
    async handleLobbyMessage (msg) {
      var nodeId = await this.$root.ipfs.id()
      if (nodeId.id === msg.from) {
        // We don't handle messages from self
        return
      }
      var data = JSON.parse(msg.data.toString())
      var newRoom = {
        id: data.id,
        host: msg.from,
        hostname: data.hostname,
        seen: Date.now()
      }

      var existingIndex = this.$root.rooms.findIndex(r => r.id === newRoom.id &&
        r.host === newRoom.host)
      if (existingIndex !== -1) {
        this.$root.rooms.splice(existingIndex, 1, newRoom)
      } else {
        this.$root.rooms.push(newRoom)
      }
    }
  },

  mounted () {
    this.$root.ipfs.pubsub.subscribe(LOBBY_PROTOCOL, this.handleLobbyMessage)
    this.refreshTask = setInterval(() => {
      var now = Date.now()
      this.$root.rooms = this.$root.rooms.filter(r => now - r.seen < 20000)
    }, 20000)
  },

  destroyed () {
    this.$root.ipfs.pubsub.unsubscribe(LOBBY_PROTOCOL, this.handleLobbyMessage)
    if (this.refreshTask) {
      clearInterval(this.refreshTask)
    }
  }
}
</script>
