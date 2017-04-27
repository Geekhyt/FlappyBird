
//小鸟类
(function () {
    window.Bird  = Class.extend({
        init:function (){

            this.x = game.canvas.width *0.5;
            this.y = 100;
            this.width = 85;
            this.height = 60;

            //1.小鸟的翅膀状态 合法值 0, 1, 2
            this.state = 0;
            //2.煽动翅膀频率
            this.singRate = 5;
            //3.下落的增量
            this.dY = 0;
            //4.下落的帧数
            this.dropFrame = game.frameUtil.currentFrame;

            //5.旋转角度
            this.rotateAngle = 0;

            //6.鸟的状态 0 往下落, 1:往上飞
            this.birdState = 0;
            //7.空气阻力
            this.datleY = 1;
            //8.监听点击
            this.bindLinstenClick();

            //9.记录鸟是否死亡
            this.die = false;
            //10. 动画角标
            this.animationIndex = 0;

        },

        //绘制
        render:function (){
            if (this.die){ //鸟死亡后, 洒热血动画
                var sWidth = 325;
                var sHeight = 138;

                //计算行和列
                var row = parseInt(this.animationIndex / 5);
                var col = this.animationIndex % 5;
                //绘制洒热血
                game.ctx.drawImage(game.allImageObj['blood'], col * sWidth, row * sHeight, sWidth, sHeight, this.x -100, this.y,sWidth,sHeight);
                //绘制游戏结束
                game.ctx.drawImage(game.allImageObj['gameover'], (game.canvas.width - 626) * 0.5, (game.canvas.height - 144) * 0.5 );

                return;
            }

            game.ctx.save();
            game.ctx.translate(this.x + this.width * 0.5 ,this.y + this.height * 0.5);
            game.ctx.rotate(this.rotateAngle * Math.PI/180);
            game.ctx.translate(-(this.x + this.width * 0.5) ,-(this.y + this.height * 0.5));
                game.ctx.drawImage(game.allImageObj['bird'], this.state * this.width, 0, this.width, this.height, this.x,this.y, this.width,this.height);
            game.ctx.restore()

        },

        //更新
        update: function () {
            if (this.die){ //鸟死亡
                this.animationIndex++;
                if (this.animationIndex == 30){
                    //this.animationIndex = 0;
                    //停止定时器
                    game.pause();
                }
                return;
            }

            //1.翅膀动画
            if (game.frameUtil.currentFrame % this.singRate ==0 ){//每5帧煽动一次
                this.state++;
                if (this.state == 2){
                    this.state = 0;
                }
            }

            //2.判断鸟的状态
            if (this.birdState == 0){//往下落

                //2.自由落体
                //下落高度: h= 1/2 *g*Math.pow(t, 2)
                //2.1 计算下落增量
                this.dY = 0.001 * 0.5 * 9.8 * Math.pow(game.frameUtil.currentFrame - this.dropFrame , 2);
                //2.3 累加角度
                this.rotateAngle +=1;
            }else if(this.birdState == 1){ //往上飞
                this.datleY++;
                this.dY = -15 + this.datleY;
                if (this.dY >=0){ //往下落
                    this.birdState = 0; //更改鸟的状态
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }

            //2.2 更新y
            this.y += this.dY;

            //3.上空限定
            if (this.y <= 0){
                this.y = 0;
            }
            //4.撞到地板,结束游戏
            if (this.y >= game.canvas.height - this.height - 48){
                game.gameOver();
            }

        },

        //监听点击
        bindLinstenClick: function () {
            var self = this;

            game.canvas.addEventListener('mousedown', function () {
                //1.更改状态
                self.birdState = 1;
                //2.添加仰角
                self.rotateAngle = -25;
                //3.空气阻力 归位1
                self.datleY = 1;

            })
        }


    })


})();
