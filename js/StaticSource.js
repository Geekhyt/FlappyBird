
//获取本地资源的工具类
(function () {
    window.StaticSource = Class.extend({
        init: function () {
            //保存所有dom对象
            this.allImageObj = {};
        },

        //获取本地资源方法 返回:所有dom对象, 所有图片的个数, 已经图片个数
        loadImage: function (jsonUrl, callback) {

            //备份指针
            var self = this;

            //1.请求对象
            var xhr = new XMLHttpRequest();
            //2.ajax 三步
            xhr.open('get', jsonUrl);
            xhr.send(null);
            //3.判断响应状态
            //当 readyState 等于 4 且状态为 200 时，表示响应已就绪
            xhr.onreadystatechange = function () {
                //3.1 请求已完成，且响应已就绪
                if (xhr.readyState == 4 && xhr.status == 200){
                    //3.2已经加载的图片个数
                    var loadImageCount = 0;

                    //3.2 获取请求数据
                    var responseText = xhr.responseText;
                    //console.log(responseText);
                    //3.3json解析 JSON要全部大写
                    var responseJson = JSON.parse(responseText);
                    //console.log(responseJson);

                    //3.4 获取数组
                    var dataArr = responseJson.images;
                    //3.5 遍历数组
                    for (var i = 0; i < dataArr.length; i++) {

                        //loadImageCount++;

                        //创建image对象
                        var image = new Image();
                        image.src = dataArr[i].src;
                        image.index = i;
                        //图片加载完后, 保存对象
                        image.onload = function () {
                            //注意:图片加载完后,记录加载图片个数
                            loadImageCount++;

                            var name = dataArr[this.index].name;
                            // 保存对象 {name : dom}
                            self.allImageObj[name] = this; //this -->image对象
                            //回调
                            callback(self.allImageObj, dataArr.length, loadImageCount);
                        }
                    }
                }


            }



        }

    });


})();
