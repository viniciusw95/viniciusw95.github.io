// sons

let trilha;
let agua;

let balaoImagem;
let fogoImagens;
let baloes = [];
let fundo;
let baloesFogo;

let helicoptero;

let placarAzul;
let placarVermelho;

let baloesCaidos = [];
let baloesApagados = [];
let baloesSoltos = [];

//let x = 100;

// cronometro;
let temporizador = 800;
let contador = 700;
let pulo = 100;

let indiceBalao = 0;

// variáveis do Menu
let titulo;
let help;
let botaoUmJogador;
let pausaTexto;

// vitória ou derrota
let pausado = false;
let venceu = false;

let pontosVencer = 25;
let pontosPerder = 20;


// teclas de controle
const TECLA_ESPACO = 32;
const ESC = 27;
const TECLA_A = 65;

const COR_VERDE = "0,204,68,255";


function soltarBalao() {
    if (baloes.length <= pontosPerder - 1) {
        let balao = new Balao(0, 0, indiceBalao);

        balao.x = getRndInteger(balao.width, width - balao.width);

        //x += balao.width;
        
        baloes.push(balao);        

        soltarBalaoExistente(balao);

        indiceBalao += 1;

        return balao;
    }
}

function soltarBalaoExistente(balaoY) {
    balaoY.x = getRndInteger(balaoY.width, width - balaoY.width);    
    return new Promise((resolve) => {
        balaoY.checarColisaoArvores()
        .then((balaoCaido) => {
                checarSePerdeu();
                return balaoCaido.animacaoFogo();            
            }
        )
        .then((balaoIncendiando) => 
            {return balaoIncendiando.receberBombeiros();}
        )
        .catch((balaoCapturado) => {balaoCapturado.apagado = true;})
        .finally(() => {checarSeGanhou();});
    });
}

function checarSePerdeu() {
    if (placarVermelho.pontos == pontosPerder) {
        let p = createElement('p', 'Você perdeu!');
        p.style('color', 'red');
        p.position(280, 200);
        noLoop();    
        trilha.stop();
    }
}

function checarSeGanhou() {
    if (placarAzul.pontos == pontosVencer) {
        let p = createElement('p', 'Você ganhou!');
        p.style('color', 'blue');
        p.position(280, 200);
        noLoop();
        venceu = true;
        trilha.stop();
    }
}

function preload() {

    
    trilha = loadSound("Audiorezout - Faith in Humanity.mp3");
    agua = loadSound('water.mp3');

    fundo = loadImage("fundo.png");
    fogoImagens = [];
    fogoImagens.push(loadImage("fire.png"));
    fogoImagens.push(loadImage("fire2.png"));
    fogoImagens.push(loadImage("fire3.png"));
    fogoImagens.push(loadImage("fire4.png"));
    
    helicoptero = new Helicoptero(150, 50);
    
   
}

function setup() {
    createCanvas(600, 431);

    placarAzul = new Placar(0, 0, 40, 20, color('blue'));
    placarVermelho = new Placar(width - 40, 0, 40, 20, color('red'));

    trilha.setVolume(0.5);
    agua.setVolume(0.4);

    noLoop();
    mostrarMenu();

}

function draw() {
    imageMode(CORNER);
    background(fundo);

    helicoptero.checarMovimento();
    helicoptero.mostrar();

    for (let i = baloes.length - 1; i >= 0; i--) {
        if (baloes[i].apagado) {
            baloes.splice(i, 1);
        } else {
            baloes[i].mover();
            baloes[i].mostrar();
        }
    }

    placarAzul.mostrar();
    placarVermelho.mostrar();

}

function keyPressed() {
    if (keyCode === ESC && !pausado && !venceu) {
        pausado = true;
        trilha.pause();
        mostrarPausa();
        noLoop();
    } else if (keyCode === ENTER && pausado) {
        pausado = false;
        trilha.play();
        continuarJogo();
    }
}

function mostrarMenu() {
    titulo = createElement('h1', 'Forest Hero');
    titulo.position(200, 150);
    titulo.style('color', 'blue');
   
    help = createElement('p', 'Salve o máximo possível de árvores. <br/> Você ganha se salvar +'
    + pontosVencer + ' árvores ' +
    'e perde se deixar ' + pontosPerder + ' árvores queimarem ao mesmo tempo. <br/>' +
    'Aperte "A" para soltar água do helicóptero do bombeiro');

    botaoUmJogador = createElement('button', '1 jogador');
    botaoUmJogador.position(240, 220);
    botaoUmJogador.mouseClicked(iniciarJogo);

}

function mostrarPausa() {
    pausaTexto = createElement('p', 'Enter para continuar. . .');
    pausaTexto.position(200, 240);
    pausaTexto.style('visibility', 'visible');
}

function continuarJogo() {
    pausaTexto.style('visibility', 'hidden');
    loop();
}

function iniciarJogo() {
    titulo.style('visibility', 'hidden');
    botaoUmJogador.style('visibility', 'hidden');

    loop();

    trilha.loop();

    setInterval(() => {
        if (!pausado && contador >= temporizador) {
            soltarBalao();
            contador = 0;
            pulo *= 2;
        }
        contador += pulo;
    }, temporizador);
}

// funçao de arredondar da w3schools
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}