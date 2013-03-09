function makeSwfMultiUpload() {
    var flashVar = '';
    var flashStr = '';

    flashVar = "flash_width=" + swf_width + "&amp;";
    flashVar += "list_rows=" + list_rows + "&amp;";
    flashVar += "limit_size=" + limitSize + "&amp;";
    flashVar += "file_type_name=" + ftypeName + "&amp;";
    flashVar += "allow_filetype=" + ftypeExt1 + "&amp;";
    flashVar += "deny_filetype=" + ftypeExt2 + "&amp;";
    flashVar += "upload_exe=" + quploader + "&amp;";
    flashVar += "upload_mid=" + qupload_m + "&amp;";
    flashVar += "upload_aid=" + qupload_a + "&amp;";
    flashVar += "sess_Code=" + sess_Code + "&amp;";
    flashVar += "Permision=" + Permision + "&amp;";
    flashVar += "Overwrite=" + Overwrite + "&amp;";
    flashVar += "upload_dir=" + save_Path;

    flashStr = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" ';
    flashStr += 'width="' + swf_width + '" height="' + parseInt(list_rows * 20 + 33, 10) + '" id="' + object_Id + '" method="multi_upload">';
    flashStr += '<param name="allowScriptAccess" value="sameDomain" />';
    flashStr += '<param name="quality" value="high" />';
    flashStr += '<param name="movie" value="' + flashFile + '" />';
    flashStr += '<param name="bgcolor" value="' + swbgcolor + '" />';
    flashStr += '<param name="flashvars" value="' + flashVar + '" />';
    flashStr += '<embed src="' + flashFile + '" width="' + swf_width + '" height="' + parseInt(list_rows * 20 + 33, 10) + '" quality="high" ';
    flashStr += 'bgcolor="' + swbgcolor + '" name="' + object_Id + '" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" ';
    flashStr += 'pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashVar + '"></embed></object>';
    document.write(flashStr);
}
function callSwfUpload() {
    arrMovie = new Array();
    var arr_num = 0;
    var objectTags = document.getElementsByTagName('object');
    var movie;
    for (i = 0; i < objectTags.length; i++) {
        if (objectTags[i].getAttribute("method") == "multi_upload") {
            if (document.getElementsByName(objectTags[i].getAttribute("id"))[0]) {
                movie = document.getElementsByName(objectTags[i].getAttribute("id"))[0];
            }
            else {
                movie = document.getElementById(objectTags[i].getAttribute("id"));
            }
            if (movie.GetVariable("totalSize") > 0) {
                arrMovie[arr_num] = movie;
                arr_num++;
            }
        }
    }

    if (!arr_num) {
        alert('첨부할 파일을 선택해 주세요.       ');
        return false;
    }

    if (arrMovie.length > 0) {
        arrMovie[0].height = parseInt(20 * arrMovie[0].GetVariable("listRows") + 25 + 45, 10);
        arrMovie[0].SetVariable("startUpload", "");
        arr_mov = 0;
    }
    else {
        document.upForm.submit();
    }
}

function swfUploadComplete() {
    arr_mov++;
    if (arrMovie.length > arr_mov) {
        arrMovie[arr_mov].height = parseInt(20 * arrMovie[arr_mov].GetVariable("listRows") + 25 + 45, 10);
        arrMovie[arr_mov].SetVariable("startUpload", "");
    }
    else {
        document.upForm.submit();
    }
}

function fileTypeError(notAllowFileType) {
    alert("확장자가 " + notAllowFileType + "인 파일들은 업로드 할 수 없습니다.");
}

function overSize(limitSize) {
    alert("선택한 파일의 크기가 " + limitSize + "를 초과했습니다.");
}
function httpError() {
    alert("네트워크 에러가 발생하였습니다. 관리자에게 문의하세요.");
}

function ioError() {
    alert("입출력 에러가 발생하였습니다.\n다른 프로그램에서 이 파일을 사용중인지 확인하세요.");
}

function SecurityError() {
    alert("보안 에러가 발생하였습니다. 관리자에게 문의하세요.");
}
function PermError() {
    alert("첨부권한이 없습니다.");
}