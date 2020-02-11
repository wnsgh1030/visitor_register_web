var moment = require("moment")

exports.date_sit = {
    date: "",
    total: 0,
    pre: 0,
    ing: 0,
    end: 0
}
exports.free_date_sit = () => {
    this.date_sit.date = "";
    this.date_sit.total = 0;
    this.date_sit.pre = 0;
    this.date_sit.ing = 0;
    this.date_sit.end = 0;
}
exports.HTML_admin = (script, body, style) => {
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
exports.admin_body = (form, table, title) => {
    var html = `
        <table id="search_html">
            <tbody>
                <tr>
                    
                    <td>${table}</td>
                    <td><a href="/admin"><button class="home_search"><i class="fas fa-home"></i> Home</button></a></td>
                    <td>${this.search_tool()}</td>
                </tr>
                <tr>
                <td colspan=3><h2><i class="fas fa-list"></i> ${title}<h2></td>
                </tr>
                <tr>
                    <td colspan=3>${form}</td>
                </tr>
            </tbody>
        <table>`
    return html;
}
exports.current_list_form = (result) => {
    this.free_date_sit();
    var table =
        `<table id="list_table">
                  <thead>
                    <tr>
                        <td id="name">이름</td>
                        <td id="phone">전화번호</td>
                        <td id="date">시간</td>
                        <td id="purpose">방문목적</td>
                        <td id="check">상태</td>
                        <td id="staff">담당자</td>
                    </tr>
                  </thead>
                  <tbody>`;
    var i = 0;
    while (i < result.length) {
        var check = "";
        var start_date = moment(result[i].start_date).format("YYYY-MM-DD");
        var end_date = moment(result[i].end_date).format("YYYY-MM-DD");
        if (result[i].status == 0) {
            check = " class=visit_pre>미방문"
            this.date_sit.pre += 1;
            this.date_sit.total += 1;
        }
        else if (result[i].status == 1) {
            check = " class=visit_ing>방문중";
            this.date_sit.ing += 1;
            this.date_sit.total += 1;
        }
        else {
            check = " class=visit_end>완료"
            this.date_sit.end += 1;
            this.date_sit.total += 1;
        }
        table = table + `<tr><td>${result[i].name}</td>
                        <td>${result[i].phone}</td><td>${start_date} ~ ${end_date}</td><td>${result[0].purpose}</td><td${check}</td><td>${result[i].staff_name}</td>`;
        i = i + 1;
    }
    table = table + `</tbody></table>`;
    return table ;
}
exports.current_table = () => {
    var date = moment().format("YYYY-MM-DD");
    var table = `<table id="current_table">
                  <thead>
                    <tr>
                        <td>날짜</td>
                        <td>전체</td>
                        <td>미방문</td>
                        <td>방문중</td>
                        <td>완료</td>
                    </tr>
                  </thead>
                  <tbody>`;
    table = table + `<tr><td>${date}</td><td>${this.date_sit.total}</td><td>${this.date_sit.pre}</td>
                            <td>${this.date_sit.ing}</td><td>${this.date_sit.end}</td></tr></tbody></table>`;
    return table;
}
exports.search_tool = () => {
    return `<table id="search_tool">
        <tbody>
            <tr>
                <form autocomplete="off" name="fr" action="/admin/search" method="POST" onsubmit="return search_check()">
                <td><input id="visit_date" type="date" name="visit_date"></td>
                <td><button type="submit" class="home_search"><i class="fas fa-search"></i> Search</button></td></form>
            </tr>
            <tr></tr>
        </tbody>
        </table>`;
}
exports.search_list_form = (result, date) => {
    this.free_date_sit();
    var table =
        `<table id="list_table">
                  <thead>
                    <tr>
                        <td id="name">이름</td>
                        <td id="phone">전화번호</td>
                        <td id="date">시간</td>
                        <td id="purpose">방문목적</td>
                        <td id="check">상태</td>
                        <td id="staff">담당자</td>
                    </tr>
                  </thead>
                  <tbody>`;
    var i = 0;
    this.date_sit.date = moment(date).format("YYYY-MM-DD");
    while (i < result.length) {
        var check = "";
        var visit_date = "";
        if (result[i].visit_date) {
            visit_date = moment(result[i].visit_date).format("YYYY-MM-DD HH:mm:ss");
        }
        else {
            result[i].visit_check = 0;
            visit_date = moment(result[i].start_date).format("YYYY-MM-DD") + " ~ " + moment(result[i].end_date).format("YYYY-MM-DD");
        }
        if (result[i].visit_check == 1) {
            check = " class=visit_ing>입장";
            this.date_sit.ing += 1;
            this.date_sit.total += 1;
        }
        else if (result[i].visit_check == 2) {
            check = " class=visit_end>퇴장";
            this.date_sit.end += 1;
            this.date_sit.total += 1;
        }
        else {
            check = " class=visit_pre>미방문";
            this.date_sit.pre += 1;
            this.date_sit.total += 1;
        }
        table = table + `<tr><td>${result[i].name}</td>
                        <td>${result[i].phone}</td><td>${visit_date}</td><td>${result[0].purpose}</td><td${check}</td><td>${result[i].staff_name}</td>`;
        i = i + 1;
    }
    table = table + `</tbody></table>`;
    return table
}
exports.search_table = () => {
    var table = `<table id="current_table">
                  <thead>
                    <tr>
                        <td>날짜</td>
                        <td>전체</td>
                        <td>미방문</td>
                        <td>입장</td>
                        <td>퇴장</td>
                    </tr>
                  </thead>
                  <tbody>`;
    table = table + `<tr><td>${this.date_sit.date}</td><td>${this.date_sit.total}</td><td>${this.date_sit.pre}</td>
                            <td>${this.date_sit.ing}</td><td>${this.date_sit.end}</td></tr></tbody></table>`;
    return table;
}