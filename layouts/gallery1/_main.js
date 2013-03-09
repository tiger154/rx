function tabCheck_s(n,obj,layer)
{
	if (obj!='')
	{
		if (n==1)
		{
			obj.parentNode.children[0].className = 'tp tp1 vline on';
			obj.parentNode.children[1].className = 'tp tp1 vline';
			obj.parentNode.children[2].className = 'tp';
		}
		if (n==2)
		{
			obj.parentNode.children[0].className = 'tp tp1 vline';
			obj.parentNode.children[1].className = 'tp tp1 vline on';
			obj.parentNode.children[2].className = 'tp';
		}
		if (n==3)
		{
			obj.parentNode.children[0].className = 'tp tp1 vline';
			obj.parentNode.children[1].className = 'tp tp1 vline';
			obj.parentNode.children[2].className = 'tp on';
		}
	}
	getId(layer).innerHTML = '<div style="text-align:center;padding-top:'+(layer=='_myHOTlayer_'?150:100)+'px;"><img src="'+rooturl+'/_core/image/loading/white_big.gif" alt="" /></div>';
	setTimeout("tabCheck1Load("+n+",'"+layer+"');",100);
}
function tabCheck1Load(n,layer)
{
	var result = getHttprequest(rooturl+'/?r='+raccount+'&_themePage=ajax/'+layer+'&type='+n,'');
	getId(layer).innerHTML=getAjaxFilterString(result,'RESULT');
}
