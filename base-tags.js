// 在JQ等外部链接后引入此文件

// tags样式
var style = document.createElement("style");
style.type = 'text/css';
try {
    style.appendChild(document.createTextNode(`
    #tagModules{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: none;
        z-index:9999;
        background-color: #fff;
    }
    .tagTitle{
        width: 100%;
        height: 50px;
        padding: 15px;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        display:flex;
        align-items:center;
        background-color: #fff;
    }
    .tagTitle::after{
        width: 100%;          
        height: 0px;  
        content: '';
        position: absolute;    
        top: 100%;   
        left: 0;    
        border-top: solid  #EEEEEE 1px;
    }
    .tagTitle a:first-child::after{
        width: 40px;
        height: 50px;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
    }
    .tagTitle a.left img{
        width: 8.5px;
        height: auto;
    }
    .tagTitle .center img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 80px;
        height: auto;
    }
    .tagTitle .right img{
        width: 20px;
        height: auto;
    }
    .tagMain {
        width: 100%;
        height: auto;
        background-color: #FFF;
        margin-top: 50px;
        padding-bottom: 20px;
    }
    .tagMain p{
        color: #666666;
        font-size: 16px;
        font-weight: bold;
        padding: 8px 16px;
        box-sizing: border-box;
    }
    .tagMain .tags{
        width: 100%;
        height: auto;
        padding: 0px 16px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content:center;
    }
    .tagMain .tags .tag{
        width: 30%;
        height: auto;
        padding: 8px 0px;
        box-sizing: border-box;
        border-radius: 17px;
        text-align: center;
        color: #666666;
        background-color: #F8F8F8;
        white-space: nowrap;
        margin: 8px 0;
    }
    .tagMain .tags .tag:first-child:nth-last-child(2), 
    .tagMain .tags .tag:first-child:nth-last-child(2) ~ .tag { 
        width:48%;
        }

    .tagMain .tags .tag a{
        color: #666666;
    }
    .tags:after {
        display:block;
        content:"";
        width: 30%;
        height:0px;
    }
`));
} catch (ex) {
    style.stylesheet.cssText = css;
}
var Head = document.getElementsByTagName("head")[0];
Head.appendChild(style);

// 插入节点和渲染数据
let tagsDiv = document.createElement('div');
tagsDiv.id = 'tagModules'
$('body').append(tagsDiv);
var str = `<div class="tagTitle">
        <a href="javascript:;" class="left">
            <img src="./images/left.png" />
        </a>
        <a href="./index.html" class="center">
            <img src="./images/font2.png" />
        </a>
        <!-- <a href="./list.html" class="right">
            <img src="./images/tagmenu.png" />
        </a> -->
    </div>
    <div class="tagMain">
        <p>备考</p>
        <div class="tags">
            <div class="tag">
                <a href="./list.html">考试大纲</a>
            </div>
            <div class="tag">
                <a href="./list.html">招生简章</a>
            </div>
            <div class="tag">
                <a href="./list.html">参考书目</a>
            </div>
        </div>
        <p>院校</p>
        <div class="tags">
            <div class="tag">
                <a href="javascript:;">学校介绍</a>
            </div>
            <div class="tag">
                <a href="javascript:;">导师介绍</a>
            </div>
            <div class="tag">
                <a href="javascript:;">校园攻略</a>
            </div>
        </div>
        <p>复习</p>
        <div class="tags">
            <div class="tag">
                <a href="javascript:;">考研政治</a>
            </div>
            <div class="tag">
                <a href="javascript:;">考研英语</a>
            </div>
            <div class="tag">
                <a href="javascript:;">考研数学</a>
            </div>
            <div class="tag">
                <a href="javascript:;">考研专业课</a>
            </div>
        </div>
        <p>政策</p>
        <div class="tags">
            <div class="tag">
                <a href="javascript:;">自划线</a>
            </div>
            <div class="tag">
                <a href="javascript:;">国家线</a>
            </div>
            <div class="tag">
                <a href="javascript:;">复试线</a>
            </div>
        </div>
        <p>政策</p>
        <div class="tags">
            <div class="tag">
                <a href="javascript:;">研招办联系方式</a>
            </div>
            <div class="tag">
                <a href="javascript:;">成绩查询</a>
            </div>
        </div>
    </div>`
$('#tagModules').append(str);
// 引入界面右上角的icon点击显示tags
$('.header .right').click(function () {
    $('#tagModules').show();
})
// 点击隐藏
$('#tagModules .tagTitle .left').click(function () {
    $('#tagModules').hide();
})
