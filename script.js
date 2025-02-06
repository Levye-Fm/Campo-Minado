// variavel cronometro tem que ser criada fora da função para evitar bug na hora de resetar o cronometro
var cronometro;

function calcularTempo() {

    var segundos = 0;
    var minutos = 0;
    //span que representa aonde o cronometro está
    var tempo = document.getElementById('tempo');
    //para o cronometro(para caso um cronometro já esteja rodando e o usuário comece outro jogo, reseta o cronometro)
    clearInterval(cronometro);

    //a cada 1000 milissegundos, aumenta um segundo e atualiza o span do cronometro
    cronometro = setInterval(function() {  
      segundos++;
      
      if (segundos == 60) { // a cada 60 segundos, aumenta um minuto e volta os segundos para o valor 0
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
  
  function newGame() {
    const randomNum = Math.floor(Math.random()*10);
    var a = document.getElementById('a');
    var campo = document.getElementById('campo');
    a.innerHTML = randomNum;

    var espacos = [];
    
    for (let i = 0; i<56; i++) {
        espacos[i] = document.createElement('div');
        espacos[i].setAttribute('class', 'dado')
        campo.appendChild(espacos[i]);
    }
  }
