<template>
  <div>
    <div class="navbar">
      <a class="navbar-logo">P2Pong</a>
      <a class="navbar-link">
        <font-awesome-icon
          icon="wrench"/>
        <span>Settings</span>
      </a>
      <a class="navbar-link">
        <font-awesome-icon
          :icon="[$root.ipfs ? 'fas' : 'far', 'circle']"/>
        <span>Status</span>
      </a>
    </div>
    <div v-if="!($root.ipfs)">
      <div id="loading-msg">Starting IPFS node...</div>
    </div>
    <div v-else>
      <slot/>
    </div>
    </div>
</template>

<script>
import IPFS from 'ipfs'

export default {
  name: 'overlay',
  mounted () {
    if (this.$root.ipfs) {
      return
    }
    var ipfs = new IPFS({
      config: {
        Addresses: {
          Swarm: [
            // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
          ]
        }
      },
      relay: {
        enabled: true
      },
      EXPERIMENTAL: {
        pubsub: true
      }
    })

    ipfs.on('ready', () => {
      console.log('IPFS Node initialized successfuly')
      this.$root.ipfs = ipfs
    })
  }
}
</script>

<style>
  #loading-msg {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .navbar + div {
    padding: 16px;
    margin-top: 30px;
  }

  .navbar {
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 4px solid;
  }

  .navbar-logo {
    float: left;
  }

  .navbar-link {
    float: right;
  }

  .navbar-link:hover {
    border-bottom: 2px solid;
  }

  .navbar a {
    display: block;
    text-align: center;
    padding: 10px 10px 8px 10px;
    border-bottom: 2px solid transparent;
    text-decoration: none;
    font-size: 17px;
  }

  .navbar a span {
    padding-left: 8px
  }

  @media (max-width:500px) {
    .navbar .navbar-link span {
      display: none;
    }
  }  
</style>
