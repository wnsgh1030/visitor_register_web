module.exports = {
    HTML_staff: function (script, body, style) {
        return `
            <!doctype html>
            <html>
            <head>
             <title>Visitor</title><meta charset="utf-8">
             <meta charset="utf-8">
            </head>
            <body>
              <h1>Visitor Register<a href="/logout"><button class="logout">Logout</button></a></h1>
              ${script}
              ${body}
              ${style}
            </body>
            </html>`
    },
    style_main: function () {
        return ` <style>
        body{
          text-align:center;
          font-family: sans-serif;
          color: #9E17EB;
        }
        h1{
            font-size: 100px;
            margin-top: 8px;
            margin-bottom: 40px;
        }
        input{
            width: 700px;
            height: 40px;
            border-color: #9E17EB;
            font-size: 40px;
            color: #9E17EB;
        }
        table#list_table{
          margin:auto;
          font-size: 35px;
          text-align:center;
          border: 1px solid #9E17EB;
        }
        table#list_table td{
            border: 1px solid #9E17EB;
        }
        table#tables{
            font-size: 35px;
            margin: auto;
        }
        table#tables tr{
            vertical-align: baseline;
        }
        table#create_visitor_table{
            border: 1px solid #9E17EB;
            
        }
        table#create_visitor_table td{
            border: 1px solid #9E17EB;
           
        }
        table#update_table{
            font-size: 35px;
            margin: auto;
        }
        button{
            background-color: white;
            border-width: 0px;
            font-family: sans-serif;
            color: #9E17EB;
        }
        button#create{
            font-size: 35px;
            width: 120px;
            height: 65px;
        }
        button#delete_update{
            width: 60px;
            height: 70px;
            font-size: 16px;

        }
        button#visitor_list{
            font-size:35px;
            width: 100%;
        }
        button#create_button{
            width: 100%;
            font-size: 35px;
        }
        button#update_button{
            width: 100%;
            font-size: 35px;
        }
        </style>`
    },
    list_form: function (result, staff_no) {
        console.log(result);
        var table =
            `<table id="list_table">
                  <thead>
                    <tr>
                        <td>이름</td>
                        <td>전화번호</td>
                        <td>이메일</td>
                        <td>방문날짜</td>
                        <td>방문목적</td>
                        <td>방문여부</td>
                        <td colspan="2"><a href="/staff/${staff_no}/create"><button id="create">Create</button></a></th>
                    </tr>
                  </thead>
                  <tbody>`;
        var i = 0;
        while (i < result.length) {
            date = JSON.stringify(result[i].visit_date)
            date = date.substring(1, 11)
            var check = "X";
            console.log(result[i].visit_check);
            if(result[i].visit_check){
                check = "O";
            }
            table = table + `<tr><td>${result[i].name}</td>
                    <td>${result[i].phone}</td><td>${result[i].email}</td><td>${date}</td><td>${result[i].purpose}</td><td>${check}</td>
                    <td><a href="/staff/${staff_no}/update/${result[i].no}"><button id="delete_update">Update</button></a></td>
                    <form action="/staff/${staff_no}/delete/${result[i].no}" method="post"><td><button id="delete_update" type="submit">Delete</button></td></form></tr>`;
            i = i + 1;
        }
        table = table + `</tbody></table>`;
        return table

    },
    create_visitor_list: function (result) {
        var table = '<table id="create_visitor_table"><tbody><tr><td>Recent_Visitor_List</td></tr>';
        var i = 0;
        while (i < result.length) {
            
            table = table + `<tr><td><button id='visitor_list' onclick='input_Text("${result[i].name}", "${result[i].phone}", "${result[i].email}");'>${result[i].name}</button></td></tr>`;
            i = i + 1;
        }
        table = table + '</tbody></table>';
        return table;
    },
    create_form: function (result, staff_no) {
        return `
        <table id="tables"><tr><td>
        <table id="create_table">
        <tbody>
        <form name="fr" action="/staff/${staff_no}/create_process" method="post" onsubmit="return check()">
        <tr>
            <td>NAME:</td>
            <td><input autocomplete="nope" type="text" name="name" id="name"></td>
        </tr>
        <tr>
            <td>PHONE:</td>
            <td><input autocomplete="nope" type="tel" name="phone" id="phone" placeholder="010-0000-0000"
            pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}" maxlength="13"></td>
        </tr>
        <tr>
            <td>EMAIL:</td>
            <td><input autocomplete="nope" type="text" name="email" id="email"></td>
        </tr>
        <tr>
            <td>PURPOSE:</td>
            <td><input autocomplete="nope" type="text" name="purpose"></td>
        </tr>
        <tr>
            <td>DATE:</td>
            <td><input autocomplete="nope" type="date" name="visit_date"></td>
        </tr>
        <tr>
            <td colspan="2"><button type="submit"id="create_button">Create</button></td></form>
        </tr>
        </tbody></table></td><td>${this.create_visitor_list(result)}</td></tr></table>`

    },
    update_form: function(result, staff_no, visitor_no){
        
        var date = result[0].visit_date
        date = JSON.stringify(date).substring(1,11)
        return `
        <table id="update_table">
        <tbody>
            <form action="/staff/${staff_no}/update_process/${visitor_no}" method="post" onsubmit="return check()">
            <tr>
                <td>NAME:</td>
                <td><input type="text" name="name" value = ${result[0].name}></td>
            </tr>
            <tr>
                <td>PHONE:</td>
                <td><input type="tel" name="phone" title="전화번호를 입력하세요." value=${result[0].phone} pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}" maxlength="13"></td>
            </tr>
            <tr>
                <td>EMAIL:</td>
                <td><input type="text" name="email" value=${result[0].email}></td>
            </tr>
            <tr>
                <td>PURPOSE:</td>
                <td><input type="text" name="purpose" value=${result[0].purpose}></td>
            </tr>
            <tr>
                <td>DATE:</td>
                <td><input type="date" name="visit_date" value=${date}></td>
            </tr>
           <tr>
                <td colspan="2"><button type="submit"id="update_button">Update</button></td></form>
           </tr>
        </tbody></table>
        `
    },
    update_script: function () {
        return `
        <script language="javascript">
        function input_Text(name, phone, email) {
            document.getElementById("name").value = name;
            document.getElementById("phone").value = phone;
            document.getElementById("email").value = email;
        }</script>`
    },
    create_script: function(){
        return `<script language="javascript">
        function check() {
          if(fr.name.value == "") {
            alert("값을 입력해 주세요.");
            fr.name.focus();
            return false;
          }
          else if(fr.phone.value == "") {
            alert("값을 입력해 주세요.");
            fr.phone.focus();
            return false;
          }
          else if(fr.email.value == "") {
            alert("값을 입력해 주세요.");
            fr.email.focus();
            return false;
          }
          else if(fr.purpose.value == "") {
            alert("값을 입력해 주세요.");
            fr.purpose.focus();
            return false;
          }
          else if(fr.visit_date.value == "") {
            alert("값을 입력해 주세요.");
            fr.visit_date.focus();
            return false;
          }
          else return true;
        }
        function input_Text(name, phone, email) {
            document.getElementById("name").value = name;
            document.getElementById("phone").value = phone;
            document.getElementById("email").value = email;
        }</script>`
    }
};