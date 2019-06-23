(function(){
    let nowId = 0;
    let treeMenu = document.querySelector("#tree-menu");
    let breadNav = document.querySelector(".bread-nav");
    let delBtn = document.querySelector(".del-btn");
    let confirm = document.querySelector(".confirm");
    let confirmClos = confirm.querySelector(".clos");
    let confirmBtns = confirm.querySelectorAll(".confirm-btns a");
    let folders = document.querySelector("#folders");

    //获取子菜单
    function getChildData(pid){
        return data.filter(item=>item.pid == pid)
    }

    //是否有子级
    function isChildData(pid){
        return data.some(item=>item.pid == pid)
    }

    //获取父级
    function getParentData(id){
        return data.filter(item=>item.id == id)[0]
    }

    //获取所有父级
    function getParentAll(id){
        var parentAll = [];
        var p = getParentData(id);
        while(p){
            parentAll.push(p);
            p = getParentData(p.pid);
        }
        return parentAll;
    }

    //菜单渲染
    function menuRender(id , level){
        var data = getChildData(id);
        var li = "<ul>";
        data.forEach(item=>{
            if(isChildData(item.id)){
                li+=`<li class='open'>
                        <p class="has-child" style="padding-left: ${20*level+40}px;"><span data-id="${item.id}">${item.title}</span></p>
                        ${menuRender(item.id , (level+1))}
                    </li>`
            }else{
                li+=`<li class='open'>
                        <p style="padding-left:  ${20*level+40}px;"><span data-id="${item.id}">${item.title}</span></p>
                    </li>`
            }
            
        });
        return li+"</ul>";
    };

    // 内容渲染
    function contentRender(){
        var data = getChildData(nowId);
        var li = "";
        data.forEach(item=>{
            li+=`<li class="folder-item" data-id="${item.id}">
                    <img src="img/folder-b.png" alt="">
                    <span class="folder-name">${item.title}</span>
                    <input type="text" class="editor" value="${item.title}">
                    <label class="checked">
                        <input type="checkbox">
                        <span class="iconfont icon-checkbox-checked"></span>
                    </label>   
                </li>`
        });
        folders.innerHTML = li;
        if(li){
            folders.classList.remove("folders-empty");
        }else{
            folders.classList.add("folders-empty");
        }
        optionFile();
    }

    //渲染导航
    function navRender(){
        var data = getParentData(nowId);
        var pAll = getParentAll(data.pid).reverse();
        var nav = pAll.map(item => `<a>${item.title}</a>`).join("");
        nav += `<span>${data.title}</span>`;
        breadNav.innerHTML = nav;
    }

    //菜单点击操作
    treeMenu.onclick = function(e){
        var id = e.target.dataset.id;
        if(id){
            nowId = id;
            contentRender();
            navRender();
        }
    }
    
    //文件夹操作
    function optionFile(){
        var folderItem = folders.querySelectorAll(".folder-item");
        folderItem.forEach(item => {
            item.onclick = function(){
                nowId = this.dataset.id;
                contentRender();
            }
        })
    }

    //删除操作
    delBtn.onclick = function(){
        confirm.style.opacity = "1";
        confirm.style.top = "50%";
    }

    //关闭弹出层
    confirmClos.onclick = closeConfirm;
    confirmBtns[1].onclick = closeConfirm;

    //关闭删除弹出层函数
    function closeConfirm(){
        confirm.style.opacity = "0";
        confirm.style.top = "-50%";
    }

    function render(){
        treeMenu.innerHTML = menuRender(-1 , 0);
        contentRender();
        navRender();
    }

    render();

})();