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
info.full=html.match(/href="(https:\/\/exhentai\.org\/fullimg.php(.*?))"/)?html.match(/href="(https:\/\/exhentai\.org\/fullimg.php(.*?))"/)[1]:null;
info.adds=adds+'&nl='+html.match(/onclick="return nl\(\'(.*?)\'\)"/)[1];
exec(info);
}};
xhr.send(null);
};
function pf_pageload(gid,token,numb,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org/g/'+gid+'/'+token+'/?p='+(numb-1),true);
xhr.onerror=function(e){if(confirm('Pageload failed, Retry?')){pf_pageload(gid,token,numb,exec);}else{pf_doing=false;}};
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
var gdtm=xhr.responseText.match(/https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)/g);
var info={};
gdtm.forEach(function(value){var preg=value.match(/https:\/\/exhentai\.org\/s\/(\w+)\/(\d+)-(\d+)/);info[preg[3]]=preg[1];});
exec(info);
}};
xhr.send(null);
};
function pf_mainload(){
if(document.domain!='exhentai.org' || !document.getElementById('gdt')){alert('Incorrect usage');return;};
var pf_filenavi=document.getElementsByClassName('gpc')[0].innerHTML.match(/Showing (\d+) - (\d+) of (\d+) images/);
var pf_filepick=prompt('Input picture range, leave "0" to load all (from,to):',pf_filenavi[1]+','+pf_filenavi[2]);
if(!pf_filepick){return;};
var pf_filefrom=(!pf_filepick.split(',')[0] || pf_filepick.split(',')[0]==0)?1:parseInt(pf_filepick.split(',')[0]);
var pf_filefinl=(!pf_filepick.split(',')[1] || pf_filepick.split(',')[1]==0)?parseInt(pf_filenavi[3]):parseInt(pf_filepick.split(',')[1]);
if(!pf_filefrom || !pf_filefinl || pf_filefrom>pf_filefinl || pf_filefrom<1 || pf_filefinl>parseInt(pf_filenavi[3])){alert('Illegal input');return;};
var pf_pageconf=document.getElementsByClassName('ths');
var pf_pagetote=parseInt(pf_pageconf[0].innerHTML)*(pf_pageconf[1].innerHTML=='Normal'?10:5);
var pf_pagefrom=Math.ceil(pf_filefrom/pf_pagetote);
var pf_pagefinl=Math.ceil(pf_filefinl/pf_pagetote);
var pf_hashmap={};
pf_doing=true;
pf_orign=confirm('Track Orign?');
for(var numb=pf_pagefrom;numb<=pf_pagefinl;numb++){
pf_pageload(gid,token,numb,function(info){
pf_hashmap=Object.assign(pf_hashmap,info);
if(Object.keys(pf_hashmap).length==(pf_filefinl-pf_filefrom+1)){
document.body.innerHTML='<div id="pf_list" style="margin:24px auto;width:720px;max-width:100%;text-align:center;"><h1><a href="javascript:;" title="pandafap@qiukong.com" onclick="window.location.reload();" style="text-decoration:none;">PandaFap: '+gid+' {'+pf_filefrom+','+pf_filefinl+'} ('+pf_filenavi[3]+')</a></h1><br /></div>';
for(var numb=pf_filefrom;numb<=pf_filefinl;numb++){
document.getElementById('pf_list').innerHTML+='<img id="pf_file_'+numb+'" src="" alt="" style="margin:4px 0;max-width:100%;min-width:400px;min-height:300px;background:#000;" onclick="pf_fileload(gid,'+numb+',\''+pf_hashmap[numb]+'\',this.alt,function(info){if(!info){return;};var file=document.getElementById(\'pf_file_\'+info.numb);file.src=pf_orign?info.full:info.show;file.alt=info.adds;})" /><br />';
document.getElementById('pf_file_'+numb).click();
};
};
});
};
};
var pf_doing,pf_orign;
if(pf_doing){alert('Alerady in process');}else{pf_mainload();};
//pandafap@qiukong.com
