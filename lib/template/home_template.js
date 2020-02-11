exports.HTML_home = (script, body, style) => {
  return `
      <!doctype html>
      <html>
        <head>
        <link rel="shortcut icon" href="https://https://visitor-register.herokuapp.com/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"> 
        <link href="https://fonts.googleapis.com/css?family=Gothic+A1&display=swap" rel="stylesheet">
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
         <title>Visitor</title><meta charset="utf-8">
        </head>
      <body>
        <h1>Visitor Register</h1>
        <script language="javascript">${script}</script>
        ${body}
      </body>
      <style>${style}</style>
      </html>
      `;
}
exports.login_body = (feedback) => {
  return `
    <table class="table table-striped">
    <tbody>
      <div class = "feedback">${feedback}</div>
      <form autocomplete="off" action="/login_process" method="post">
      <tr>
        <td><input type="text" name="id" placeholder="아이디" class="id_pw"></td>
      </tr>
      <tr>
        <td><input type="password" name="pw" placeholder="비밀번호" class="id_pw"></td>
      </tr>
      <tr>
        <td><button type="submit" class="login"><i class="fas fa-lock"></i> 로그인</br></button></form>
        <a href="/register"><button class="register"><i class="fas fa-user-plus"></i> 회원가입</button></a></td>
      </tr>
      </tbody></table>`;
}
exports.register_body = (feedback) => {
  return `
    <table class="table table-striped">
    <tbody>
      <div class = "feedback">${feedback}</div>
      <form  autocomplete="off" name="fr" action="/register_process" method="post" onsubmit="return register_check()">
      <tr>
        <td><input  type="text" name="id" placeholder="아이디"></td>
        <td><input type="text" name="email" placeholder="이메일"></td>
      </tr>
      <tr>
        <td><input type="password" name="pw" placeholder="비밀번호"></td>
        <td><input type="text" name="position" placeholder="직책"></td>
      </tr>
      <tr>
        <td><input type="text" name="name" placeholder="이름"></td>
        <td><input type="text" name="department" placeholder="부서"></td>
      </tr>
      <tr>
        <td><input type="text" name="phone" placeholder="전화번호" pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}" maxlength="13"></td>
      </tr>
    <tr>
      <td><button class="register" type="submit"><i class="fas fa-user-plus"></i> 회원가입</button></td></form>
      <td><a href="/"><button class="back_button"><i class="fas fa-arrow-left"></i> 뒤로가기</button></a></td>
    </tr>
    </tbody></table>`;
}

