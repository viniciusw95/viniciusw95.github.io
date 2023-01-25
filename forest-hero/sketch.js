let trilha;
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

let x = 100;

let indiceBalao = 0;

// variáveis do Menu
let titulo;
let help;
let botaoUmJogador;
let pausaTexto;

let pausado = false;


// teclas de controle
const TECLA_ESPACO = 32;
const ESC = 27;
const TECLA_A = 65;

const COR_VERDE = "0,204,68,255";


function soltarBalao() {
    if (baloes.length <= 9) {
        let balao = new Balao(x, 0, indiceBalao);

        x += balao.width;
        
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
            baloesCaidos.push(balaoCaido);
            return balaoCaido.animacaoFogo();            
        })
        .then((balaoCaido) => {
            checarSePerdeu();
            return balaoCaido.receberBombeiros();
        })
        .then((balaoApagado) => {
            checarSeGanhou();
            resolve(balaoApagado);
        });
    });


}


function checarSePerdeu() {
    if (placarVermelho.pontos == 10) {
        let p = createElement('p', 'Você perdeu!');
        p.style('color', 'red');
        p.position(280, 200);
        noLoop();
    }
}

function checarSeGanhou() {
    if (placarAzul.pontos == 10) {
        let p = createElement('p', 'Você ganhou!');
        p.style('color', 'blue');
        p.position(280, 200);
        noLoop();
    }
}

function preload() {

    
    trilha = loadSound("trilha.mp3");
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
    if (keyCode === ESC) {
        pausado = true;
        mostrarPausa();
        noLoop();
    } else if (keyCode === ENTER) {
        pausado = false;
        continuarJogo();
    } else if (keyCode == SHIFT) {

    }
}

function mostrarMenu() {
    titulo = createElement('h1', 'Forest Hero');
    titulo.position(200, 150);
    titulo.style('color', 'blue');
   
    help = createElement('p', 'Salve o máximo possível de árvores. <br/> Você ganha se salvar 10 árvores ' +
    'e perde se deixar 10 árvores queimarem ao mesmo tempo. <br/>' +
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
    help.style('visibility', 'hidden');
    botaoUmJogador.style('visibility', 'hidden');

    loop();

    setInterval(() => {
        if (!pausado) {
            soltarBalao();
        }
    }, 3000);
}

// funçao de arredondar da w3schools
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}