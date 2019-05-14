<template>
  <PongContainer />
</template>

<script>
import PongContainer from '@/components/PongContainer'
import { LOBBY_PROTOCOL, ROOM_PROTOCOL_PREFIX } from '@/protocol'

export default {
  name: 'room',
  components: {
    PongContainer
  },
  data: () => ({
    isHosting: false,
    beaconTask: null,
    roomTopic: null
  }),
  async mounted () {
    var roomHost = this.$route.params.host
    var roomId = this.$route.params.id
    this.roomTopic = `${ROOM_PROTOCOL_PREFIX}/${roomHost}/${roomId}`

    var nodeId = await this.$root.ipfs.id()

    this.isHosting = nodeId.id === roomHost

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
