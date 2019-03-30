<template>
  <table>
    <thead>
      <tr>
        <th>Host Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="room in $root.rooms" :key="`${room.host}/${room.id}`">
        <router-link
          :to="{ name: 'room', params: { host: room.host, id: room.id } }">
          <td>{{ room.hostname }}</td>
        </router-link>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'lobby'
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

  tr a {
    color: inherit;
    text-decoration: inherit;
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.1)
    /* border-left: 2px solid */
  }
</style>
