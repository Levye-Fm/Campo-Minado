var cronometro;
var espacos = [];
var objetoEspaco = [];
var bombasRestantes = 10;
var jogoAtivo = false;
var dificuldade = 'facil';

function calcularTempo() {
    let segundos = 0;
    let minutos = 0;
    var tempo = document.getElementById('tempo');

    clearInterval(cronometro);

    cronometro = setInterval(function() {
        segundos++;
        if (segundos == 60) {
            segundos = 0;
            minutos++;
        }
        tempo.innerHTML = minutos + ":" + (segundos < 10 ? "0" + segundos : segundos);
    }, 1000);
}

function newGame() {
    jogoAtivo = true;
    document.getElementById('bandeiras').textContent = bombasRestantes;
    document.getElementById('campo').innerHTML = '';
    espacos = [];
    objetoEspaco = [];
    carregarEspacos();
    colocarBombas();
    verifybomb();
    calcularTempo();
}

function carregarEspacos() {
    var campo = document.getElementById('campo');

    for (let i = 0; i < 10; i++) {
        espacos[i] = [];
        objetoEspaco[i] = [];
        for (let j = 0; j < 12; j++) {
            espacos[i][j] = document.createElement('div');
            espacos[i][j].setAttribute('class', 'dado');
            objetoEspaco[i][j] = new dadosEspaco(0, 0);
            campo.appendChild(espacos[i][j]);

            espacos[i][j].addEventListener('click', () => revelarCelula(i, j));
            espacos[i][j].addEventListener('contextmenu', (e) => {
                e.preventDefault();
                marcarBandeira(i, j);
            });
        }
    }
}

function colocarBombas() {
    let bombasColocadas = 0;
    while (bombasColocadas < bombasRestantes) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 12);

        if (!objetoEspaco[x][y].bomba) {
            objetoEspaco[x][y].bomba = 1;
            bombasColocadas++;
        }
    }
}

function verifybomb() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 12; j++) {
            if (objetoEspaco[i][j].bomba) {
                for (let k = i - 1; k < i + 2; k++) {
                    for (let l = j - 1; l < j + 2; l++) {
                        if (k >= 0 && k < 10 && l >= 0 && l < 12 && !objetoEspaco[k][l].bomba) {
                            objetoEspaco[k][l].numero++;
                        }
                    }
                }
            }
        }
    }
}

function revelarCelula(i, j) {
    if (!jogoAtivo) return;

    const celula = espacos[i][j];
    const espaco = objetoEspaco[i][j];

    if (espaco.bomba) {
        // Revela todas as bombas
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 12; y++) {
                if (objetoEspaco[x][y].bomba) {
                    espacos[x][y].textContent = 'BOMBA'; // Texto ou emoji
                    espacos[x][y].style.backgroundColor = '#ff0000';
                }
            }
        }

        jogoAtivo = false;

        // Atraso para exibir as bombas antes do alerta
        setTimeout(() => {
            alert('Você perdeu!');
            document.getElementById('derrota').textContent = parseInt(document.getElementById('derrota').textContent) + 1;
            setDificuldade(dificuldade); // Reinicia após o OK do alerta
        }, 100); // Pequeno atraso para garantir renderização
    } else {
        celula.textContent = espaco.numero || '';
        celula.style.backgroundColor = '#4a6a8a';
    }
}

function marcarBandeira(i, j) {

    const celula = espacos[i][j];

    if (celula.textContent === '🚩') {
        // Se já tem uma bandeira, remove
        celula.textContent = '';
        bombasRestantes++;
    } else if (!celula.textContent) {
        // Se não tem nada, coloca a bandeira
        celula.textContent = '🚩';
        bombasRestantes--;
    }

    document.getElementById('bandeiras').textContent = bombasRestantes;
}

function setDificuldade(nivel) {
    dificuldade = nivel;
    if (nivel === 'facil') {
        bombasRestantes = 10;
    } else if (nivel === 'medio') {
        bombasRestantes = 20;
    } else if (nivel === 'dificil') {
        bombasRestantes = 30;
    }

    newGame();
}

class dadosEspaco {
    constructor(bomba, numero) {
        this.bomba = bomba;
        this.numero = numero;
    }
}
