import Phaser from "phaser"

export default class game extends Phaser.Scene
{
    preload()
    {
        
    }

    create()
    {
        const ball = this.add.circle(400, 250, 20, 0xfffffff, 1)
        this.physics.add.existing(ball)
    }
} 