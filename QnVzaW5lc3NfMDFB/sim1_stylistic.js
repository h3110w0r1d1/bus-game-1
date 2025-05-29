function TitleBusChange(x,msg){
  return document.getElementById(x).innerHTML=msg+'&nbsp;'+A.business.name;
}
function TableInfoChange(id,value){
   let r=document.getElementsByClassName(id)[0].children[0].children[1].children;
for(let i=1;i<r.length;i++){
  r[i].innerHTML=value;
}
}
