module.exports = {
    authNo:function(){
        var value = "";
        for(var i=0; i<4; i++){
            value += parseInt(Math.random() * (9 -0 +1)) + 0;
        }
        return value;
      }
  }
  