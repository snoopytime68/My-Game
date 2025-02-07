import { Body, Bounds } from "matter"
import Phaser from "phaser"

export default class game extends Phaser.Scene
{
    init()
        {
            this.paddlerightVelocity = new Phaser.Math.Vector2(0, 0)
        }
    
    preload()
    {
        
    }

    create()
    {
        this.physics.world.setBounds(-100, 0, 1000, 500)

        this.ball = this.add.circle(400, 250, 10, 0xfffffff, 1)
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1)

        this.ball.body.setCollideWorldBounds(true, 1, 1)

        this.resetBall()

        const angle = Phaser.Math.Between(0, 360)
        const vec = this.physics.velocityFromAngle(angle, 200)

        this.ball.body.setVelocity(vec.x, vec.y)

        this.paddleleft = this.add.rectangle(50, 250, 30, 150, 0xffffff, 1)
        this.physics.add.existing(this.paddleleft, true)

        this.paddleright = this.add.rectangle(750, 250, 30, 150, 0xfffff, 1)
        this.physics.add.existing(this.paddleright, true)
        
        /** @type {Phaser.Physics.Arcade.Body} */
        //const body = paddleleft.body

        this.physics.add.collider(this.paddleleft, this.ball)
        this.physics.add.collider(this.paddleright, this.ball)

        this.leftScore = this.add.text(300, 125, '0')
            .setOrigin
        
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
        if (Math.abs(diff) < 10)
        {
            return
        }

        const aiSpeed = 0.1
        if (diff < 0)
        {
            //ball is above the paddle
            this.paddlerightVelocity.y = -aiSpeed
            if (this.paddlerightVelocity.y < -10)
            {
                this.paddlerightVelocity.y = -10
            }
        }
        else if (diff > 0)
        {
            //ball is below the paddle
            this.paddlerightVelocity.y = aiSpeed
            if (this.paddlerightVelocity.y >10)
            {
                this.paddlerightVelocity.y = 10
            }
            

            
        }
    
        this.paddleright.y += this.paddlerightVelocity.y
        this.paddleright.body.updateFromGameObject()

        if (this.ball.x < -30)
        {
            //scored on the left side
            this.resetBall()
        }
        if (this.ball.x > 830)
        {
            //scored on the right side
            this.resetBall()
        }

    }

    resetBall()
    {
        this.ball.setPosition(400, 250)

        const angle = Phaser.Math.Between(0, 360)
        const vec = this.physics.velocityFromAngle(angle, 200)

        this.ball.body.setVelocity(vec.x, vec.y)

    }
}    