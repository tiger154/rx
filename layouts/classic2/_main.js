function getMainPost(uid)
{
	getId('_getMainPost_').innerHTML = '<div style="text-align:center;padding-top:140px;"><img src="'+rooturl+'/_core/image/loading/white_big.gif" alt="" /></div>';
	setTimeout("getMainPostLoad("+uid+");",10);
	//getMainPostLoad(uid);
}
function getMainPostLoad(uid)
{
	var result = getHttprequest(rooturl+'/?r='+raccount+'&_themePage=ajax/mainPost&uid='+uid,'');
	getId('_getMainPost_').innerHTML=getAjaxFilterString(result,'RESULT');
}
