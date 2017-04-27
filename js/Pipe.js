

(function () {
    window.Pipe = Class.extend({
        init: function () {
            //方向 0 :口往下 1:口往上
            this.dir = _.random(0, 1);

            this.width = 148;
            this.height = _.random(80, game.canvas.height * 0.5);
            this.x = game.canvas.width;
            // 0 :口往上
            this.y = this.dir == 0 ? 0 :game.canvas.height - this.height - 48;

            //速度
            this.speed = 4;
        },

        //绘制函数
        render: function () {
            //根据口方向,绘制水管
            if (this.dir == 0){ //口往下
                game.ctx.drawImage(game.allImageObj['pipe1'], 0, 1664 - this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            }else if(this.dir == 1){ //口往上
                game.ctx.drawImage(game.allImageObj['pipe0'], 0, 0, this.width, this.height, this.x,this.y, this.width, this.height);
            }
        },

        //更新函数
        update: function () {
            this.x -= this.speed;
            if (this.x < -this.width){
                 //销毁管道
                game.pipeArr = _.without(game.pipeArr, this);
            }

            //碰撞检测
            if ((game.bird.x > this.x - game.bird.width) && (game.bird.x < this.x + this.width)){ //判断x方向
                if (this.dir == 0 ){ //口往下
                    if (game.bird.y < this.height){
                        game.gameOver();//碰撞了
                    }

                }else if(this.dir == 1){//口往上
                    if (game.bird.y > game.canvas.height - this.height -48 - game.bird.height){
                        game.gameOver();//碰撞了
                    }
                }

            }


        },

        //停止
        pause: function () {
            this.speed = 0;
        }

    })


})();
