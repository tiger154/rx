
//작성코드얻기
function getEditCode(content,html)
{
	content.value = editStartMode == 'HTML' && editSrcMode == false ? frames.editAreaIframe.document.body.innerHTML : getId('editAreaTextarea').value;
	if (content.value == '<br>') content.value = '';
	html.value = editStartMode;
}
//작성양식포커스
function getEditFocus()
{
	if(editStartMode == 'HTML' && editSrcMode == false)
	{
		frames.editAreaIframe.focus();
	}
	else {
		getId('editAreaTextarea').focus();
	}
}
//HTML,TEXT 셋팅
function getAreaSet(type,mod)
{
	if (type == 'TEXT')
	{		
		getId('editImage').src = getId('editImage').src.replace('_textarea','_editor');

		if (mod == 'start')
		{
			if(parent.getId(ThisFrame+'Content')) getId('editAreaTextarea').value = parent.getId(ThisFrame+'Content').value;
		}
		else {
			if(myagent == 'ie')
			{
				getId('editAreaTextarea').value = frames.editAreaIframe.document.body.innerText;
			}
			else {
				getId('editAreaTextarea').value = frames.editAreaIframe.document.body.textContent;
			}
		}

		getId('editAreaIframe').style.display = 'none';
		getId('editAreaTextarea').style.display = 'block';
	}
	else {
		if (mod == 'start')
		{
			if(parent.getId(ThisFrame+'Content')) frames.editAreaIframe.document.body.innerHTML = parent.getId(ThisFrame+'Content').value;
		}
		else {
			frames.editAreaIframe.document.body.innerHTML = getId('editAreaTextarea').value.replace(/\n/g,'<br />');
		}
		getId('editImage').src = getId('editImage').src.replace('_textarea','_editor');
		getId('editAreaTextarea').value = '';
		getId('editAreaIframe').style.display = 'block';
		getId('editAreaTextarea').style.display = 'none';
	}
	
	btn_check(type);

	fieldSize('');

}
//에디터타입선택
function editselect()
{
	editlayerinit();
	
	if (editStartMode == 'HTML')
	{
		if (!confirm('텍스트로 변경하면 위지위그 요소가 사라지며 되돌릴 수 없습니다.\n그래도 변경하시겠습니까?')) return false;
	}

	editStartMode = editStartMode == 'HTML' ? 'TEXT' : 'HTML';
	getAreaSet(editStartMode,'');

	editlayerinit();
}
//소스보기
function SrcView()
{
	if (editStartMode == 'TEXT')
	{
		alert('텍스트편집모드 에서는 사용하실 수 없습니다.          ');
		return false;
	}
	
	if (editSrcMode == false)
	{	
		getId('editAreaTextarea').value = frames.editAreaIframe.document.body.innerHTML;
		frames.editAreaIframe.document.body.innerHTML = getId('setCssCode').innerHTML;
		
		getId('editAreaIframe').style.display = 'none';
		getId('editAreaTextarea').style.display = 'block';
		getId('editAreaTextarea').focus();
		btn_check1(15);
		editSrcMode = true;
	}
	else {
		
		frames.editAreaIframe.document.body.innerHTML = getId('editAreaTextarea').value;
		getId('editAreaTextarea').value = '';
		
		getId('editAreaIframe').style.display = 'block';
		getId('editAreaTextarea').style.display = 'none';
		getId('editAreaIframe').focus();
		btn_check1(0);
		editSrcMode = false;
	}
	editlayerinit();
	fieldSize('');
}
//버튼셋팅
function btn_check(type)
{
	var i;
	for ( i = 1; i < 20; i++ ) 
	{
		if (type == 'HTML')
		{
			getId('JustEditBtn_'+i).style.opacity = '1';
			getId('JustEditBtn_'+i).style.filter = 'alpha(opacity=100)';
			getId('JustEditBtn_'+i).style.cursor = 'pointer';
			getId('JustEditBtn_'+i).disabled = false;
		}
		else {
			getId('JustEditBtn_'+i).style.opacity = '0.3';
			getId('JustEditBtn_'+i).style.filter = 'alpha(opacity=30)';
			getId('JustEditBtn_'+i).style.cursor = 'none';
			getId('JustEditBtn_'+i).disabled = true;
		}
	}
}
function btn_check1(type)
{
	var i;

	for ( i = 1; i < 20; i++ )
	{
		if(type > 0)
		{
			if(type == i) 
			{
				getId('JustEditBtn_'+i).style.opacity = '1';
				getId('JustEditBtn_'+i).style.filter = 'alpha(opacity=100);';
				getId('JustEditBtn_'+i).style.cursor = 'pointer';
				getId('JustEditBtn_'+i).disabled = false;
			}
			else
			{
				getId('JustEditBtn_'+i).style.opacity = '0.3';
				getId('JustEditBtn_'+i).style.filter = 'alpha(opacity=30);';
				getId('JustEditBtn_'+i).style.cursor = 'none';
				getId('JustEditBtn_'+i).disabled = true;
			}
		}
		else {
			getId('JustEditBtn_'+i).style.opacity = '1';
			getId('JustEditBtn_'+i).style.filter = 'alpha(opacity=100);';
			getId('JustEditBtn_'+i).style.cursor = 'pointer';
			getId('JustEditBtn_'+i).disabled = false;
		}
	}
}
//텍스트모드 체크
function CheckTextMode()
{
	if (editStartMode == 'TEXT' || editSrcMode == true)
	{
		alert('텍스트 편집모드나 소스보기상태 에서는 사용하실 수 없습니다.          ');
		return false;
	}
	return true;
}
//색상선택
function ColorChartView(color_type,color)
{
	if(CheckTextMode())
	{
		color_type = color_type == 'hilitecolor' ?  (myagent == 'ie' ? 'Backcolor' : color_type) : color_type;

		if(myagent == 'ie')
		{
			EditForm.focus();
			EditSelc = EditRange.createRange();
			EditSelc.select();
			EditSelc.execCommand(color_type,'',color);
		}
		else {
			EditForm.document.execCommand(color_type,false,color);
			frames.editAreaIframe.focus();
		}
	}
}
//폰트태그적용
function FontChange(type , value)
{
	if(CheckTextMode())
	{
		if(myagent == 'ie')
		{
			EditForm.focus();
			EditSelc = EditRange.createRange();
			EditSelc.select();
			EditSelc.execCommand(type,'',value);
		}
		else {
			EditForm.document.execCommand(type,false,value);
			frames.editAreaIframe.focus();
		}
		editlayerinit();
	}
}
function FontHead(value)
{
	if(CheckTextMode())
	{
		if(myagent == 'ie')
		{
			EditForm.focus();
			EditSelc = EditRange.createRange();
			EditSelc.select();
			EditSelc.execCommand('FormatBlock' , '' , '<'+value+'>');
		}
		else {
			EditForm.document.execCommand('FormatBlock',false,value);
			frames.editAreaIframe.focus();
		}
		editlayerinit();
	}
}
//일반태그적용
function TagEdit(tag)
{
	if(CheckTextMode())
	{
		
		if(myagent == 'ie')
		{
			EditForm.focus();
			EditSelc = EditRange.createRange();
			EditSelc.select();
			EditSelc.execCommand(tag);
		}
		else {
			EditForm.document.execCommand(tag,false,'');
			frames.editAreaIframe.focus();
		}
		editlayerinit();
	}
}
//레이어숨기기
function editlayerinit()
{
	getId('EditLayer').innerHTML= '';
}
//글씨형식레이어
function fonthead()
{
	if(CheckTextMode())
	{
		var x = getId('EditLayer');

		if (x.innerHTML == '' || EditChck != 'x1')
		{
			var tags = "";
			tags += "<div style=\"position:absolute;\">";
			tags += "<div style=\"position:relative;top:-4px;left:30px;width:30px;border:#CAC9AA solid 1px;background:#F6F6F6;padding:5px;line-height:160%;\">";
			tags += "<a href=\"javascript:FontHead('h1');editlayerinit();\">&lt;H1&gt;</a><br />";
			tags += "<a href=\"javascript:FontHead('h2');editlayerinit();\">&lt;H2&gt;</a><br />";
			tags += "<a href=\"javascript:FontHead('h3');editlayerinit();\">&lt;H3&gt;</a><br />";
			tags += "<a href=\"javascript:FontHead('h4');editlayerinit();\">&lt;H4&gt;</a><br />";
			tags += "<a href=\"javascript:FontHead('h5');editlayerinit();\">&lt;H5&gt;</a><br />";
			tags += "<a href=\"javascript:FontHead('h6');editlayerinit();\">&lt;H6&gt;</a>";
			tags += "</div>";
			tags += "</div>";
			
			x.innerHTML = tags;
			getId('EditLayer').style.display = 'block';
		}
		else {
			editlayerinit();
		}

		EditChck = 'x1';
	}
}
//글씨체레이어
function fontfamily()
{
	if(CheckTextMode())
	{
		var x = getId('EditLayer');

		if (x.innerHTML == '' || EditChck != 'x2')
		{
			var tags = "";
			tags += "<div style=\"position:absolute;\">";
			tags += "<div style=\"position:relative;top:-4px;left:76px;width:73px;border:#CAC9AA solid 1px;background:#F6F6F6;padding:5px;line-height:160%;\">";
			tags += "<a href=\"javascript:FontChange('FontName','Gulim');editlayerinit();\" style=\"font-family:Gulim;\">굴림</a><br />";
			tags += "<a href=\"javascript:FontChange('FontName','Dotum');editlayerinit();\" style=\"font-family:Dotum;\">돋움</a><br />";
			tags += "<a href=\"javascript:FontChange('FontName','Batang');editlayerinit();\" style=\"font-family:Batang;\">바탕</a><br />";
			tags += "<a href=\"javascript:FontChange('FontName','Gothic');editlayerinit();\" style=\"font-family:gothic;\">고딕</a><br />";
			tags += "<a href=\"javascript:FontChange('FontName','Malgun gothic');editlayerinit();\" style=\"font-family:malgun gothic;\">맑은고딕</a><br />";
			tags += "<a href=\"javascript:FontChange('FontName','Arial');editlayerinit();\" style=\"font-family:Arial;\">Arial</a><br />";
			tags += "<a href=\"javascript:FontChange('FontName','Verdana');editlayerinit();\" style=\"font-family:Verdana;\">Verdana</a><br />";
			tags += "<a href=\"javascript:FontChange('FontName','Tomaha');editlayerinit();\" style=\"font-family:Tomaha;\">Tomaha</a><br />";
			tags += "<a href=\"javascript:FontChange('FontName','Sans-serif');editlayerinit();\" style=\"font-family:Sans-serif;\">Sans-serif</a><br />";
			tags += "</div>";
			tags += "</div>";
			x.innerHTML = tags;
			getId('EditLayer').style.display = 'block';
		}
		else {
			editlayerinit();
		}
		EditChck = 'x2';
	}
}
//글씨크기레이어
function fontsize()
{
	if(CheckTextMode())
	{
		var x = getId('EditLayer');

		if (x.innerHTML == '' || EditChck != 'x3')
		{
			var tags = "";
			tags += "<div style=\"position:absolute;\">";
			tags += "<div style=\"position:relative;top:-4px;left:121px;width:28px;border:#CAC9AA solid 1px;background:#F6F6F6;padding:5px;line-height:160%;\">";
			tags += "<div><a href=\"javascript:FontChange('FontSize','1');editlayerinit();\"> 08 pt</a></div>";
			tags += "<div><a href=\"javascript:FontChange('FontSize','2');editlayerinit();\"> 09 pt</a></div>";
			tags += "<div><a href=\"javascript:FontChange('FontSize','3');editlayerinit();\"> 12 pt</a></div>";
			tags += "<div><a href=\"javascript:FontChange('FontSize','4');editlayerinit();\"> 14 pt</a></div>";
			tags += "<div><a href=\"javascript:FontChange('FontSize','5');editlayerinit();\"> 18 pt</a></div>";
			tags += "<div><a href=\"javascript:FontChange('FontSize','6');editlayerinit();\"> 24 pt</a></div>";
			tags += "<div><a href=\"javascript:FontChange('FontSize','7');editlayerinit();\"> 36 pt</a></div>";
			tags += "</div>";
			tags += "</div>";
			x.innerHTML = tags;
			getId('EditLayer').style.display = 'block';
		}
		else {
			editlayerinit();
		}
		EditChck = 'x3';
	}
}
//글씨색깔레이어
function fontcolor()
{
	if(CheckTextMode())
	{
		var x = getId('EditLayer');

		if (x.innerHTML == '' || EditChck != 'x4')
		{
			var tags = "";
			tags += "<div style=\"position:absolute;\">";
			tags += "<div style=\"position:relative;top:-4px;left:200px;width:220px;border:#CAC9AA solid 1px;background:#F6F6F6;padding:10px;line-height:160%;\">";
			tags += frames.ColorArea.document.body.innerHTML;
			tags += "</div>";
			tags += "</div>";
			x.innerHTML = tags;
			getId('EditLayer').style.display = 'block';
		}
		else {
			editlayerinit();
		}
		EditChck = 'x4';
	}
}
//글씨배경레이어
function fontbg()
{
	if(CheckTextMode())
	{
		var x = getId('EditLayer');

		if (x.innerHTML == '' || EditChck != 'x5')
		{
			var tags = "";
			tags += "<div style=\"position:absolute;\">";
			tags += "<div style=\"position:relative;top:-4px;left:200px;width:220px;border:#CAC9AA solid 1px;background:#F6F6F6;padding:10px;line-height:160%;\">";
			tags += frames.ColorBgArea.document.body.innerHTML;
			tags += "</div>";
			tags += "</div>";
			x.innerHTML = tags;
			getId('EditLayer').style.display = 'block';
		}
		else {
			editlayerinit();
		}
		EditChck = 'x5';
	}
}
//콤포넌트
function showCompo()
{
	if(CheckTextMode())
	{
		var x = getId('EditLayer');

		if (x.innerHTML == '' || EditChck != 'x6')
		{
			var tags = "";
			tags += "<div style=\"position:absolute;width:100%;\">";
			tags += "<div style=\"position:relative;z-index:10;top:-1px;left:-1px;height:25px;border:#dfdfdf solid 1px;background:#F6F6F6;padding:5px 0 0 5px;\">";


			tags += '<img src="'+rooturl+'/modules/editor/image/s_layout.gif" title="레이아웃" alt="" class="hand" onclick="EditBox(\'layout\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_table.gif" title="테이블" alt="" class="hand" onclick="EditBox(\'table\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_lineheight.gif" title="행간" alt="" class="hand" onclick="EditBox(\'lineheight\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_box.gif" title="박스" alt="" class="hand" onclick="EditBox(\'box\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_char.gif" title="특수문자" alt="" class="hand" onclick="EditBox(\'char\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_link.gif" title="링크" alt="" class="hand" onclick="EditBox(\'link\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_split.gif" alt="" /> ';

			tags += '<img src="'+rooturl+'/modules/editor/image/s_icon.gif" title="아이콘" alt="" class="hand" onclick="EditBox(\'icon\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_image.gif" title="이미지" alt="" class="hand" onclick="EditBox(\'image\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_flash.gif" title="플래쉬" alt="" class="hand" onclick="EditBox(\'flash\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_movie.gif" title="동영상" alt="" class="hand" onclick="EditBox(\'movie\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_html.gif" title="붙혀넣기" alt="" class="hand" onclick="EditBox(\'html\');" /> ';
			tags += '<img src="'+rooturl+'/modules/editor/image/s_split.gif" alt="" /> ';

			tags += '<img src="'+rooturl+'/modules/editor/image/s_api.gif" title="확장API 콤포넌트" /> ';
			tags += '<select style="width:195px;position:relative;top:-6px;">';
			tags += '<option value="" style="color:#999999;">&nbsp;+ 더 확장된 편집도구들..</option>';
			tags += '<option value="" style="color:#999999;">-----------------------------------</option>';
			tags += '<option value="" style="color:#999999;">ㆍ등록된 도구가 없습니다</option>';
			tags += '</select> ';

			tags += "</div>";
			tags += "</div>";
			x.innerHTML = tags;
			getId('EditLayer').style.display = 'block';
		}
		else {
			editlayerinit();
		}
		EditChck = 'x6';
	}
}
function EditBox(compo)
{
	showCompo();
	OpenWindow('/?m=editor&front=lib&compo='+compo);
}
//결과값삽입
function EditDrop(result)
{
	if(CheckTextMode())
	{
		if(myagent == 'ie')
		{
			EditForm.focus();
			EditSelc = EditRange.createRange();
			EditSelc.select();
			EditSelc.pasteHTML(result);
		}
		else {
			EditForm.document.execCommand("inserthtml",false,result);
			frames.editAreaIframe.focus();
		}
	}
}
//도구상자열고닫기
var isToolbarOpen = false;
function ToolboxShowHide(plusH)
{
	if (getId('toolsbox').style.display != 'none')
	{
		getId('toolsbox').style.display = 'none';
	}
	else {
		getId('toolsbox').style.display = 'block';
	}
	
	if (isToolbarOpen == false)
	{
		editAreaHeight = parseInt(editAreaHeight) + plusH;
		isToolbarOpen = true;
	}
	else {
		editAreaHeight = parseInt(editAreaHeight) - plusH;
		isToolbarOpen = false;
	}
	fieldSize('');
}
//에딧에어리어높이
function fieldSize(flag)
{
	if (flag == '+')
	{
		if(parseInt(editAreaHeight) + 150 < 2000) editAreaHeight = parseInt(editAreaHeight) + 150;
	}
	if (flag == '-')
	{
		if(parseInt(editAreaHeight) - 150 > 55) editAreaHeight = parseInt(editAreaHeight) - 150;
		else editAreaHeight = 55;
	}

	if (editStartMode == 'TEXT' || editSrcMode == true)
	{		
		getId('editAreaTextarea').style.height = editAreaHeight + 'px';
	}
	else {
		getId('editAreaIframe').style.height = editAreaHeight + 'px';
	}

	if(parent.getId(frames.name))
	{
		parent.getId(frames.name).style.height = (parseInt(document.body.clientHeight) + (navigator.appVersion.indexOf('MSIE 8')!=-1?-4:0)) + 'px';
	}
	if (parent.parent.getId(parent.frames.name))
	{
		parent.frameSetting();
	}
}
