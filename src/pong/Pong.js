import Phaser from 'phaser'

class Pong extends Phaser.Game {
  constructor (parent) {
    super({
      type: Phaser.AUTO,
      parent,
      scale: {
        mode: Phaser.Scale.RESIZE
        // autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
      },
      width: 800,
      height: 400,
      scene: []
    })
  }
}

export default Pong
