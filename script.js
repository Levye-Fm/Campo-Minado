var cronometro;
function calcularTempo() {
    var segundos = 0;
    var minutos = 0;
    var tempo = document.getElementById('tempo');
    
    clearInterval(cronometro);
    cronometro = setInterval(function() {  
      segundos++;
      
      if (segundos == 60) {
        segundos = 0;
        minutos++
      }
      if (segundos < 10) {
        tempo.innerHTML = minutos+":0"+segundos;
      } else {tempo.innerHTML = minutos+":"+segundos;}
    }
            ,1000    )
                
            
  }
  
  function newGame() {}
