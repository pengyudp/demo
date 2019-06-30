class Jquery{
    constructor(selector , root){
        if(typeof root === 'undefined'){
            this.prevObject = new Jquery(document , null)
        }

        if(root){
            this.prevObject = root;
        }

        if(typeof selector === 'function'){
            this.ready(selector)
        }else if(typeof selector === 'string'){
            let eles = document.querySelectorAll(selector);
            this.addElement(eles);
        }else if(typeof selector === 'object'){
            if(selector.length === undefined){
                this[0] = selector;
                this.length = 1;
            }else{
                this.addElement(selector);
            }
        }

    }

    addElement(eles){
        [...eles].forEach((item , index)=>{
            this[index] = item;
        });
        this.length = eles.length;
    }

    eq(index){
        return new Jquery(this[index] , this);
    }

    get(index){
        return this[index];
    }

    end(){
        return this.prevObject
    }

    ready(fn){
        window.addEventListener("DOMContentLoaded" , fn , false)
    }

    click(fn){
        for(let i = 0 ; i < this.length;i++){
            this[i].addEventListener("click" , fn , false);
        }
        return this;
    }

    on(attr , fn){
        let attrs = attr.replace(/\s+/g , " ").split(" ");
        for(let i = 0 ; i < this.length;i++){
            for(let j=0;j < attrs.length;j++){
                this[i].addEventListener(attrs[j] , fn , false);
            }
        }
        return this;
    }

    css(...arg){
        if(arg.length === 1){
            if(typeof arg[0] === 'string'){
                return getComputedStyle(this[0])[arg[0]];
            }else if(typeof arg[0] === 'object'){
                for(attr in arg[0]){
                    for(let i= 0;i < this.length;i++){
                        this.setStyle(this[i] , attr , arg[0][attr]);
                    }
                }
            }
        }else if(arg.length === 2){
            for(let i=0;i<this.length;i++){
                this.setStyle(this[i] , arg[0] , arg[1]);
            }
        }
    }

    setStyle(ele , attr , value){
        if(typeof value === 'number' && !$.cssNumber[attr]){
            ele.style[attr] = value +"px";
        }else{
            ele.style[attr] = value;
        }
    }

}

$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}

function $(selector){
    return new Jquery(selector);
}