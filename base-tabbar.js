// 在JQ等外部链接后引入此文件


// TabBar样式
var style = document.createElement("style");
style.type = 'text/css';
try {
    style.appendChild(document.createTextNode(`
        #tabbar{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            min-height: 50px;
            background-color: #FFFFFF;
            z-index: 999;
            display: flex;
            justify-content: space-between;
            padding:6px 30px;
            font-size: 12px;
            box-shadow:0px -2px 3px 0px rgba(239,239,239,0.75);
            box-sizing: border-box; 
        }
        #tabbar a{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            color:#666666;
        }
        // #tabbar a:hover{
        //     color:#FF8F3A;
        // }
                `));
} catch (ex) {
    style.stylesheet.cssText = css;
}
var Head = document.getElementsByTagName("head")[0];
Head.appendChild(style);

// 配置TabBar数据
var tab = [
    {
        text: "首页",
        url: "./index.html",
        path: 'http://www.kaoyan1v1.com/m/images/tab-01.png',
        active: 'http://www.kaoyan1v1.com/m/images/tab-02.png'
    },
    {
        text: "资料",
        url: "./list.html",
        path: 'http://www.kaoyan1v1.com/m/images/tab-03.png',
        active: 'http://www.kaoyan1v1.com/m/images/tab-04.png'
    },
    {
        text: "调剂",
        url: "javascript:;",
        path: 'http://www.kaoyan1v1.com/m/images/tab-05.png',
        active: 'http://www.kaoyan1v1.com/m/images/tab-06.png'
    },
    {
        text: "服务",
        url: "javascript:;",
        path: 'http://www.kaoyan1v1.com/m/images/tab-07.png',
        active: 'http://www.kaoyan1v1.com/m/images/tab-08.png'
    },
    {
        text: "我的",
        url: "javascript:;",
        path: 'http://www.kaoyan1v1.com/m/images/tab-09.png',
        active: 'http://www.kaoyan1v1.com/m/images/tab-10.png'
    }
];
// 插入节点和渲染数据
let div = document.createElement('div');
div.id = 'tabbar'
$('body').append(div);
var longStr = '';
console.log(window.location.href);
$.each(tab, function (index, val) {
    if (window.location.href.indexOf("kaoyan1v1.com/m") != -1 &&
        tab[index].url.indexOf("http://www.kaoyan1v1.com/m")!=-1) {
        console.log(tab[index].url);
        var str = `<a href="${tab[index].url}" style="color:#FF8F3A">
                        <img src="${tab[index].active}" alt="" style="width: 20px;height:auto">
                        ${tab[index].text}</a>`
        longStr = longStr + str;
    } else {
        var str = `<a href="${tab[index].url}" >
                        <img src="${tab[index].path}" alt="" style="width: 20px;height:auto">
                        ${tab[index].text}</a>`
        longStr = longStr + str;
    }
})
$('#tabbar').append(longStr);
// 恢复body容器被tabbar遮挡高度
$('body').css({ 'marginBottom': '50px' })