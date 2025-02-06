import { Body, Bounds } from "matter"
import Phaser from "phaser"

export default class game extends Phaser.Scene
{
    preload()
    {
        
    }

    create()
    {
        const ball = this.add.circle(400, 250, 10, 0xfffffff, 1)
        this.physics.add.existing(ball)
        ball.body.setBounce(1, 1)

        ball.body.setCollideWorldBounds(true, 1, 1)

        ball.body.setVelocity(-200, 0)

        const paddleleft = this.add.rectangle(50, 250, 30, 150, 0xffffff)
        this.physics.add.existing(paddleleft, true)
        
        /** @type {Phaser.Physics.Arcade.Body} */
        //const body = paddleleft.body

        this.physics.add.collider(paddleleft, ball)
        
    }
} 