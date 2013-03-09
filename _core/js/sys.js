//get object
function getId(id)
{
	return document.getElementById(id);
}
//redirect
function goHref(url)
{
	location.href = url;
}
//id pattern check
function chkIdValue(id)
{
	if (id == '') return false;
	if (!getTypeCheck(id,"abcdefghijklmnopqrstuvwxyz1234567890_")) return false;
	return true;
}
//filename pattern check
function chkFnameValue(file)
{
	if (file == '') return false;
	if (!getTypeCheck(file,"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_")) return false;
	return true;
}
//email check
function chkEmailAddr(email)
{
	if (email == '') return false;
	if (email.indexOf('\@') == -1 || email.indexOf('.') == -1) return false;
	return true;
}
//open window
function OpenWindow(url) 
{
	setCookie('TmpCode','',1);
	window.open(url,'','left=0,top=0,width=100px,height=100px,statusbar=no,scrollbars=no,toolbar=no');
}
//view image
function imgOrignWin(url)
{
	setCookie('TmpImg',url,1);
	OpenWindow(rooturl+'/_core/lib/zoom.cshtml','','width=10px,height=10px,status=yes,resizable=yes,scrollbars=yes');
}
//login check
function isLogin()
{
	if (memberid == '')
	{
		alert(needlog+'  ');
		return false;
	}
	return true;
}
/*set Cookie*/
function setCookie(name,value,expiredays) 
{ 
	var todayDate = new Date(); 
	todayDate.setDate( todayDate.getDate() + expiredays ); 
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
}
/*get Cookie*/
function getCookie( name )
{
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) 
		{
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 ) break;
	}
	return "";
}
/*event coordinates value*/
function getEventXY(e)
{
	var obj = new Object();
	obj.x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - (document.documentElement.clientLeft || document.body.clientLeft);
	obj.y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)  - (document.documentElement.clientTop || document.body.clientTop);
	return obj;
}
/*file extension*/
function getFileExt(file)
{
	var arr = file.split('.');
	return arr[arr.length-1];
}
/*object position, size*/
function getDivWidth(width,div)
{
	var maxsize = parseInt(width);
    var content = getId(div); 
    var img = content.getElementsByTagName('img');
	var len = img.length;
    for(i=0;i<len;i++) 
    {
        if (img[i].width > maxsize) img[i].width=maxsize;
		if (img[i].style.display == 'none') img[i].style.display = 'block';
    }
}
function getOfs(id) 
{ 
    var obj = new Object();
	var box = id.getBoundingClientRect(); 
	obj.left = box.left + (document.documentElement.scrollLeft || document.body.scrollLeft); 
	obj.top = box.top + (document.documentElement.scrollTop || document.body.scrollTop); 
	obj.width = box.right - box.left; 
	obj.height = box.bottom - box.top;
    return obj; 
} 
/*JOSA process*/
function getJosa(str, tail) 
{ 
    strTemp = str.substr(str.length - 1); 
    return ((strTemp.charCodeAt(0) - 16) % 28 != 0) ? str + tail.substr(0, 1) : str + tail.substr(1, 1); 
}
/*type compare (ex: getTypeCheck(string , "1234567890") ) */
function getTypeCheck(s, spc)
{
	var i;

	for(i=0; i< s.length; i++) 
	{
		if (spc.indexOf(s.substring(i, i+1)) < 0) 
		{
			return false;
		}
	}        
	return true;
}

/*insert comma (number_format)*/
function commaSplit(srcNumber) 
{ 
	var txtNumber = '' + srcNumber; 

	var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])'); 
	var arrNumber = txtNumber.split('.'); 
	arrNumber[0] += '.'; 
	do { 
		arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2'); 
	} 
	while (rxSplit.test(arrNumber[0])); 
	if (arrNumber.length > 1) { 
		return arrNumber.join(''); 
	} 
	else { 
		return arrNumber[0].split('.')[0]; 
	} 
}
function priceFormat(obj)
{
	if (!getTypeCheck(filterNum(obj.value),'0123456789'))
	{
		alert(neednum);
		obj.value = obj.defaultValue;
		obj.focus();
		return false;
	}
	else {
		obj.value = commaSplit(filterNum(obj.value));
	}
}
function numFormat(obj)
{
	if (!getTypeCheck(obj.value,'0123456789'))
	{
		alert(neednum);
		obj.value = obj.defaultValue;
		obj.focus();
		return false;
	}
}
function getJeolsa(price,_round)
{
	return price - (price%(_round*10));
}
/*remove comma*/
function filterNum(str) 
{ 
	return str.replace(/^\$|,/g, ""); 
}
/*paging*/
function getPageLink(lnum,p,tpage,img)
{
	var g_hi = img.split('|');
	var imgpath = g_hi[0];
	var wp = g_hi[1] ? g_hi[1] : '';
	var g_p1 = '<img src="'+imgpath+'/p1.gif" alt="Prev '+lnum+' pages" />';
	var g_p2 = '<img src="'+imgpath+'/p2.gif" alt="Prev '+lnum+' pages" />';
	var g_n1 = '<img src="'+imgpath+'/n1.gif" alt="Next '+lnum+' pages" />';
	var g_n2 = '<img src="'+imgpath+'/n2.gif" alt="Next '+lnum+' pages" />';
	var g_cn = '<img src="'+imgpath+'/l.gif" class="split" alt="" />';
	var g_q  = p > 1 ? '<a href="'+getPageGo(1,wp)+'"><img src="'+imgpath+'/fp.gif" alt="First page" class="phidden" /></a>' : '<img src="'+imgpath+'/fp1.gif" alt="First page" class="phidden" />';

	if(p < lnum+1) { g_q += g_p1; }
	else{ var pp = parseInt((p-1)/lnum)*lnum; g_q += '<a href="'+getPageGo(pp,wp)+'">'+g_p2+'</a>';} g_q += g_cn;

	var st1 = parseInt((p-1)/lnum)*lnum + 1;
	var st2 = st1 + lnum;

	for(var jn = st1; jn < st2; jn++)
	if ( jn <= tpage)
	(jn == p)? g_q += '<span class="selected" title="'+jn+' page">'+jn+'</span>'+g_cn : g_q += '<a href="'+getPageGo(jn,wp)+'" class="notselected" title="'+jn+' page">'+jn+'</a>'+g_cn;

	if(tpage < lnum || tpage < jn) { g_q += g_n1; }
	else{var np = jn; g_q += '<a href="'+getPageGo(np,wp)+'">'+g_n2+'</a>'; }
	g_q  += tpage > p ? '<a href="'+getPageGo(tpage,wp)+'"><img src="'+imgpath+'/lp.gif" alt="Last page" class="phidden" /></a>' : '<img src="'+imgpath+'/lp1.gif" alt="Last page" class="phidden" />';
	document.write(g_q);
}
/*page click*/
function getPageGo(n,wp)
{ 
	var v   = wp != '' ? wp : 'p';
	var p   = getUriString(v);
	var que = location.href.replace('&'+v+'='+p,'');
		que = que.indexOf('?') != -1 ? que : que + '?';
		que = que.replace('&mod=view&uid=' + getUriString('uid') , '');
	var xurl = que.split('#');
	return xurl[0].indexOf('?') != -1 ?  xurl[0] + '&'+v+'=' + n : xurl[0] + '?'+v+'=' + n; 
}
/*parameter value*/
function getUriString(param)
{
	var QuerySplit = location.href.split('?');
	var ResultQuer = QuerySplit[1] ? QuerySplit[1].split('&') : '';

	for (var i = 0; i < ResultQuer.length; i++)
	{
		var keyval = ResultQuer[i].split('=');
		if (param == keyval[0]) return keyval[1];
	}
	return '';
}
function getUrlParam(url,param)
{
	var QuerySplit = url.split('&');
	for (var i = 0; i < QuerySplit.length; i++)
	{
		var keyval = QuerySplit[i].split('=');
		if (param == keyval[0]) return keyval[1];
	}
	return '';
}
/* date format */
/* getDateFormat('yyyymmddhhiiss','xxxx.xx.xx xx:xx:xx')*/
var dateFormat = 0;
function getDateFormat(date , type)
{
	var ck;
	var rtstr = "";
	var j = 0;
	for(var i = 0; i < type.length; i++) 
	{
		if(type.substring(i,i+1) == 'x')
		{
			rtstr += date.substring(j,j+1);
		}
		else {
			j--;
			rtstr += type.substring(i,i+1);
		}
		j++;
	}
	if(dateFormat == 0)
	{
		document.write(rtstr);
	}
	else {
		dateFormat = 0;
		return rtstr;
	}
}
//selected, reversal
function chkFlag(f)
{
    var l = document.getElementsByName(f);
    var n = l.length;
    var i;

    for (i = 0; i < n; i++) l[i].checked = !l[i].checked;
}

//closing layer popup
function hidePopupLayer(n) 
{ 
	if ( getId('popCheck').checked == true )
	{
		var nowcookie = getCookie('popview');
		setCookie('popview', '['+n+']' + nowcookie , 1);
	}    
	getId('_action_layer_').style.display = 'none';
}
/*copy string*/
function copyStr(str) 
{
	if(myagent == 'ie')
	{
		window.clipboardData.setData('Text',str); 
	}
	else {
		window.execCommand('copy',str);
	}
}
//layer show/hide
function layerShowHide(layer,show,hide)
{
	if(getId(layer).style.display != show) getId(layer).style.display = show;
	else getId(layer).style.display = hide;
}
//keycode
function checkKeycode(e)
{
	if (window.event) return window.event.keyCode;
	else if (e) return e.which;
}
//AJAX-Request
function getHttprequest(URL,f) 
{ 
	var xmlhttp = null;
	if(window.XMLHttpRequest) xmlhttp = new XMLHttpRequest(); 
	else {try{xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}catch(e1){try{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}catch(e2){return false;}}}
	if (xmlhttp)
	{
		if (f)
		{
			var i;
			var iParam = "";
			for (i=1;i<f.length;i++)
			{
				if ((f[i].type=='radio'||f[i].type=='checkbox')&&f[i].checked==false) continue;
				iParam += '&' + f[i].name + '=' + encodeURIComponent(f[i].value);
			}
			xmlhttp.open("POST", URL, false); 
			xmlhttp.setRequestHeader("Content-Type","multipart/form-data;application/x-www-form-urlencoded;charset=utf-8");
			xmlhttp.send(iParam);
		}
		else {
			xmlhttp.open("GET", URL, false); 
			xmlhttp.send(null);
		}
		if (xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') return xmlhttp.responseText;
		xmlhttp = null;
	}
}
function getAjaxFilterString(str,code)
{
	var arr1 = str.split('['+code+':');
	var arr2 = arr1[1].split(':'+code+']');
	return arr2[0];
}
//iframe_for_action
function getIframeForAction(f)
{
	getId('_hidden_layer_').style.display = 'none';
	getId('_hidden_layer_').innerHTML = '<iframe name="__iframe_for_action__"></iframe>';
	if(f) f.target = '__iframe_for_action__';
}
function hrefCheck(obj,target,msg)
{
	if(target) getIframeForAction(obj);
	if(msg) return confirm(msg);
}
function getEventBoxPos(e)
{
	var gtop = 0;
	var gleft = 0;
	var ele = e.srcElement || e.target;
	if (parseInt(document.body.offsetWidth) > parseInt(document.body.scrollWidth))
	{
		if ((e.clientX == e.offsetX||ele.alt=='.')&&ele.alt!='..')
		{
			var box = getId('commentFrame').getBoundingClientRect(); 
			gleft = box.left;
			gtop = box.top;
		}
	}
	var clk = ele.getBoundingClientRect();
	var obj = new Object();
	var lt = (document.documentElement.scrollLeft || document.body.scrollLeft) - (document.documentElement.clientLeft || document.body.clientLeft);
	var tp = (document.documentElement.scrollTop || document.body.scrollTop) - (document.documentElement.clientTop || document.body.clientTop);
	obj.x = clk.right + lt + gleft;
	obj.y = clk.bottom + tp + gtop;
	obj.left = clk.left + lt + gleft;
	obj.top = clk.top + tp + gtop;
	return obj;
}
//member layer
var selPos;
function getMemberLayer(uid,e)
{
	var ly = getId('_action_layer_');
	ly.className = 'mbrLayerBlock';
	ly.style.display = 'block';
	ly.style.zIndex = '1';
	var xy = getEventBoxPos(e);
	var bx = getOfs(ly);
	var nowPos = parseInt(xy.x);
	var nowWidth = parseInt(document.body.offsetWidth);
	selPos = nowWidth - nowPos > 330 ? 'r' : 'l';
	
	var tags = '';
	if (selPos=='r')
	{
		ly.style.top = (parseInt(xy.y) - 61) + 'px';
		ly.style.left = (parseInt(xy.x) + 10) + 'px';
	}
	else {
		ly.style.top = (parseInt(xy.y) - 61) + 'px';
		ly.style.left = (parseInt(xy.x) - 370) + 'px';
	}
	tags += '<div style="height:100%;text-align:center;" onmousedown="showMemberLayer();"><img src="'+rooturl+'/_core/image/loading/white_big.gif" alt="" style="margin-top:'+((bx.height/2)-30)+'px;" /></div>';
	ly.innerHTML = tags;
	mbrclick = true;
	setTimeout("mbrclick=false;",200);
	setTimeout("getMemberLayerLoad('"+uid+"');",1);
	//getMemberLayerLoad(uid);
}
function getMemberLayerLoad(uid)
{
	var result = getHttprequest(rooturl+'/?r='+raccount+'&iframe=Y&system=layer.member&uid='+uid+'&selPos='+selPos,'');
	getId('_action_layer_').innerHTML=getAjaxFilterString(result,'RESULT');
}
function showMemberLayer()
{
	mbrclick=true;
	setTimeout("mbrclick=false;",200);
}
function closeMemberLayer()
{
	if(mbrclick==false) if(getId('_box_layer_').style.display!='block') getId('_action_layer_').style.display = 'none';
	if(parent.mbrclick==false) if(parent.getId('_box_layer_').style.display!='block') parent.getId('_action_layer_').style.display = 'none';
}
var startTop = 0;
var startLeft = 0;
function getLayerBox(url,title,w,h,e,ar,direction)
{
	var ly = getId('_box_layer_');
	ly.className = 'mbrLayerBlock';
	ly.style.width = w+'px';
	ly.style.height = h+'px';
	ly.style.display = 'block';
	ly.style.zIndex = '2';
	if (e)
	{
		var xy = getEventBoxPos(e);
	}
	else {
		var xy = new Object();
		xy.x = parseInt(screen.availWidth/2) - parseInt(w/2);
		xy.y = parseInt(screen.availHeight/2) - parseInt(h/2);
	}
	var bx = getOfs(ly);
	
	direction = direction ? direction : 'r';
	if (direction=='r')
	{
		ly.style.top = (xy.y - 50) + 'px';
		ly.style.left = (xy.x + 10) + 'px';
	}
	if (direction=='l')
	{
		ly.style.top = (xy.y - 50) + 'px';
		ly.style.left = (xy.left - 12 - w) + 'px';
	}
	if (direction=='b')
	{
		ly.style.top = (xy.y + 10) + 'px';
		ly.style.left = (xy.left+parseInt((xy.x-xy.left)/2)-parseInt(w/2)) - 7 + 'px';
	}
	if (direction=='t')
	{
		ly.style.top = (xy.top - h - 11) + 'px';
		ly.style.left = (xy.left+parseInt((xy.x-xy.left)/2)-parseInt(w/2)) - 7 + 'px';
	}

	if(parseInt(ly.style.top) < 0) ly.style.top = '10px';

	var tags = '';
	if (ar==true)
	{
		if(direction=='r')tags += '<div style="width:1px;height:1px;position:absolute;"><img src="'+rooturl+'/_core/image/_public/arr_left.gif" alt="" style="position:relative;top:30px;left:-8px;" /></div>';
		if(direction=='l')tags += '<div style="width:1px;height:1px;position:absolute;"><img src="'+rooturl+'/_core/image/_public/arr_right.gif" alt="" style="position:relative;top:30px;left:'+(w)+'px;" /></div>';
		if(direction=='b')tags += '<div style="width:1px;height:1px;position:absolute;"><img src="'+rooturl+'/_core/image/_public/arr_top.gif" alt="" style="position:relative;top:-8px;left:'+parseInt(w/2)+'px;" /></div>';
		if(direction=='t')tags += '<div style="width:1px;height:1px;position:absolute;"><img src="'+rooturl+'/_core/image/_public/arr_bottom.gif" alt="" style="position:relative;top:'+(h)+'px;left:'+parseInt(w/2)+'px;" /></div>';
	}
	tags += '<div style="height:30px;background:#efefef;">';
	tags += '<div style="float:left;"><span id="_layer_title_" style="display:block;padding:9px 0 0 10px;font-weight:bold;color:#202020;">'+title+'</span></div>';
	tags += '<div style="float:right;"><img src="'+rooturl+'/_core/image/_public/ico_x_01.gif" style="padding:8px 8px 8px 8px;cursor:pointer;" alt="" title="닫기(단축키:ESC)" onclick="getLayerBoxHide();" /></div>';
	tags += '<div class="clear"></div>';	
	tags +='</div>';
	tags += '<iframe id="_box_frame_" src="'+url+'" width="100%" height="'+(h-30)+'" frameborder="0"></iframe>';
	ly.innerHTML = tags;

	if (e=='')
	{
		startTop = parseInt(ly.style.top);
		startLeft = parseInt(ly.style.left);
		getLayerBoxMove();
		//setInterval('getLayerBoxMove();',100);
	}
}
function getLayerBoxMove()
{
	var ly = getId('_box_layer_');
	var lt = (document.documentElement.scrollLeft || document.body.scrollLeft);
	var tp = (document.documentElement.scrollTop || document.body.scrollTop);
	ly.style.left = (startLeft+lt) + 'px';
	ly.style.top = (startTop+tp) + 'px';
}
function getLayerBoxHide()
{
	showMemberLayer();
	getId('_box_layer_').innerHTML = '';
	getId('_box_layer_').style.display = 'none';
}
function hideImgLayer()
{
	if(getId('_box_layer_').innerHTML == '') closeMemberLayer();
	getId('_box_layer_').style.display = 'none';
	getId('_box_layer_').innerHTML = '';
}
function closeImgLayer(e)
{
	var k = checkKeycode(e);
	if (parent.getId('_box_layer_'))
	{
		switch (k)
		{
			case 27 : parent.hideImgLayer(); break;
		}
	}
	else {
		switch (k)
		{
			case 27 : hideImgLayer(); break;
		}
	}
}
function hubTab(mod,layer,option,obj)
{
	var i;
	var xy = getOfs(getId(layer));
	if(obj)
	{
		for (i = 0; i < obj.parentNode.children.length; i++) 
		if(obj.parentNode.children[i].className != 'more') obj.parentNode.children[i].className = obj.parentNode.children[i].className.replace('on','');
		obj.className = obj.className.indexOf('ls') != -1 ? 'ls on' : 'on';
	}
	getId(layer).innerHTML = '<div style="text-align:center;padding-top:'+(parseInt(xy.height/2)-30)+'px;"><img src="'+rooturl+'/_core/image/loading/white_big.gif" alt="" /></div>';
	setTimeout("hubTabLoad('"+mod+"','"+layer+"','"+option+"');",1);
	//hubTabLoad(mod,layer,option);
}
function hubTabLoad(type,layer,option)
{
	var result = getHttprequest(rooturl+'/?r='+raccount+'&system=layer.member1&iframe=Y&type='+type+'&option='+option);
	getId(layer).innerHTML=getAjaxFilterString(result,'RESULT');
}
