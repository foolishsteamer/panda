<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
<meta name="keywords" content="熊猫书签,Panda Bookmark" />
<meta name="description" content="熊猫书签,Panda Bookmark" />
<title>熊猫书签</title>
<style>
body{margin:0;padding:0;font-family:Microsoft Yahei;font-size:14px;line-height:30px;word-wrap:break-word;word-break:break-all;}
a{color:#000;text-decoration:none;}
#intro{margin:auto;padding:160px 20px;box-sizing:border-box;text-align:center;}
#intro img{margin-top:8px;max-width:100%;border:0;}
#exkey{display:block;margin:10px auto 16px auto;width:350px;max-width:100%;height:18px;}
#bookmark,#unlocker{margin:auto;padding:60px 20px;box-sizing:border-box;width:720px;max-width:100%;display:none;}
#bookmark img{margin-top:8px;max-width:100%;border:1px solid #000;}
</style>
</head>
<body>
<script>
var serv='http://exxx.ml/';
var pend;
function homepage(){
if(pend){clearTimeout(pend);};
document.getElementById('bookmark').style.display='none';
document.getElementById('unlocker').style.display='none';
document.getElementById('intro').style.display='block';
};
function exkeyget(type,func){
var exkey=document.getElementById('exkey').value;
if(!exkey){
var xhr=new XMLHttpRequest();
xhr.open('GET','exkey-'+type+'?'+Date.parse(new Date()),true);
xhr.setRequestHeader('Content-Type','x-www-form-urlencoded');
xhr.responseType='text';
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
exkey=xhr.responseText.replace(/[\r\n]/g,'');
if(!exkey){alert('公共账号失效');return;};
func(exkey);
}};
xhr.send(null);return;
};
if(exkey.length<36 || ! Number.isInteger(parseInt(exkey.split('x')[0].substr(32)))){alert('格式错误');return;};
window.location.hash=exkey;
func(exkey);
};
function bookmarkshow(){
exkeyget('bookmark',function(exkey){
var code="javascript:(function(){var a=document.createElement('script');a.setAttribute('src','//"+window.location.hostname+window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/'))+"/panda.js?'+Date.parse(new Date()));"+(document.getElementById('exkey').value?"a.setAttribute('exkey','"+exkey+"');":"")+"document.body.appendChild(a);}());";
document.getElementById('bookmarkcode').innerHTML='<a href="'+code+'"><b>[panda]</b></a><br /><input value="'+code+'" />';
document.getElementById('intro').style.display='none';
document.getElementById('unlocker').style.display='none';
document.getElementById('bookmark').style.display='block';
});
};
function unlockershow(){
exkeyget('unlocker',function(exkey){
pend=setTimeout(function(){window.location.href=serv+'?'+exkey;},5000);
document.getElementById('intro').style.display='none';
document.getElementById('bookmark').style.display='none';
document.getElementById('unlocker').style.display='block';
});
};
</script>
<div id="intro">
<img src="panda.png" alt="熊猫书签" />
<input type="text" id="exkey" placeholder="exkey" />
<input type="button" onclick="bookmarkshow();" value="生成书签" />
<input type="button" onclick="unlockershow();" value="一键解锁" />
<br /><br />
<a href="https://openuserjs.org/scripts/loligit/%E7%86%8A%E7%8C%AB%E4%B9%A6%E7%AD%BE" target="_blank"><u>油猴脚本(Beta)</u></a>：目前只含公共账号解锁<br />
使用前请先清空浏览器COOKIE<br />
<a href="https://assbbs.com/thread-170.htm" target="_blank">Feedback</a>
/
<a href="https://github.com/loligit/panda" target="_blank">Github</a>
/
<a href="http://evai.pl" target="_blank">Evai.pl</a>
</div>
<div id="bookmark">
<a href="javascript:;" onclick="homepage();"><b>&larr;&nbsp;返回首页</b></a><br />
<br />
<span id="bookmarkcode"></span><br />
<br />
<b>解锁 1.1</b><br />
PC浏览器请直接将按钮“[panda]”拖入书签栏。<br />
Android请使用<a href="https://www.mozilla.org/firefox" target="_blank"><u>Firefox</u></a>，长按按钮“[panda]”，将链接加入书签。<br />
IOS请复制代码，将本页添加书签。点击地址栏，长按书签图标编辑，粘贴代码替换网址。<br />
<img src="panda11.png" alt="" /><br />
<br />
<b>解锁 1.2</b><br />
在任意网址（非空白页）运行书签，点击确定跳转至图标页。<br />
<img src="panda12.png" alt="" /><br />
<br />
<b>解锁 1.3</b><br />
在图标页再次运行书签即可解锁登录。<br />
<img src="panda13.png" alt="" /><br />
<br />
<b>预览 2.1</b><br />
在专辑预览页运行书签启动列表模式。<br />
<img src="panda21.png" alt="" /><br />
<br />
<b>预览 2.2</b><br />
输入图片范围（起始,结束），填写“0”加载全部。（图片过多时加载缓慢）<br />
<img src="panda22.png" alt="" /><br />
<br />
<b>预览 2.3</b><br />
是否加载原图？（需要下载权限且配额充足，更慢！）<br />
<img src="panda23.png" alt="" /><br />
</div>
<div id="unlocker">
<a href="javascript:;" onclick="homepage();"><b>&larr;&nbsp;返回首页</b></a><br />
<br />
<b>即将跳转...</b><br />
收藏本页快速登录<br />
请勿修改公号设置<br />
</div>
<script>
if(window.location.hash){document.getElementById('exkey').value=window.location.hash.split('#').pop();};
</script>
</body>
</html>
