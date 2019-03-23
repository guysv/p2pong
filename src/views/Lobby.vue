<template>
  <table>
    <thead>
      <tr>
        <th>Host Name</th>
      </tr>
    </thead>
  </table>
</template>

<script>
export default {
  name: 'lobby',
  data: () => ({
    rooms: [],
    refreshTask: null
  }),
  mounted () {
    this.$root.$on('newRoom', newRoom => {
      var existingIndex = this.rooms.findIndex(r => r.id === newRoom.id &&
        r.host === newRoom.host)
      if (existingIndex !== -1) {
        this.rooms.splice(existingIndex, 1, newRoom)
      } else {
        this.rooms.push(newRoom)
      }
    })

    this.refreshTask = setInterval(() => {
      var now = Date.now()
      this.rooms = this.rooms.filter(r => now - r.seen < 20000)
    }, 20000)
  },

  destroyed () {
    if (this.refreshTask) {
      clearInterval(this.refreshTask)
    }
  }
}
</script>

<style>
  table {
    /* top: 0; */
    width: 100%;
    border-bottom: 1px solid;
  }
  th {
    text-align: left
  }
</style>
