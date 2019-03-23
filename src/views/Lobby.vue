<template>
  <table>
    <thead>
      <tr>
        <th>Host Name</th>
        <th>Room Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="room in rooms" :key="`${room.host}/${room.id}`">
        <td>{{ room.hostname }}</td>
        <td/>
      </tr>
    </tbody>
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
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th {
    border-bottom: 2px solid;
  }

  td, th {
    padding: 6px 10px;
  }

  tr {
    border-left: 2px solid transparent;
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.1)
    /* border-left: 2px solid */
  }
</style>
