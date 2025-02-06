import { Body, Bounds } from "matter"
import Phaser from "phaser"

export default class game extends Phaser.Scene
{
    preload()
    {
        
    }

    create()
    {
        this.ball = this.add.circle(400, 250, 10, 0xfffffff, 1)
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1)

        this.ball.body.setCollideWorldBounds(true, 1, 1)

        this.ball.body.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200))

        this.paddleleft = this.add.rectangle(50, 250, 30, 150, 0xffffff, 1)
        this.physics.add.existing(this.paddleleft, true)

        this.paddleright = this.add.rectangle(750, 250, 30, 150, 0xfffff, 1)
        this.physics.add.existing(this.paddleright, true)
        
        /** @type {Phaser.Physics.Arcade.Body} */
        //const body = paddleleft.body

        this.physics.add.collider(this.paddleleft, this.ball)
        this.physics.add.collider(this.paddleright, this.ball)
        
        this.cursors = this.input.keyboard.createCursorKeys()

    }
    update()
    {
        /**@type {Phaser.Physics.Arcade.StaticBody} */
        const body = this.paddleleft.body

        if (this.cursors.up.isDown)
        {
            this.paddleleft.y -= 10
            body.updateFromGameObject()
        }
        else if (this.cursors.down.isDown)
        {
            this.paddleleft.y += 10
            body.updateFromGameObject()
        }
        const diff = this.ball.y - this.paddleright.y
        console.log(diff)

        
        if (diff < 0)
        {
            //ball is above the paddle
            this.paddleright.y -= 10
            this.paddleright.body.updateFromGameObject()
        }
        else if (diff > 0)
        {
            //ball is below the paddle
            this.paddleright.y += 10
            this.paddleright.body.updateFromGameObject()
        }
    
    }
}    