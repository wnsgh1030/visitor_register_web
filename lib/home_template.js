module.exports = {
  HTML_home: function (body, style_home,script) {
    return `
      <!doctype html>
      <html>
        <head>
         <title>Visitor</title><meta charset="utf-8">
        </head>
        <title>CSS</title>
      <body>
        <h1>Visitor Register</h1>
        ${script}
        ${body}
        ${style_home}
      </body>
      </html>
      `;
  },
  style_home: function () {
    return `
    <style>
    body{
      text-align: center;
      font-family: sans-serif;
      color: #9E17EB;
    
    }
    h1{
      font-size: 100px;
      margin-top: 8px;
      margin-bottom: 40px;
    }
    table {
      margin:auto;
      text-align: center;
      font-size: 35px;
      width: 800px;
      height: 250px;
    }
    button{
      border-radius: 20px;
      width: 350px;
      height: 100px;
      font-size: 50px;
      color: #9E17EB;
      background-color: white;
      border-color: #9E17EB;
      margin-left: 8px;
    }
    input{
      width: 700px;
      height: 40px;
      border-color: #9E17EB;
      font-size: 40px;
      color: #9E17EB;
    }
    tr{
      height:90px;
    }
    .feedback{
      color:red;
      font-size: 40px;
    }
    </style>`

  },
  login_form: function (feedback) {
    return `
    <table class="table table-striped">
    <tbody>
      <div class = "feedback">${feedback}</div>
      <form action="/login_process" method="post">
      <tr>
        <td>ID:</td>
        <td><input autocomplete="nope" type="text" name="id"></td>
      </tr>
      <tr>
        <td>PW:</td>
        <td><input type="password" name="pw"></td>
      </tr>
      <tr>
        <td></td>
        <td><button type="submit">Sign up</button></form><a href="/register"><button>Sign in</button></a></td>
      </tr>
      </tbody></table>`
  },
  register_form: function (feedback) {
    return `
    <table class="table table-striped">
    <tbody>
      <div style="color:red;">${feedback}</div>
      <form name="fr" action="/register_process" method="post" onsubmit="return check()">
      <tr>
        <td>ID:</td>
        <td><input autocomplete="nope" type="text" name="id"></td>
        <td>EMAIL:</td>
        <td><input autocomplete="nope" type="text" name="email"></td>
      </tr>
      <tr>
        <td>PW:</td>
        <td><input type="password" name="pw"></td>
        <td>POSITION:</td>
        <td><input type="text" name="position"></td>
      </tr>
      <tr>
        <td>NAME:</td>
        <td><input autocomplete="nope" type="text" name="name"></td>
        <td>DEPARTMENT:</td>
        <td><input autocomplete="nope" type="text" name="department"></td>
      </tr>
      <tr>
        <td>PHONE:</td>
        <td><input autocomplete="nope" type="text" name="phone"></td>
      </tr>
    <tr>
      <td colspan="2"><button class="register" type="submit">Sign in</button></td></form>
      <td colspan="2"><a href="/"><button>Back</button></a></td>
    </tr>
    </tbody></table>`

  },
  register_script: function(){
    return `    <script language="javascript">
    function check() {
      if(fr.id.value == "") {
        alert("값을 입력해 주세요.");
        fr.id.focus();
        return false;
      }
      else if(fr.pw.value == "") {
        alert("값을 입력해 주세요.");
        fr.pw.focus();
        return false;
      }
      else if(fr.name.value == "") {
        alert("값을 입력해 주세요.");
        fr.name.focus();
        return false;
      }
      else if(fr.phone.value == "") {
        alert("값을 입력해 주세요.");
        fr.phone.focus();
        return false;
      }
      else if(fr.department.value == "") {
        alert("값을 입력해 주세요.");
        fr.department.focus();
        return false;
      }
      else if(position.department.value == "") {
        alert("값을 입력해 주세요.");
        position.department.focus();
        return false;
      }
      else if(fr.email.value == "") {
        alert("값을 입력해 주세요.");
        fr.email.focus();
        return false;
      }
      else return true;
    }</script>`
  }
}
