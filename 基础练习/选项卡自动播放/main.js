var lis = document.querySelectorAll("li");
var divs = document.getElementById("box").querySelectorAll("div");
var iNow = 0;
var itimer = null;

for(var i = 0, len = lis.length;i < len;i++){
    lis[i].onclick=lisClick.bind(lis[i] , i);
    lis[i].onmouseover = function(){
        clearInterval(itimer);
    }
    lis[i].onmouseout = function(){
        play();
    }
}

function lisClick(index){
    for(var j = 0 , len = divs.length;j < len;j++){
        divs[j].style.display = "none";
        lis[j].className = "";
    }
    divs[index].style.display = "block";
    lis[index].className = "active";
    iNow = index;
}

play();

function play(){
    clearInterval(itimer);
    itimer = setInterval(function(){
        iNow++
        if(iNow === 4){iNow = 0};
        lisClick(iNow)
    },1000);
}