function tabClick(t,n,u)
{
	var i;
	for (i = 1; i <= t; i++)
	{
		getId('tabtitle'+i+'_'+u).className = '';
		getId('tabpost'+i+'_'+u).style.display = 'none';
	}
	getId('tabtitle'+n+'_'+u).className = 'on';
	getId('tabpost'+n+'_'+u).style.display = 'block';
}