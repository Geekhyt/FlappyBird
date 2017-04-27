//帧工具类 -->计算真实帧数

(function () {
    window.FrameUtil = Class.extend({
        init: function () {
            //1.开始的帧数
            this.sFrame = 0;
            //2.开始的时间
            this.sTime = new Date();
            //3.总帧数
            this.currentFrame = 0;
            //4.真实的帧数
            this.realFps = 0;

        },

        //计算真实帧数, 每帧都要调用,计算
        countFps: function () {
            this.currentFrame++;//记录总帧数

            //当前帧的时间
            var currentTime = new Date();
            //如果走了1s, 计算真实帧数
            if(currentTime - this.sTime >= 1000){

                this.realFps = this.currentFrame - this.sFrame;
                //更新开始时间
                this.sTime = currentTime;
                //更新开始的帧数
                this.sFrame = this.currentFrame;
            }
        }


    });


})();
