
exports.register_script = () => {
  return `
        function register_check() {
          if(fr.id.value == "") {
            swal("","아이디를 입력하세요", "error");
            fr.id.focus();
            return false;
          }
          else if(fr.pw.value == "") {
            swal("","비밀번호를 입력하세요", "error");
            fr.pw.focus();
            return false;
          }
          else if(fr.name.value == "") {
            swal("","이름을 입력하세요", "error");
            fr.name.focus();
            return false;
          }
          else if(fr.phone.value == "") {
            swal("","전화번호를 입력하세요", "error");
            fr.phone.focus();
            return false;
          }
          else if(fr.email.value == "") {
            swal("","이메일을 입력하세요", "error");

            fr.email.focus();
            return false;
          }
          else if(fr.position.value == "") {
            swal("","직책을 입력하세요", "error");
            fr.position.focus();
            return false;
          }
          else if(fr.department.value == "") {
            swal("","부서를 입력하세요", "error");
            fr.department.focus();
            return false;
          }
          else return true;
        }`;
}
exports.visitor_check = () => {
  return `function check() {
    if(fr.name.value == "") {
      swal("","이름을 입력하세요", "error");
      fr.name.focus();
      return false;
    }
    else if(fr.phone.value == "") {
      swal("","전화번호를 입력하세요", "error");
      fr.phone.focus();
      return false;
    }
    else if(fr.email.value == "") {
      swal("","이메일을 입력하세요", "error");
      fr.email.focus();
      return false;
    }
    else if(fr.purpose.value == "") {
      swal("","방문목적을 입력하세요", "error");
      fr.purpose.focus();
      return false;
    }
    else if(fr.start_date.value == "") {
      swal("","시작 날짜를 입력하세요", "error");
      fr.start_date.focus();
      return false;
    }
    else if(fr.end_date.value == "") {
      swal("","종료 날짜를 입력하세요", "error");
      fr.end_date.focus();
      return false;
    }`;
}
exports.create_script = () => {
  return ` 
  function input_Text(name, phone, email) {
    document.getElementById("name").value = name;
    document.getElementById("phone").value = phone;
    document.getElementById("email").value = email;}` + this.visitor_check() + 
    `else if(fr.today.value > fr.start_date.value){
      swal("","방문객 추가시 시작 날짜는 오늘 날짜보다 느릴 수 없습니다.", "error");
      fr.start_date.focus();
      return false;
    }
    else if(fr.start_date.value > fr.end_date.value){
      swal("","방문객 추가시 종료 날짜는 시작 날짜보다 빠를 수 없습니다..", "error");
      fr.end_date.focus();
      return false;
    }
    else return true;
  }`;
}
exports.update_script = () => {
  return this.visitor_check() + 
    `else if(fr.today.value > fr.start_date.value){
      swal("","방문객 수정시 시작 날짜는 오늘 날짜보다 느릴 수 없습니다.", "error");
      fr.start_date.focus();
      return false;
    }
    else if(fr.start_date.value > fr.end_date.value){
      swal("","방문객 수정시 종료 날짜는 시작 날짜보다 빠를 수 없습니다..", "error");
      fr.end_date.focus();
      return false;
    }
    else return true;
  }`
}
exports.staff_main_script = () => {
  return ` 
      function check(start_date,today) {
        if(today >= start_date){
          swal("","삭제나 수정은 시작 날짜가 오늘 날짜 이후여야 가능합니다.", "error");
          return false;
        }
        return true;
      }`;
}
exports.search_script = () => {
  return ` 
        function search_check() {
            if(fr.visit_date.value == "") {
              swal("","날짜를 입력하세요.", "error");
              fr.visit_date.focus();
              return false;
            }
            else return true;
          }`;
}


