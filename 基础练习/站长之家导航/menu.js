var lis = document.querySelectorAll("li");
var layer = Array.from(document.querySelectorAll(".float_layer"));
var timer = null;

for(var i = 0;i < lis.length;i++){
    lis[i].onmouseover = mouseover.bind(lis[i] , i);
    lis[i].onmouseout = mouseout.bind(lis[i] , i);
}

function mouseover(index){
    clearTimeout(timer);
    layer.forEach(item =>{
        item.style.display="none";
    })
    layer[index].style.display = "block"
}

function mouseout(index){
    timer = setTimeout(function(){layer[index].style.display = "none"},300);
    
}