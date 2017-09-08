javascript:
function pf_fileload(gid,numb,hash,adds,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org/s/'+hash+'/'+gid+'-'+numb+'?'+adds,true);
xhr.onerror=function(e){exec(null);};
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
var html=xhr.responseText;
var info={};
info.numb=numb;
info.hash=hash;
info.show=html.match(/id="img" src="(.*?)"/)[1];
info.full=html.match(/href="(https:\/\/exhentai\.org\/fullimg.php(.*?))"/)?html.match(/href="(https:\/\/exhentai\.org\/fullimg.php(.*?))"/)[1].replace(/\&amp;/g,'\&'):info.show;
info.adds=adds+'&nl='+html.match(/onclick="return nl\(\'(.*?)\'\)"/)[1];
exec(info);
}};
xhr.send(null);
};
function pf_pageload(gid,token,numb,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org/g/'+gid+'/'+token+'/?p='+(numb-1),true);
xhr.onerror=function(e){if(confirm(pf_lang_c001)){pf_pageload(gid,token,numb,exec);}else{pf_doing=false;}};
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
var gdtm=xhr.responseText.match(/https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)/g);
var info={};
gdtm.forEach(function(value){var preg=value.match(/https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)/);info[preg[3]]=preg[1];});
exec(info);
}};
xhr.send(null);
};
function pf_mainload(){
if(document.domain!='exhentai.org' || !document.getElementById('gdt')){alert(pf_lang_a002);return;};
var pf_filenavi=document.getElementsByClassName('gpc')[0].innerHTML.match(/Showing (\d+) - (\d+) of (\d+) images/);
var pf_filepick=prompt(pf_lang_p001,pf_filenavi[1]+','+pf_filenavi[2]);
if(!pf_filepick){return;};
var pf_filefrom=(!pf_filepick.split(',')[0] || pf_filepick.split(',')[0]==0)?1:parseInt(pf_filepick.split(',')[0]);
var pf_filefinl=(!pf_filepick.split(',')[1] || pf_filepick.split(',')[1]==0)?parseInt(pf_filenavi[3]):parseInt(pf_filepick.split(',')[1]);
if(!pf_filefrom || !pf_filefinl || pf_filefrom>pf_filefinl || pf_filefrom<1 || pf_filefinl>parseInt(pf_filenavi[3])){alert(pf_lang_a003);return;};
var pf_pageconf=document.getElementsByClassName('ths');
var pf_pagetote=parseInt(pf_pageconf[0].innerHTML)*(pf_pageconf[1].innerHTML=='Normal'?10:5);
var pf_pagefrom=Math.ceil(pf_filefrom/pf_pagetote);
var pf_pagefinl=Math.ceil(pf_filefinl/pf_pagetote);
var pf_hashmap={};
pf_doing=true;
pf_orign=confirm(pf_lang_c002);
for(var numb=pf_pagefrom;numb<=pf_pagefinl;numb++){
pf_pageload(gid,token,numb,function(info){
pf_hashmap=Object.assign(pf_hashmap,info);
if(Object.keys(pf_hashmap).length==(pf_filefinl-pf_filefrom+1)){
document.body.innerHTML='<div id="pf_list" style="margin:24px auto;width:720px;max-width:100%;text-align:center;"><h1><a href="javascript:;" title="pandafap@qiukong.com" onclick="window.location.reload();" style="text-decoration:none;">PandaFap: '+gid+' {'+pf_filefrom+','+pf_filefinl+'} ('+pf_filenavi[3]+')</a></h1><br /></div>';
for(var numb=pf_filefrom;numb<=pf_filefinl;numb++){
document.getElementById('pf_list').innerHTML+='<img id="pf_file_'+numb+'" src="" alt="" style="margin:4px 0;max-width:100%;min-width:100px;min-height:100px;background:#000;" onclick="pf_fileload(gid,'+numb+',\''+pf_hashmap[numb]+'\',this.alt,function(info){if(!info){return;};var file=document.getElementById(\'pf_file_\'+info.numb);file.src=pf_orign?info.full:info.show;file.alt=info.adds;})" /><br />';
document.getElementById('pf_file_'+numb).click();
};
};
});
};
};
var pf_zhcn=(navigator.language && navigator.language=='zh-CN')?true:false;
var pf_lang_a001=pf_zhcn?'请勿重复运行':'Alerady in process';
var pf_lang_a002=pf_zhcn?'本页无法运行':'Incorrect usage';
var pf_lang_a003=pf_zhcn?'不正确的输入':'Illegal input';
var pf_lang_c001=pf_zhcn?'页面读取失败，是否重试？':'Pageload failed, Retry?';
var pf_lang_c002=pf_zhcn?'是否加载原图？（需要下载权限且配额充足）':'Track Orign?';
var pf_lang_p001=pf_zhcn?'输入图片范围（起始,结束），填写“0”加载全部。':'Input picture range (from,to), leave "0" to load all:';
var pf_doing,pf_orign;
if(pf_doing){alert(pf_lang_a001);}else{pf_mainload();};
//pandafap@qiukong.com
