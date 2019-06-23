var mTween = (function(){
    //requestAnimationFrame兼容设置
    if(!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback){
            return setTimeout(function(){
                callback();
            },1000/60);
        }

        window.cancelAnimationFrame = function(timer){
            clearTimeout(timer);
        }
    }
    //transform样式数组
    var transformStyle = ['translateX','translateY','translateZ','rotate','rotateX','rotateY','rotateZ','skewX','skewY','scale','scaleX','scaleY','scaleZ'];
    //特殊样式设置
    var sizeStyle = ['width','height','left','top','right','bottom','margin-top','margin-left','margin-right','margin-bottom','padding-top','padding-left','padding-bottom','padding-right','opacity','z-index']
    //设置transform样式
    function setTransform(el , attr , val){
        if(val === undefined){
            if(!el.transform) el.transform = {};
            if(!el.transform[attr]) el.transform[attr] = 0;
            return el.transform[attr];
        }else{
            el.transform = el.transform || {};
            el.transform[attr] = val;
            var transformValue = "";
            for(var s in el.transform){
                switch(s){
                    case "translateX":
                    case "translateY":
                    case "translateZ":
                        transformValue += s+'('+el.transform[s]+'px) ';
                        break;
                    case "rotate":
                    case "rotateX":
                    case "rotateY":
                    case "rotateZ":  
                    case "skewX":
                    case "skewY":
                        transformValue += s+'('+el.transform[s]+'deg) ';
                        break;
                    default :
                        transformValue += s+'('+el.transform[s]+') ';
                        break;
                }
                
            }
            el.style.webkitTransform = el.style.transform = transformValue.trim();
        }
    }
    //设置和获取css样式
    function css(el , attr , val){
        if(transformStyle.indexOf(attr) > -1){
            return setTransform(el , attr , val);
        }

        if(val === undefined){
            return parseFloat(getComputedStyle ? getComputedStyle(el)[attr] : el.currentStyle[attr]);
        }

        if(sizeStyle.indexOf(attr) > -1){
            switch(attr){
                case "opacity":
                case "z-index":
                    el.style[attr] = val;
                    break;
                default :
                    el.style[attr] = val+"px";
                    break;
            }
        }else{
            el.style[attr] = val;
        }
        
    }
    //tween运动公式
    var Tween = {
        linear: function (t, b, c, d){
            return c*t/d + b;
        },
        easeIn: function(t, b, c, d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t, b, c, d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeBoth: function(t, b, c, d){
            if ((t/=d/2) < 1) {
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInStrong: function(t, b, c, d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOutStrong: function(t, b, c, d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeBothStrong: function(t, b, c, d){
            if ((t/=d/2) < 1) {
                return c/2*t*t*t*t + b;
            }
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        elasticIn: function(t, b, c, d, a, p){
            if (t === 0) { 
                return b; 
            }
            if ( (t /= d) == 1 ) {
                return b+c; 
            }
            if (!p) {
                p=d*0.3; 
            }
            if (!a || a < Math.abs(c)) {
                a = c; 
                var s = p/4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        elasticOut: function(t, b, c, d, a, p){
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },    
        elasticBoth: function(t, b, c, d, a, p){
            if (t === 0) {
                return b;
            }
            if ( (t /= d/2) == 2 ) {
                return b+c;
            }
            if (!p) {
                p = d*(0.3*1.5);
            }
            if ( !a || a < Math.abs(c) ) {
                a = c; 
                var s = p/4;
            }
            else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            if (t < 1) {
                return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
                        Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            }
            return a*Math.pow(2,-10*(t-=1)) * 
                    Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
        },
        backIn: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
            s = 1.70158;
            }
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        backOut: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 2.70158;  //回缩的距离
            }
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }, 
        backBoth: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 1.70158; 
            }
            if ((t /= d/2 ) < 1) {
                return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            }
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        bounceIn: function(t, b, c, d){
            return c - Tween['bounceOut'](d-t, 0, c, d) + b;
        },       
        bounceOut: function(t, b, c, d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            }
            return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
        },      
        bounceBoth: function(t, b, c, d){
            if (t < d/2) {
                return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
            }
            return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
        }
    };
    //运动函数
    function move(op){
        var dely = 1000/60;
        // 声明运动时间
        op.time=op.time||1000;
        // 设置默认运动形式
        op.type=op.type||'easeIn';

        //设置tween的t,b,c,d
        var t = 0;
        var b = {};
        var c = {};
        var d = Math.ceil(op.time/dely);
        Object.keys(op.attrs).forEach(key =>{
            b[key] = css(op.el , key);
            c[key] = op.attrs[key] - b[key];
        });
   
        cancelAnimationFrame(op.el.timer);

        //使用Promise实现异步链式调用
        return new Promise((resolve , reject)=>{
            run();
            function run(){
                op.el.timer = requestAnimationFrame(function(){
                    
                    t++;
                    if(t > d){
                        cancelAnimationFrame(op.el.timer);
                        // && 判断
                        //op.cb&&op.cb();
                        resolve();
                    }else{
                        for(var i in b){
                            css(op.el , i , Tween[op.type](t,b[i],c[i],d));
                        }
                        run();
                    }
                });
            }
        });
        
    };
    //暂停运动
    move.stop = function(el){
        cancelAnimationFrame(el.timer);
    }
    //抖动函数
    function shake(op){
        if(!op.el || !op.attrs) return;
        var el = op.el;
        var num = op.num || 20;
        var attrs = op.attrs;
        var frequency = [];
        el.start = {};
        for(var i = num; i >= 0;i--){
            frequency.push(i%2 ? i : -i);
        }
        if(typeof attrs === 'object'){
            attrs.forEach(function(attr){
                el.start[attr] = css(el , attr);
            });
        }else{
            el.start[attrs] = css(el , attrs);
        }

        return new Promise((resolve , reject)=>{
            run();
            function run(){
                el.timer = requestAnimationFrame(function(){
                    if(frequency.length <= 0){
                        cancelAnimationFrame(el.timer);
                        //op.cb&&op.cb();
                        resolve();
                    }else{
                        var f = frequency.shift();
                        for(var s in el.start){
                            css(el , s , el.start[s]+f);
                        }
                        run();
                    }
                });
            }
        });
    }
    //停止抖动
    shake.stop = function(el){
        cancelAnimationFrame(el.timer);
        for(var s in el.start){
            css(el , s , el.start[s]);
        }
    }
    return {css , move , shake};
})()