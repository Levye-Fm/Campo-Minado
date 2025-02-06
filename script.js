// variavel cronometro tem que ser criada fora da função para evitar bug na hora de resetar o cronometro
var cronometro;
var espacos = [];

function calcularTempo() {

    let segundos = 0;
    let minutos = 0;
    //span que representa aonde o cronometro está
    var tempo = document.getElementById('tempo');

    //para o cronometro(para caso um cronometro já esteja rodando e o usuário comece outro jogo, reseta o cronometro)
    clearInterval(cronometro);

    cronometro = setInterval(function() {  
      segundos++;
      
      if (segundos == 60) {
        segundos = 0;
        minutos++
      }
      if (segundos < 10) { //deixa o cronometro mais bonito, evitando valores como 1:1(1 minuto e 1 segundo)
        //transformando-os em 1:01 por exemplo
        tempo.innerHTML = minutos+":0"+segundos;
      } else {tempo.innerHTML = minutos+":"+segundos;}
    }
            ,1000    )
                
            
  }

//código para que a criação do jogo apenas seja executada uma vez
let run = true;
function newGame() {
  
  if (run == true) {
    carregarEspacos();
  }
  run = false;
}

//codigo para criar os espacos para cavar.
function carregarEspacos() {
 
  var campo = document.getElementById('campo');



  for (let i = 0, k = 0; i<10; i++) {
    espacos[i] = [];
    for(let j = 0; j<12;j++) {
      espacos[i][j] = document.createElement('div');
      espacos[i][j].setAttribute('class', 'dado');
      campo.appendChild(espacos[i][j]);
    }
  }
}


// codigo em comentario para não repetir bomba: 
//var randomNum = Math.floor(Math.random()*10);
  //var bomba = [];
  //while (bomba.length < 10) {
    //randomNum = Math.floor(Math.random()*10);
    //if (!bomba.includes(randomNum)) {
      //bomba.push(randomNum);
    //}
  //}

//usar quando criar função de distribuir bombas 
