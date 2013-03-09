function showM(m)
{
	var box = getId('subMenuBox'+m);
	if(box) box.style.display = 'block';
}
function hideM(m)
{
	var box = getId('subMenuBox'+m);
	if(box) box.style.display = 'none';
}
function tabCheck(n,obj)
{
	if (n==1)
	{
		obj.parentNode.children[0].className = 'tp vline on';
		obj.parentNode.children[1].className = 'tp';
		getId('nlogLayer').style.display = 'block';
		getId('slogLayer').style.display = 'none';
	}
	else {
		obj.parentNode.children[0].className = 'tp vline';
		obj.parentNode.children[1].className = 'tp on';
		getId('nlogLayer').style.display = 'none';
		getId('slogLayer').style.display = 'block';
	}
}
function tabCheck_s(n,obj,layer)
{
	if (obj!='')
	{
		if (n==1)
		{
			obj.parentNode.children[0].className = 'tp vline on';
			obj.parentNode.children[1].className = 'tp vline';
			obj.parentNode.children[2].className = 'tp';
		}
		if (n==2)
		{
			obj.parentNode.children[0].className = 'tp vline';
			obj.parentNode.children[1].className = 'tp vline on';
			obj.parentNode.children[2].className = 'tp';
		}
		if (n==3)
		{
			obj.parentNode.children[0].className = 'tp vline';
			obj.parentNode.children[1].className = 'tp vline';
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
function mNext(p)
{
	if (p==0)
	{
		//alert('처음 페이지입니다.');
		return false;
	}
	if (p==-1)
	{
		//alert('마지막 페이지입니다.');
		return false;
	}
	getId('_MainBox_').innerHTML = '<div style="text-align:center;padding-top:50px;"><img src="'+rooturl+'/_core/image/loading/white_big.gif" alt="" /></div>';
	var result = getHttprequest(rooturl+'/?r='+raccount+'&_themePage=ajax/_MainBox_&p='+p,'');
	getId('_MainBox_').innerHTML=getAjaxFilterString(result,'RESULT');
}
function followAction(a,fuid)
{
	var msg = a == 'friend_unfollow' ? '정말로 Unfollow 하시겠습니까?' : '정말로 Follow 하시겠습니까?';
	if (confirm(msg))
	{
		var result = getHttprequest(rooturl+'/?r='+raccount+'&_layoutAction='+a+'&fuid='+fuid,'');
		if (getAjaxFilterString(result,'RESULT')=='done') tabCheck_s(3,'','_myMSGlayer_');
	}
}
function layoutLogCheck(f)
{
	if (f.id.value == '')
	{
		alert('아이디를 입력해 주세요.');
		f.id.value='';
		f.id.focus();
		return false;
	}
	if (f.pw.value == '')
	{
		alert('패스워드를 입력해 주세요.');
		f.pw.value='';
		f.pw.focus();
		return false;
	}
	getIframeForAction(f);
}
function layoutRMBpw(ths)
{
	if (ths.checked == true)
	{
		if (!confirm('\n\n패스워드정보를 저장할 경우 다음접속시 \n\n패스워드를 입력하지 않으셔도 됩니다.\n\n그러나, 개인PC가 아닐 경우 타인이 로그인할 수 있습니다.     \n\nPC를 여러사람이 사용하는 공공장소에서는 체크하지 마세요.\n\n정말로 패스워드를 기억시키겠습니까?\n\n'))
		{
			ths.checked = false;
		}
	}
}
function snsCheck(key,use,conn)
{
	getIframeForAction('');
	if (conn == 'connect')
	{
		if (use == 'on' || use == 'off')
		{
			if (use == 'on')
			{
				if (!confirm('정말로 변경하시겠습니까?   '))
				{
					return false;
				}
			}
			frames.__iframe_for_action__.location.href = rooturl+'/?r='+raccount+'&m=social&a=disconnect&connect=Y&type='+key;
		}
		else {
			var w;
			var h;

			switch(key) 
			{
				case 't':
					w = 810;
					h = 550;
					break;
				case 'f':
					w = 1024;
					h = 680;
					break;
				case 'm':
					w = 900;
					h = 500;
					break;
				case 'y':
					w = 450;
					h = 450;
					break;
			}
			var url = rooturl+'/?r='+raccount+'&m=social&a=snscall_direct&type='+key;
			window.open(url,'','width='+w+'px,height='+h+'px,statusbar=no,scrollbars=no,toolbar=no');
		}
	}
	else if (conn == 'delete')
	{
		if (confirm('정말로 연결을 끊으시겠습니까?   '))
		{
			frames.__iframe_for_action__.location.href = rooturl+'/?r='+raccount+'&m=social&a=disconnect&delete=Y&type='+key;
		}
	}
	else {
		if (confirm('정말로 변경하시겠습니까?   '))
		{
			frames.__iframe_for_action__.location.href = rooturl+'/?r='+raccount+'&m=social&a=disconnect&type='+key;
		}
	}
}
