var minus = document.querySelectorAll(".minus");
var plus = document.querySelectorAll(".plus");
var price = document.querySelectorAll(".price");
var count = document.querySelectorAll(".count");
var nums = document.querySelectorAll(".n");
var tn = document.getElementById("totalNum");
var tp = document.getElementById("totalPrice");
var max = document.getElementById("max")

for(var i = 0 , len = minus.length;i < len;i++){
    minus[i].onclick = option.bind(minus[i] , i , 1);
    plus[i].onclick = option.bind(plus[i] , i , 2);
}

function option(i , type){
    var n = Number(nums[i].innerHTML);
    var o = type === 1 ? -1 : 1;
    var p = Number(price[i].innerHTML)*10
    n += o;
    if(n < 0){
        n = 0;
        alert("已经没有商品数量了");
    }else if(n > 10){
        n = 10;
        alert("最多购买10件商品");
    }else{
        totalNum += o;
        totalPrice += p*o;
    }

    nums[i].innerHTML = n;
    count[i].innerHTML = n*p / 10;
    total();
}

function total(){
    var totalNum = 0;
    var totalPrice = 0;
    var maxArr = [];
    for(var j = 0;j < len;j++){
        var n = Number(nums[j].innerHTML)
        totalNum += n;
        totalPrice += count[j].innerHTML*10;
        if(n > 0){
            maxArr.push(price[j].innerHTML)
        }
    }
    tn.innerHTML = totalNum;
    tp.innerHTML = totalPrice/10;
    max.innerHTML = maxArr.length > 0 ? Math.max(...maxArr) : 0;
}