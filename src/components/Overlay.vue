<template>
  <div ref="rootElem">
    <div class="navbar">
      <a id="logo">
        <span>P2Pong</span>
      </a>
      <a v-on:click.prevent="enterFullscreen" id="fullscreen" href=".">
        <font-awesome-icon
          icon="expand"/>
      </a>
      <a>
        <font-awesome-icon
          icon="wrench"/>
        <span>Settings</span>
      </a>
      <a>
        <font-awesome-icon
          :icon="[$root.ipfs ? 'fas' : 'far', 'circle']"/>
        <span>Status</span>
      </a>
      <router-link to="/host">
        <font-awesome-icon
          icon="play"/>
        <span>Host</span>
      </router-link>
    </div>
    <div v-if="!($root.ipfs)">
      <div id="loading-msg">Starting IPFS node...</div>
    </div>
    <div v-else>
      <LobbyListener ref="lobbyListener" />
      <router-view />
    </div>
    </div>
</template>

<script>
import IPFS from 'ipfs'
import LobbyListener from '@/components/LobbyListener'

export default {
  name: 'overlay',
  components: {
    LobbyListener
  },
  methods: {
    enterFullscreen () {
      this.$refs.rootElem.requestFullscreen()
    }
  },
  mounted () {
    if (this.$root.ipfs) {
      return
    }
    var ipfs = new IPFS({
      config: {
        Addresses: {
          Swarm: [
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
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
    padding: 30px 10px;
    margin-top: 30px;
  }

  .navbar {
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 4px solid;
    /* TODO: understand how to reuse colors */
    background-color: #091914;
  }

  #logo {
    float: left;
  }

  .navbar a {
    float: right;
    display: block;
    text-align: center;
    padding: 10px 14px 8px 14px;
    border-bottom: 2px solid transparent;
    text-decoration: none;
    font-size: 17px;
    color: inherit;
    text-decoration: inherit;
  }

  .navbar a:hover {
    border-bottom: 2px solid;
  }

  .navbar a span {
    padding-left: 8px
  }

  @media (min-width:660px) {
    .navbar #fullscreen {
      display: none;
    }
  }

  @media (max-width:560px) {
    .navbar a:not(#logo) span {
      display: none;
    }
  }
</style>
