{
    let left = document.querySelector("#left");
    let right = document.querySelector("#right");
    let imgBox = document.querySelector(".imgs")
    let imgs = imgBox.children;
    let imgLen = imgs.length;
    let wrap = document.querySelector(".wrap");
    let wrapW = mTween.css(wrap , "width");
    let wrapH = mTween.css(wrap , "height");

    //动画开关，动画完成后执行下一次
    let flag = true;
    //图片动画函数
    let imgMove = (attrs)=>{
        if(!flag) return;
        flag = false;
        mTween.move({
            el:imgs[imgLen-1],
            attrs,
            time:400
        }).then(function(){
            mTween.css(imgs[imgLen-1] , "left" , 0);
            mTween.css(imgs[imgLen-1] , "top" , 0);
            imgBox.insertBefore(imgs[imgLen-1] , imgs[0]);
            flag = true;
        })
    }

    //左箭头点击事件
    left.addEventListener("mousedown" , function(e){
        e = e || event;
        e.stopPropagation();
        imgMove({
            left:-wrapW
        });
    });
    //右箭头点击事件
    right.addEventListener("mousedown" , function(e){
        e = e || event;
        e.stopPropagation();
        imgMove({
            left:wrapW
        });
    });
    //上下左右键盘按下事件
    document.addEventListener("keydown" , function(e){
        e = e || event;
        if(e.keyCode === 39) imgMove({left:wrapW});
        if(e.keyCode === 37) imgMove({left:-wrapW});
        if(e.keyCode === 38) imgMove({top:-wrapH});
        if(e.keyCode === 40) imgMove({top:wrapH});
    });
    //鼠标滚轮事件
    mTween.mouseScroll(wrap , function(){
        imgMove({top:-wrapH});
    } , function(){
        imgMove({top:wrapH});
    });

    //拖拽
    let startPos = {};
    let disPos = {};
    let direction = "";
    let drag = (e)=>{
        e = e || event;
        disPos = {
            x : e.clientX - startPos.x,
            y : e.clientY - startPos.y
        };

        //老师，这有个问题，我不知道怎样固定一个我想要拖拽的方向。求一个思路
        if(Math.abs(disPos.x) > Math.abs(disPos.y)){
            direction = "left";
            mTween.css(imgs[imgLen-1] , "left" , disPos.x);
        }else if(Math.abs(disPos.x) < Math.abs(disPos.y)){
            direction = "top";
            mTween.css(imgs[imgLen-1] , "top" , disPos.y);
        }
    }

    wrap.addEventListener("mousedown" , function(e){
        e = e || event;
        e.preventDefault();
        if(!flag) return;
        startPos = {
            x: e.clientX,
            y: e.clientY
        }
        document.addEventListener("mousemove" , drag);
        document.addEventListener("mouseup" , function(e){
            if(Math.abs(disPos.x) < 60 && Math.abs(disPos.y) < 60){
                mTween.move({
                    el:imgs[imgLen-1],
                    attrs:{
                        left:0,
                        top:0
                    },
                    time:400
                });
            }else{
                let abs = 1;
                if(direction === 'left'){
                    abs = disPos.x > 0 ? 1 : -1;
                    imgMove({left:wrapW*abs});
                }else if(direction === 'top'){
                    abs = disPos.y > 0 ? 1 : -1;
                    imgMove({top:wrapH*abs});
                }
                
            }
            document.removeEventListener("mousemove" , drag);
            direction = "";
        } , {
            once:true
        });
    })
}