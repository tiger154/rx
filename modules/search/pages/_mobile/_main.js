function morebox(layer)
{
	if (getId(layer).style.display == 'block')
	{
		getId(layer).style.display = 'none';
	}
	else {
		getId(layer).style.display = 'block';
	}
}
