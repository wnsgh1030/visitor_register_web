# visitor_register

방문자 관리 웹페이지

1. 회사의 직원이 회원가입한다
2. 직원이 방문객의 인적사항과 방문날짜를 입력하고 추가한다.
3. 추가 후 방문객의 고유 핀번호 (방문시작날짜+랜덤번호 4자리 YYYYMM - DDXXXX) 가 저장된 QR코드를 방문객 이메일로 전송한다.
4. 방문객은 회사 문에 달려있는 태블릿 어플을 이용하여 자신임을 증명한다.
5. 증명방법은 QR코드 리더와 고유 핀번호 입력 총 두가지이다.
6. 등록된 방문객이라면 문이 열리고 등록되지않은 방문객이라면 문이 열리지않는다.
7. 방문객은 입장시와 퇴장시에 두번 입력한다. 
8. 방문객이 들어오거나 나가게 되면 해당 방문객을 등록한 직원의 이메일로 방문객이 들어오거나 나갔다고 이메일을 전송한다.
9. 직원은 방문객의 내용을 수정하거나 삭제할 수 있다. 단 수정이나 삭제는 오늘 날짜 이후만 가능하다.
10. 관리자로 로그인하면 현재 방문현황과 지난 날의 방문 로그를 확인할 수 있다.
