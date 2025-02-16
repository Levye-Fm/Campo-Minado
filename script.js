var cronometro;
var espacos = [];
var objetoEspaco = [];
var bombasRestantes = 10;
var jogoAtivo = false;
var dificuldade = 'facil';
var primeiroClique = true;

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
    primeiroClique = true;
    jogoAtivo = true;
    document.getElementById('bandeiras').textContent = bombasRestantes;
    document.getElementById('campo').innerHTML = '';
    espacos = [];
    objetoEspaco = [];
    carregarEspacos();
    colocarBombas();
    verificarBombas();
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

function verificarBombas() {
    reNumeros();

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

function reNumeros() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 12; j++) {
            objetoEspaco[i][j].numero = 0;
        }
    }
}

function moverBomba(i, j) {
    //Tira a bomba do quadrante
    objetoEspaco[i][j].bomba = 0;

    //Gera outra bomba num quadrante aleatório
    let bombaRecolocada = false;
    while (!bombaRecolocada) {
        //Quadrante aleatório
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 12);

        //Bomba recolocada apenas se longe o suficiente
        const distanciaX = Math.abs(x - i);
        const distanciaY = Math.abs(y - j);
        if (!objetoEspaco[x][y].bomba && distanciaX > 1 && distanciaY > 1) {
            objetoEspaco[x][y].bomba = 1;
            bombaRecolocada = true;
        }
    }

    verificarBombas();
}

function revelarCelula(i, j) {
    let celula = espacos[i][j];
    let espaco = objetoEspaco[i][j];

    if (primeiroClique) {
        primeiroClique = false;

        //Se o primeiro clique for em uma bomba, move pra outro quadrante
        if(espaco.bomba) {
            moverBomba(i, j);
        }

        if(comBombasAdj) {
            moverBombasAdj(i, j);
        }

        verificarBombas();

        //Revela área por volta do primeiro clique
        revelarArea(i, j);
    }

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

function comBombasAdj(i, j) {
    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
            if (x >= 0 && x < 10 && y >= 0 && y < 12 && objetoEspaco[x][y].bomba) {
                return true;
            }
        }
    }
    return false;
}

function moverBombasAdj(i, j) {
    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
            if (x >= 0 && x < 10 && y >= 0 && y < 12 && objetoEspaco[x][y].bomba) {
                moverBomba(x, y);
            }
        }
    }
    verificarBombas();
}

function revelarArea(i, j) {
    let celula = espacos[i][j];
    let espaco = objetoEspaco[i][j];

    //Se revelada, com bandeira, ou com bomba, quadrante impossibilitado de ser revelado
    if (celula.style.backgroundColor === '#4a6a8a' || celula.textContent == '🚩' || espaco.bomba) {
        return;
    }

    celula.textContent = espaco.numero || '';
    celula.style.backgroundColor = '#4a6a8a';

    if (espaco.numero == 0) {
        for (let x = i - 1; x <= i + 1; x++) {
            for (let y = j - 1; y <= j + 1; y++) {
                if (x >= 0 && x < 10 && y >= 0 && y < 12) {
                    revelarArea(x, y);
                }
            }
        }
    }
}


function marcarBandeira(i, j) {

    const celula = espacos[i][j];

    if(document.getElementById('bandeiras').textContent == "0") {
        return;
    }
    if(celula.style.backgroundColor == '#4a6a8a') {
        return;
    }
    if (celula.textContent == '🚩') {
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
    if (nivel == 'facil') {
        bombasRestantes = 10;
    } else if (nivel == 'medio') {
        bombasRestantes = 30;
    } else if (nivel == 'dificil') {
        bombasRestantes = 40;
    }

    newGame();
}

class dadosEspaco {
    constructor(bomba, numero) {
        this.bomba = bomba;
        this.numero = numero;
    }
}
