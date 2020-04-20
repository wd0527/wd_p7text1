function wdRem(){
    document.documentElement.style.fontSize=document.documentElement.clientWidth/6+"px"
}
wdRem();
window.onresize=wdRem;