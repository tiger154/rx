function menuFlag(obj)
{
	var coo = getCookie('admin_menu_display');
	var dis;
	var mar;

	if(coo == '' || coo == 'block')
	{
		dis = 'none';
		mar = '30px';
		obj.innerHTML = obj.innerHTML.replace('m_close','m_open');
		obj.innerHTML = obj.innerHTML.replace('메뉴접기','메뉴열기');
	}
	else {
		dis = 'block';
		mar = '325px';
		obj.innerHTML = obj.innerHTML.replace('m_open','m_close');
		obj.innerHTML = obj.innerHTML.replace('메뉴열기','메뉴접기');
	}

	getId('tttrspace').style.display = dis;
	getId('menuspace').style.display = dis;
	getId('content').style.marginLeft = mar;
	getId('footer').style.padding = '15px 0 0 '+mar;

	if(coo != dis) setCookie('admin_menu_display',dis,1);
	if (getId('editboxarea'))
	{
		setStart();
	}
}
function goAdmPage(obj)
{
	if (obj.value != '')
	{
		goHref(obj.value);
	}
	else {
		obj.value = '';
	}
}