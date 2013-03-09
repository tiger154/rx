function searchBox() {
    if (getId('searchbox').style.display != 'block') {
        getId('searchbox').style.display = 'block';
        getId('m_keyword').focus();
    }
    else {
        getId('searchbox').style.display = 'none';
    }
}
