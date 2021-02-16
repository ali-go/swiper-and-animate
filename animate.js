// 注意：此处不能加window的load事件，否则animate函数就变成局部变量，无法被其他外部调用；
// alert('hh');
// 测试引用成功代码

// 下面我们在上面优化后的代码上进行缓动效果的添加：（为了达到想要效果，我们添加两个点击事件，一个到500，一个到800，显示返回移动）
function animate(obj, target, callback) {
    clearInterval(obj.timer); //清除之前的定时器；
    obj.timer = setInterval(function() { //把定时器的名字赋值为每个对象obj.timer，当实参传进来时，每个元素都有相应的obj.timer；
        var step = (target - obj.offsetLeft) / 10; //由于要每次动态更新offsetLeft值，因此必须在定时器内部声明step变量；
        // 此处的step由于是小数，所以会导致实际移动位置与设计的不符，因此需要转换成整数，此处我们向上取整，例8.3取9；
        // 从左往右走没问题， 因为一直是正数， 但是当从800回到500就有问题了， 因为从800到500的过程step是负值，
        // 这个时候就不能向上取整， 得向下取整， 例 - 8.3 取 - 9；
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) { //此处>=改成==，因为我们需要返回，即从800回到500，那么>号就不能让定时器停止下来；
            clearInterval(obj.timer); //注意css一定要加*边距清零，不然可能出现left和target不等情况；
            // 判断如果callback存在则调用回调函数；
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px'; //把原先的1换成step；
    }, 15); //每15毫秒调用一次定时器；
} //封装函数完成；