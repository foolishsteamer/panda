javascript:
function fapimg(hcpid,hckey,hcrld,hctry){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://exhentai.org/s/'+hckey+'/'+gid+'-'+hcpid+'?nl='+hcrld,true);
xhr.onreadystatechange=function(e){if(xhr.readyState===4 && xhr.status===200){
var back=xhr.responseText;
var info=back.match(/<div id="i3"><a onclick="return load_image\((\d+), \'(.*?)\'\)" href="(?:.*?)"><img id="img" src="(.*?)" style="(?:.*?)" \/><\/a><\/div>/);
var nrld=back.match(/<a href="#" id="loadfail" onclick="return nl\(\'(.*?)\'\)">/)[1];
var orig=back.match(/href="(https:\/\/exhentai.org\/fullimg.php(.*?))"/);
var surl=(hctry && orig)?orig[1].replace(/\&amp;/g,'\&'):info[3];
var npid=info[1],nkey=info[2];
if(hcrld==''){
document.getElementById('list').innerHTML+='<div style="margin:8px auto;background:#FFF;width:720px;max-width:720px;display:block;" onclick="fapimg(\''+hcpid+'\',\''+hckey+'\',\''+nrld+'\');"><img id="p'+hcpid+'" src="'+surl+'" style="width:100%;" /></div>';
(npid==hcpid)?alert('finished'):fapimg(npid,nkey,'');
}
else{
var img=document.getElementById('p'+hcpid);
img.src=surl;
img.setAttribute('onclick','fapimg(\''+hcpid+'\',\''+hckey+'\',\''+nrld+'\')');
}
}};
xhr.send(null);
};
var path=document.getElementsByClassName('gdtm')[0].getElementsByTagName('a')[0].href.match(/exhentai.org\/s\/(.*?)\/(\d+)-(\d+)/);
document.body.innerHTML='<center><h1>[PandaFap:'+gid+':'+path[3]+']</h1></center><div id="list"></div>';
fapimg(path[3],path[1],'',confirm('尝试加载原图？'));
