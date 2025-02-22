import Phaser from "phaser"

import TitleScreen from "./scenes/TitleScreen"
import Game from "./scenes/Game"

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    backgroundColor: "#659c92",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
}

const game = new Phaser.Game(config)

game.scene.add("titlescreen", TitleScreen)
game.scene.add("game", Game)


//game.scene.start(titlescreen)
game.scene.start("game")


