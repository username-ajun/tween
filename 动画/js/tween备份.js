~function () {
    var ajunEffect = {
        Linnear: function (t, b, c, d, ) {
            return c * t / d + b;
        }
    };

    //  实现多方向得运动动画 curEle-》当前要操作运动得元素 target-》当前动画得目标位置,存储的是每一个方向目标位置{left: xxx, top: xxx, ....} duration-》当前动画的总时间
    function move(curEle, target, duration, callBack) {
        //  在每一次执行方法之前首先当前元素之前正在运行的动画结束掉
        window.clearInterval(curEle.ajunTimer);

        //  根据target获取每一个方向的起始值begin和总距离change
        var begin = {}, change = {};
        for (var key in target) {
            //  key：方向
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }

        //  实现多方向运动动画
        var time = 0;
        curEle.ajunTimer = window.setInterval(function () {
            time += 10;
            //  到达目标：结束动画，让当前元素的样式等于目标样式值
            if (time >= duration) {
                utils.css(curEle, target);
                window.clearInterval(curEle.ajunTimer);
                //  在动画结束的时候，如果用户把回调传递给我了，我就把用户传递给我的函数执行,不仅执行，还让回调函数中的this为当前元素
                // typeof callBack === 'function' ? callBack() : null;
                callBack && callBack.call(curEle);
                return;
            }
            //  没到达目标：分别的获取每一个方向当前的位置，给当前元素设置样式即可
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    var curPos = ajunEffect.Linnear(time, begin[key], change[key], duration);
                    utils.css(curEle, key, curPos);
                }
            }
        }, 10)
    }
    window.ajunAnimate = move;
}();