exports.style_head = () => {
    return `
    body{
        width:1900px;
        overflow-X: hidden;
        text-align: center;
        font-family: 'Gothic A1', sans-serif;
        color: #9E17EB;
    }
    h1{
      font-size: 100px;
      margin-top: 8px;
      margin-bottom: 120px;
    }
    table{
        border-collapse: collapse;
        border-color: #9E17EB;
        text-align: center;
        font-size: 30px;
    }
    input{
        width: 700px;
        height: 50px;
        font-size: 45px;
        outline: 0;
        border-width: 0 0 2px;
        border-color: #9E17EB;
        color: #9E17EB;
        margin: 0 50px 14px;
        font-family: 'Gothic A1', sans-serif;c
    }
    input:focus {
        border-color: blue;
    }
    h2{
        font-size: 30px;
    }
    .logout{
        background-color: white;
        font-family: 'Gothic A1', sans-serif;
        border-width: 0px;
    }
    button{
        border-radius: 20px;
        background-color: white;
        font-family: 'Gothic A1', sans-serif;
        color: #9E17EB;
        border-color: #9E17EB;
    }
    button:hover{
        color: #fff !important;
        background-color: #9E17EB;
        box-shadow: 0px 15px 20px rgba(152, 44, 214, 0.4);
        transform: translateY(-10px);
    }
    .swal-button {
        width: 135px;
        height: 50px;
        border-radius: 2px;
        background-color: #9E17EB;
        font-size: 30px;
        border: 1px solid #9E17EB;
        font-family: 'Gothic A1', sans-serif;
    }
    .swal-button:not([disabled]):hover{
        background-color: #9E17EB;
        box-shadow: 0px 15px 20px rgba(152, 44, 214, 0.4);
        color: #fff;
        transform: translateY(-10px);
        font-family: 'Gothic A1', sans-serif;
    }
    `
}
exports.style_home = () => {
    return this.style_head() +
        `
        table {
          margin:0 auto;
          width: 875px;
          height: 250px;
        }
        button{
            margin-left: 8px;
            width: 350px;
            height: 100px;
            font-size: 50px;
        }
        .feedback{
            color: red;
            font-size: 50px;
            margin: 0 0 20px;
        }
        `
}
exports.style_staff = () => {
    return `    
    td.date{
        text-align: left;
        padding-left: 50px;
    }
    .back_button{
        font-size: 35px;
        width: 48%;
    }`
}
exports.style_td = () => {
    return `
    .visit_pre{
        color: red;
    }
    .visit_ing{
        color: green;
    }
    td#name{
        width: 105px;
        white-space: nowrap;
    }
    td#phone{
        width: 241px;
        white-space: nowrap;
    }
    td#email{
        width: 370px;
        white-space: nowrap;
    }
    td#date{
        width: 430px;
        white-space: nowrap;
    }
    td#purpose{
        width: 200px;
        white-space: nowrap;
    }
    td#check{
        width: 120px;
        white-space: nowrap;
    }
    table#list_table td{
        border : 1px solid #9E17EB;
    }`;
}
exports.style_staff_main = () => {
    return this.style_head() + this.style_td() + 
    ` table#list_table{
        margin:auto;
        text-align:center;
    }
    button#create{
        width: 230px;
        height: 65px;
        font-size: 40px;
    }
    button#update{
        width: 115px;
        height: 70px;
        color: blueviolet;
        font-size: 25px;
        border-color: blueviolet;
    }
    button#delete{
        width: 115px;
        height: 70px;
        color: red;
        font-size: 25px;
        border-color: red;
    }
    button#update:hover{
        background-color: blueviolet;
    }
    button#delete:hover{
        background-color: red;
    }
`;
}
exports.style_staff_create = () => {
    return this.style_head()  + this.style_staff() +
    `table#tables{
        text-align:center;
        margin: auto;
    }
    table#tables tr{
        vertical-align: baseline;
    }
    button#visitor_list{
        font-size:35px;
        width: 100%;
    }
    button#create_button{
        font-size: 35px;
        width: 48%;
    }`;
}
exports.style_staff_update = () =>{
    return  this.style_head() + this.style_staff() + 
    `
    table#update_table{
        font-size: 35px;
        margin: auto;
    }
    button#update_button{
        font-size: 35px;
        width: 48%;
    }`;
}
exports.style_admin = () => {
    return this.style_head() + this.style_td() +
        `
        table#search_html{
            margin:auto;
            text-align:center;
        }
        table#list_table{
            float: left;
        }
        table#current_table{
            float: right;
            margin-right: 1.05%;
        }
        table#current_table td{
            border : 1px solid #9E17EB;
        }
        table#search_tool{
            float: right;
            margin-right: 1.05%;
        }
        .home_search{
            font-size: 30px;
        }
        input#visit_date{
            width: 365px;
            margin: 0 0 14px;
        }` ;
}
