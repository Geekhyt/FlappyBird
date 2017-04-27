

(function () {
    window.Game = Class.extend({
       init: function (option) {
           option = option || {};
           //备份指针
           var self = this;

           //1.fps
           this.fps = option.fps || 50;
           //2.实例化帧工具对象
           this.frameUtil = new FrameUtil();

           //3.获取canvas和上下文
           this.canvas = document.getElementById(option.canvasId);
           this.ctx = this.canvas.getContext('2d');

           //4.保存返回数据
           this.allImageObj = {};

           //5实例化加载本地资源工具对象
           this.staticSource = new StaticSource();
           //6.加载图片资源 返回:所有dom对象, 所有图片的个数, 已经图片个数
           this.staticSource.loadImage('r.json', function (allImageObj, allImageCount, loadImageCount) {
                //console.log(allImageObj, allImageCount, loadImageCount);
               if (allImageCount == loadImageCount){ //如果加载完成
                   self.allImageObj = allImageObj;
                   //运行游戏
                   self.run();
               }
           });

           //7.记录游戏是否运行
           this.isGameOver = false;

       },

        //游戏开始
        run: function () {
            //1.备份指针
            var self = this;

            //2.定时器
            this.timer =  setInterval(function () {
                self.runloop();
            }, 1000 / self.fps ); //每一帧的时间

            //3.创建房子
            this.fangzi = new Background({
                img:self.allImageObj['fangzi'],
                x:0,
                y:self.canvas.height - 256 -100,
                width:300,
                height:256,
                speed:2
            });

            //4.创建树
            this.shu = new Background({
                img:self.allImageObj['shu'],
                x:0,
                y:self.canvas.height - 216 -48,
                width:300,
                height:216,
                speed:3
            });

            //5.创建地板
            this.diban = new Background({
                img:self.allImageObj['diban'],
                x:0,
                y:self.canvas.height -48,
                width:48,
                height:48,
                speed:4
            });

            //6.创建水管数组
            //this.pipe = new Pipe();
            this.pipeArr = [new Pipe()];

            //7.创建小鸟
            this.bird = new Bird();


        },
        //运行循环 -->每一帧都要执行
        runloop: function () {
            //console.log(Math.random());
            //0.清屏
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //1.计算真实帧数
            this.frameUtil.countFps();



            //3.更新和绘制房子
            //this.ctx.drawImage(this.allImageObj['fangzi'], 200, 200);
            this.fangzi.update();
            this.fangzi.render();

            //4.绘制和更新树
            this.shu.update();
            this.shu.render();

            //5.更新和绘制地板
            this.diban.update();
            this.diban.render();

            //6.创建水管
            if ( !this.isGameOver && this.frameUtil.currentFrame % 100 == 0){//每100帧创建水管
                this.pipeArr.push(new Pipe());
            }

            //7.更新和绘制水管
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].update();
                this.pipeArr[i].render();
            }

            //8.更新和绘制小鸟
            this.bird.update();
            this.bird.render();

            //2.绘制文字
            this.ctx.fillText('FPS /' + this.frameUtil.realFps, 15, 15);
            this.ctx.fillText('FNO /' + this.frameUtil.currentFrame, 15, 30);

        },

        //游戏停止
        pause: function () {
            clearInterval(this.timer);
        },

        //游戏结束
        gameOver: function () {
            //停止背景
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();

            //停止管道
            for (var i = 0; i < this.pipeArr.length; i++) {
                   this.pipeArr[i].pause();
            }

            //更改记录游戏是否运行属性
            this.isGameOver = true;
            //通知小鸟死亡
            this.bird.die = true;

        }


    });
})();
