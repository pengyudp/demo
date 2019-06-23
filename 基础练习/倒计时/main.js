var inputs = document.getElementById("fill_in").querySelectorAll("input");
var strong = document.getElementById("target").querySelector("strong");
var go = document.getElementById("go");
var ps = document.getElementById("date").querySelectorAll("p")
var timer = null;

initDate(new Date);

function initDate(date){
    var y = date.getFullYear();
    var m = dateFormatter(date.getMonth()+1);
    var d = dateFormatter(date.getDate());    
    inputs[0].value = y;
    inputs[1].value = m;
    inputs[2].value = d;
    strong.innerHTML = y+"年"+m+"月"+d+"日";
}

function dateFormatter(d){
    return d > 9 ? d : "0"+d;
}

go.onclick = function(){
    clearInterval(timer);
    var date = new Date();
    var currTime = date.getTime();
    date.setFullYear(inputs[0].value);
    date.setMonth(Number(inputs[1].value)-1);
    date.setDate(inputs[2].value);
    var setTime = date.getTime();
    var downTime = setTime - currTime;
    if(downTime < 0){
        alert("设置的时间不能小于当前时间");
    }else if(downTime < 0){
        alert("请设置需要倒计时的时间");
    }else{
        initDate(date);
        countDown(downTime);
        timer = setInterval(function(){
            downTime-=1000;
            if(downTime === 0){ clearInterval(timer)};
            countDown(downTime)
        },1000)
    }
}

function countDown(downTime){
    var d = Math.floor(downTime / (1000*60*60*24));
    var yd = downTime % (1000*60*60*24)
    var h = Math.floor(yd / (1000*60*60));
    var yh = yd % (1000*60*60);
    var m = Math.floor(yh / (1000*60));
    var ym = yh % (1000*60);
    var s = Math.floor(ym / 1000);
    ps[0].innerHTML = dateFormatter(d);
    ps[1].innerHTML = dateFormatter(h);
    ps[2].innerHTML = dateFormatter(m);
    ps[3].innerHTML = dateFormatter(s);
}