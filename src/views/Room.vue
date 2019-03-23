<template>
  <div/>
</template>

<script>
import { LOBBY_PROTOCOL } from '@/protocol'

export default {
  name: 'room',
  data: () => ({
    isHosting: false,
    beaconTask: null
  }),
  async mounted () {
    var nodeId = await this.$root.ipfs.id()

    this.isHosting = nodeId.id === this.$route.params.host

    if (this.isHosting) {
      // This node hosts the room
      var publishRoom = () => {
        this.$root.ipfs.pubsub.publish(LOBBY_PROTOCOL,
          Buffer.from(JSON.stringify({
            id: this.$route.params.id,
            hostname: 'deuce'
          }))
        )
      }

      publishRoom()
      this.beaconTask = setInterval(publishRoom, 10000)
    } else {
      // This node is a guest
    }
  },

  destroyed () {
    if (this.beaconTask) {
      clearInterval(this.beaconTask)
    }
  }
}
</script>
