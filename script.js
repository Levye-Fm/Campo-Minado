function calcularTempo() {
  var segundos = 00;
  var minutos = 00;
  var tempo = document.getElementById('tempo');
  
  setInterval(function() {  
  if (segundos == 60) {
    segundos = 00;
    minutos++;
  }
    segundos++;
    tempo.innerhtml = minutos+":"+segundos;
  }
              )
}

function newgame() {}
