function actQue(flag)
{
	var f = document.listForm;
    var l = document.getElementsByName('members');
    var n = l.length;
    var i;
	var j=0;
	var s='';

	for	(i = 0; i < n; i++)
	{
		if (l[i].checked == true)
		{
			j++;
			s += l[i].value +',';
		}
	}
	if (!j)
	{
		alert('파일을 선택해 주세요.     ');
		return false;
	}
	
	if (flag == 'files_delete')
	{
		if (!confirm('사용중인 관련파일을 삭제할 경우 심각한 문제가 발생할 수 있습니다.\n\n그래도 삭제하시겠습니까?     '))
		{
			return false;
		}
	}
	f.a.value = flag;
	f.submit();
}
function fileEditCheck(f)
{
	if (f.newfile.value == '')
	{
		alert('파일명을 입력해 주세요.');
		f.newfile.focus();
		return false;
	}
	if(getId('backupcheck').checked == true)
	{
		f.backup.value = 1;
	}
	else {
		f.backup.value = '';
	}
	return confirm('정말로 실행하시겠습니까?     ');
}
function imgModifyCheck(f)
{
	if (f.upfile.value == '')
	{
		alert('변경하려는 파일을 선택해 주세요.');
		f.upfile.focus();
		return false;
	}
	if (f.upfile.value.indexOf('.'+f.fileext.value) == -1)
	{
		alert('기존파일은 [' + f.fileext.value + '] 포맷입니다.');
		f.upfile.focus();
		return false;
	}
}
function mkFolderCheck(f)
{
	if (f.newfolder.value == '')
	{
		alert('폴더명을 입력해 주세요.');
		f.newfolder.focus();
		return false;
	}
	if (!chkIdValue(f.newfolder.value))
	{
		alert('폴더명은 영문소문자/숫자/_ 만 사용가능합니다.');
		f.newfolder.focus();
		return false;
	}
}
function mkFileCheck(f)
{
	if (f.newfile.value == '')
	{
		alert('파일명을 입력해 주세요.');
		f.newfile.focus();
		return false;
	}
}
function imgShow(tdir,obj,w,e)
{
	var xy = getEventXY(e);

	if (w > 300)
	{
		var xw = 'width=300';
	}
	else {
		var xw = 'width='+w;
	}

	getId('hImg').style.display = 'block';
	getId('hImg').style.top = parseInt(xy.y) + 'px'
	getId('hImg').style.left = (parseInt(xy.x) + 20) + 'px';


	if (obj.innerHTML.indexOf('.swf') != -1)
	{
		getId('hImg').innerHTML = '<div style="background:#ffffff;border:#000000 solid 4px;"><embed src="'+tdir+obj.title+'" '+xw+' style="padding:5px;"></embed></div>';
	}
	else {
		getId('hImg').innerHTML = '<div style="background:#ffffff;border:#000000 solid 4px;"><img src="'+tdir+obj.title+'" '+xw+' style="padding:5px;" /></div>';
	}
}
function imgHide()
{
	getId('hImg').style.display = 'none';
}
function editBoxcontrol(img)
{
	var fbox = getId('editform');
	var ebox = getId('editbox');
	var ebox1 = getId('editboxarea');
	
	if (img.src.indexOf('btn_full') != -1)
	{
		fbox.style.zIndex = 10000;
		fbox.style.position = 'absolute';
		fbox.style.background = '#ffffff';
		fbox.style.top = '0';
		fbox.style.left = '0';
		ebox.style.margin = '15px';
		ebox1.style.width = (screen.availWidth - 67) + 'px';
		ebox1.style.height = (screen.availHeight - 221) + 'px';

		img.src = img.src.replace('btn_full','btn_resize');
		img.alt = '원래화면으로 편집';
	}
	else {
		fbox.style.zIndex = '';
		fbox.style.position = 'relative';
		ebox.style.margin = '0';
		ebox1.style.width = '100%';
		ebox1.style.height = '550px';

		img.src = img.src.replace('btn_resize','btn_full');
		img.alt = '전체화면으로 편집';
	}
}
function backChange(val)
{
	if (val)
	{
		if (val == '1')
		{
			getId('editbox').style.background = '#ffffff';
			getId('editboxarea').style.background = '#ffffff';
			getId('editboxarea').style.color = '#000000';
		}
		else if(val == '2') {
			getId('editbox').style.background = '#222222';
			getId('editboxarea').style.background = '#222222';
			getId('editboxarea').style.color = '#ffffff';
		}
		else {
			getId('editbox').style.background = '#085388';
			getId('editboxarea').style.background = '#085388';
			getId('editboxarea').style.color = '#ffffff';
		}
		setCookie('EditBackColor',val,1);
		val = '';
	}
}
function getBackCode()
{
	var f = document.srcForm;
	f.submit();
}
