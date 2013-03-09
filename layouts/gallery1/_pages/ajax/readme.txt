AJAX 를 통해 요청되는 파일들은 반드시 이 폴더(ajax)안에 있어야 합니다.

AJAX 데이터 불러오기
--------------------

var result = getHttprequest(rooturl+'/?r='+raccount+'&_themePage=ajax/파일명(확장자제외)&추가파라미터(옵션),'');
var ajdata = getAjaxFilterString(result,'RESULT'); // 받아온 데이터

