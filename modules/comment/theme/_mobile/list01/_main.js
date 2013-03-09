

// view
var checkFlag = false;
var oResizeFlag = false;
function layerOpen(e) {
    var x = myagent != 'ie' ? e.pageX : event.x + (document.body.scrollLeft || document.documentElement.scrollLeft);
    var y = myagent != 'ie' ? e.pageY : event.y + (document.body.scrollTop || document.documentElement.scrollTop);
    var layer = getId('pwbox');

    layer.style.display = 'block';
    layer.style.left = (x - 150) + 'px';
    layer.style.top = (y + 20) + 'px';
}
function cmentModify(id, e) {
    if ((memberid && memberid == id) || is_admin == '1') {
        return true;
    }
    else {
        layerOpen(e);
        var f = document.checkForm;
        f.target = '';
        f.a.value = '';
        f.type.value = 'modify';
        f.pw.focus();
        return false;
    }
}
function cmentDel(id, e) {
    if ((memberid && memberid == id) || is_admin == '1') {
        return confirm('정말 삭제하시겠습니까?    ');
    }
    else {
        layerOpen(e);
        var f = document.checkForm;
        f.target = '_action_frame_' + moduleid;
        f.a.value = 'delete';
        f.type.value = '';
        f.pw.focus();
        return false;
    }
}
function cmentDelClose() {
    getId('pwbox').style.display = 'none';
}
function permCheck(f) {
    if (checkFlag == true) {
        alert('확인중입니다. 잠시만 기다려 주세요.   ');
        return false;
    }

    if (f.pw.value == '') {
        alert('비밀번호를 입력해 주세요.   ');
        f.pw.focus();
        return false;
    }
    checkFlag = true;
}
function oneline_comment_flag() {
    if (oResizeFlag == false) {
        getId('oneline_comment').style.height = '200px';
        getId('oneline_comment_str').innerHTML = '입력상자 줄이기';
        oResizeFlag = true;
    }
    else {
        getId('oneline_comment').style.height = '28px';
        getId('oneline_comment_str').innerHTML = '입력상자 늘리기';
        oResizeFlag = false;
    }

    frameSetting();
}
function oneDel(id) {
    if ((memberid && memberid == id) || is_admin == '1') {
        return confirm('정말 삭제하시겠습니까?    ');
    }
    else {
        alert('삭제권한이 없습니다.    ');
        return false;
    }
}
function oneCheck(f) {
    if (memberid == '') {
        alert('로그인하셔야 이용하실 수 있습니다.');
        return false;
    }
    if (f.content.value == '') {
        alert('내용을 입력해 주세요.    ');
        f.content.focus();
        return false;
    }
}


// write
var submitFlag = false;
function writeCheck(f) {
    if (submitFlag == true) {
        alert('댓글을 등록하고 있습니다. 잠시만 기다려 주세요.');
        return false;
    }
    if (f.notice && f.hidden) {
        if (f.notice.checked == true && f.hidden.checked == true) {
            alert('공지글은 비밀글로 등록할 수 없습니다.  ');
            f.hidden.checked = false;
            return false;
        }
    }

    if (f.name && f.name.value == '') {
        alert('이름을 입력해 주세요. ');
        f.name.focus();
        return false;
    }

    if (f.pw && f.pw.value == '') {
        alert('비밀번호를 입력해 주세요. ');
        f.pw.focus();
        return false;
    }

    if (f.subject && f.subject.value == '') {
        alert('제목을 입력해 주세요.      ');
        f.subject.focus();
        return false;
    }

    if (f.content.value == '') {
        alert('내용을 입력해 주세요.       ');
        f.content.focus();
        return false;
    }

    submitFlag = true;
}
