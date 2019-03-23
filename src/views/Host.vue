<template>
  <div/>
</template>

<script>
import uuidv4 from 'uuid/v4'
import router from '@/router'

export default {
  name: 'host',
  beforeCreate () {
    this.$root.ipfs.id().then(nodeId => {
      router.replace(`/${nodeId.id}/${uuidv4()}`)
    })
  }
}
</script>
