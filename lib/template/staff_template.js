var moment = require("moment")
exports.HTML_staff = (script, body, style) => {
    return `
            <!doctype html>
            <html>
            <head>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
            <link rel="icon" href="/favicon.ico" type="image/x-icon">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"> 
            <link href="https://fonts.googleapis.com/css?family=Gothic+A1&display=swap" rel="stylesheet">
            <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
             <title>Visitor</title><meta charset="utf-8">
             <meta charset="utf-8">
            </head>
            <body>
              <h1>Visitor Register<a href="/logout"><button class="logout"><i class="fas fa-unlock"></i>로그아웃</button></a></h1>
              <script language="javascript">${script}</script>
              ${body}
            </body>
            <style>${style}</style>
            </html>`;
}
exports.main_body = (result, staff_no) => {
    var table =
        `<table id="list_table">
                  <thead>
                    <tr>
                        <td id="name">이름</td>
                        <td id="phone">전화번호</td>
                        <td id="email">이메일</td>
                        <td id="date">방문날짜</td>
                        <td id="purpose">방문목적</td>
                        <td id="check">상태</td>
                        <td class="button" colspan="2"><a href="/staff/${staff_no}/create"><button id="create"><i class="fas fa-plus"></i> 추가</button></a></td>
                    </tr>
                  </thead>
                  <tbody>`;
    var i = 0;
    while (i < result.length) {
        var today = moment().format("YYYY-MM-DD");
        var start_date = moment(result[i].start_date).format("YYYY-MM-DD");
        var end_date = moment(result[i].end_date).format("YYYY-MM-DD");
        var check = " class=visit_pre>미방문";
        if (result[i].visit_check === 1) {
            check = " class=visit_ing>방문중";
        }
        else if (result[i].visit_check === 2) {
            check = " class=visit_end>완료";
        }
        table = table + `<tr><td>${result[i].name}</td>
                    <td>${result[i].phone}</td><td>${result[i].email}</td><td>${start_date} ~ ${end_date}</td><td>${result[i].purpose}</td><td${check}</td>
                    <td class="button">
                        <a href="/staff/${staff_no}/update/${result[i].no}" onclick="return check('${start_date}','${today}')">
                        <button id="update"><i class="fas fa-pen"></i> 수정</button></a></td>
                        <form autocomplete="off" action="/staff/${staff_no}/delete/${result[i].no}" method="post" onsubmit="return check('${start_date}','${today}')">
                        <input type="hidden" name="start_date" value=${start_date}>
                        <input type="hidden" name="end_date" value=${end_date}>
                    <td class="button"><button type=submit id="delete"><i class="fas fa-trash-alt"></i> 삭제</button></form></td></tr>`;
        i = i + 1;
    }
    table = table + `</tbody></table>`;
    return table;

}
exports.resent_visitor_list = (result) => {
    var table = '<table id="create_visitor_table"><tbody><tr><td>Recent_Visitor_List</td></tr>';
    var i = 0;
    while (i < result.length) {

        table = table + `<tr><td><button id='visitor_list' onclick='input_Text("${result[i].name}", "${result[i].phone}", "${result[i].email}");'>${result[i].name}</button></td></tr>`;
        i = i + 1;
    }
    table = table + '</tbody></table>';
    return table;
}
exports.create_body = (result, staff_no) => {
    return `
        <table id="tables"><tr><td>
        <table id="create_table">
        <tbody>
        <form autocomplete="off" name="fr" action="/staff/${staff_no}/create_process" method="post" onsubmit="return check()">
        <tr>
            <td><input type="text" name="name" id="name" placeholder="이름"></td>
        </tr>
        <tr>
            <td><input type="tel" name="phone" id="phone" placeholder="전화번호"
            pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}" maxlength="13"></td>
        </tr>
        <tr>
            <td><input type="text" name="email" id="email" placeholder="이메일"></td>
        </tr>
        <tr>
            <td><input type="text" name="purpose" id="purpose" placeholder="방문목적"></td>
        </tr>
        <tr>
            <td class="date">시작날짜</td>
        </tr>
        <tr>
            <td><input type="date" name="start_date" id="start_date" placeholder="시작날짜"></td>
        </tr>
        <tr>
            <td class="date">종료날짜</td>
        </tr>
        <tr>
            <td><input type="date" name="end_date" id="end_date" placeholder="종료날짜"></td>
        </tr>
        <tr>
            <input type="hidden" name="today" value=${moment().format("YYYY-MM-DD")}>
            <td><button type="submit" id="create_button"><i class="fas fa-plus"></i> 추가</button></form> 
            <a href="/staff/${staff_no}"><button class="back_button"><i class="fas fa-arrow-left"></i> 뒤로가기</button></a></td>
        </tr>
        </tbody></table></td><td>${this.resent_visitor_list(result)}</td></tr></table>`;

}
exports.update_body = (result, staff_no, visitor_no) => {
    var start_date = moment(result[0].start_date).format("YYYY-MM-DD");
    var end_date = moment(result[0].end_date).format("YYYY-MM-DD");
    return `
        <table id="update_table">
        <tbody>
            <form  autocomplete="off" name='fr' action="/staff/${staff_no}/update_process/${visitor_no}" method="post" onsubmit="return check()">
            <tr>
                <td><input type="text" name="name" value = ${result[0].name} placeholder="이름"></td>
            </tr>
            <tr>
                <td><input type="tel" name="phone" title="전화번호를 입력하세요." value=${result[0].phone} pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}" maxlength="13" placeholder="전화번호"></td>
            </tr>
            <tr>
                <td><input type="text" name="email" value=${result[0].email} placeholder="email"></td>
            </tr>
            <tr>
                <td><input type="text" name="purpose" value=${result[0].purpose} placeholder="방문목적"></td>
            </tr>
            <tr>
                <td class="date">시작날짜</td>
            </tr>
            <tr>
                <td><input type="date" name="start_date" value=${start_date}></td>
            </tr>
            <tr>
                <td class="date">종료날짜</td>
            </tr>
            <tr>
                <td><input type="date" name="end_date" value=${end_date}></td>
            </tr>
           <tr>
                <input type="hidden" name="today" value=${moment().format("YYYY-MM-DD")}>
                <td colspan="2"><button type="submit"id="update_button"><i class="fas fa-pen"></i> 수정</button></form> 
                <a href="/staff/${staff_no}"><button class="back_button"><i class="fas fa-arrow-left"></i> 뒤로가기</button></a></td>
           </tr>
        </tbody></table>`;
}
