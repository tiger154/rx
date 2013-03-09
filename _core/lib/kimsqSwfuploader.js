function makeKimsqSwfuploader()
{
	var flashVar = '';
	var flashStr = '';

	flashVar += "limitSize="+limitSize+"&amp;";
	flashVar += "limitFile="+limitFile+"&amp;";
	flashVar += "ftypeName="+ftypeName+"&amp;";
	flashVar += "ftypeExt1="+ftypeExt1+"&amp;";
	flashVar += "ftypeExt2="+ftypeExt2+"&amp;";
	flashVar += "quploader="+quploader+"&amp;";
	flashVar += "qupload_m="+qupload_m+"&amp;";
	flashVar += "qupload_a="+qupload_a+"&amp;";
	flashVar += "object_Id="+object_Id+"&amp;";
	flashVar += "sess_Code="+sess_Code+"&amp;";
	flashVar += "Permision="+Permision+"&amp;";
	flashVar += "Overwrite="+Overwrite+"&amp;";
	flashVar += "save_Path="+save_Path;

	flashStr  = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" ';
	flashStr += 'width="'+swf_width+'" height="'+swfheight+'" id="'+object_Id+'">';
	flashStr += '<param name="allowScriptAccess" value="sameDomain" />';
	flashStr += '<param name="quality" value="high" />';
	flashStr += '<param name="movie" value="'+flash_Src+'" />';
	flashStr += '<param name="bgcolor" value="'+swbgcolor+'" />';
	flashStr += '<param name="flashvars" value="'+flashVar+'" />';
	flashStr += '<embed src="'+flash_Src+'" width="'+swf_width+'" height="'+swfheight+'" quality="high" ';
	flashStr += 'bgcolor="'+swbgcolor+'" name="'+object_Id+'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" ';
	flashStr += 'pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashVar+'" /></embed></object>&nbsp;';

	document.write(flashStr); 

}
function getFileSize(size)
{
	size = parseInt(size);
	return commaSplit(parseInt(size/1024)) + 'KB';
	//return size/1024 > 1024 ? parseInt(size/1024/1024) + 'MB' : parseInt(size/1024) + 'KB';
}
function KIMSQ_SWF_EVENT_LISTENER(key)
{

	val = key.split(':');
	var i = 0;
	i++;

	//파일선택
	if (val[0] == 'SELECTED')
	{
		getId('progress').style.display = 'block';
		getId('remainnum').innerHTML = val[1];
		getId('totalnum').innerHTML = val[1];
		getId('totalsize').innerHTML = getFileSize(val[2]);
	}
	//제한용량초과
	if (val[0] == 'OVERSIZE')
	{
		getId('progress').style.display = 'none';
		alert('용량이 초과되어 제한용량내에서 첨부되었습니다.     ');
		//alert('첨부가능용량 : ' + getFileSize(val[1]) + ' / 현재첨부용량 : ' + getFileSize(val[2]));
	}
	//첨부갯수초과
	if (val[0] == 'OVERNUM')
	{
		getId('progress').style.display = 'none';
		alert('갯수가 초과되어 제한갯수내에서 첨부되었습니다.     ');
		//alert('첨부가능갯수 : ' + val[1] + '개 / 현재첨부갯수 : ' + val[2] + '개');
	}
	//파일확장자제한
	if (val[0] == 'DENYEXP')
	{
		alert(val[1] + '파일은 첨부가 제외되었습니다.');
	}
	//진행상태
	if (val[0] == 'PROGRESS')
	{
		getId('filename').innerHTML = val[1] + '('+getFileSize(val[2])+')';
		getId('filepers').innerHTML = parseInt(parseInt(val[3]) / parseInt(val[4]) * 100) + '%';
		getId('filegrap').style.width = parseInt(parseInt(val[3]) / parseInt(val[4]) * 100) + '%';
	}
	//개별파일업로드완료
	if (val[0] == 'UPLOADED')
	{
		getId('filename').innerHTML = '전송완료';
		getId('filepers').innerHTML = '0%';
		getId('filegrap').style.width = '0px';
		getId('remainnum').innerHTML = parseInt(getId('remainnum').innerHTML) - 1;
		if (getId('remainnum').innerHTML == '0')
		{
			getId('progress').style.display = 'none';
			if (getCookie('TmpCode') == '')
			{
				setCookie('TmpCode',sess_Code,1);
			}
			location.reload();
		}
	}
	//네트워크에러
	if (val[0] == 'HTTPERROR')
	{
		alert("네트워크 에러가 발생하였습니다. 관리자에게 문의하세요.");
	}
	//입출력에러
	if (val[0] == 'IOERROR')
	{
		alert("입출력 에러가 발생하였습니다.\n다른 프로그램에서 이 파일을 사용중인지 확인하세요.");
	}
	//보안에러
	if (val[0] == 'SECUERROR')
	{
		alert("보안 에러가 발생하였습니다. 관리자에게 문의하세요.");
	}
	//권한없음
	if (val[0] == 'PERMERROR')
	{
		alert("첨부권한이 없습니다.");
	}
}
