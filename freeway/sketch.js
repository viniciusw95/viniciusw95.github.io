let fundo;
let pedestre;

const proporcao = 0.80;

const widthFundo = 964 * proporcao;
const heightFundo = 642 * proporcao;

const PASTA_IMAGENS = 'imagens/';
const PARA_DIREITA = 1;
const PARA_ESQUERDA = -1;

// Carros
let carrosDireita; 
let carrosEsquerda;
let carros = [];
let yCarro = 100 * proporcao;
let afastamentoCarros = 90 * proporcao;

const widthCarros = 110 * proporcao;
const heightCarros = 60 * proporcao;

const widthPedestre = 50 * proporcao;
const heightPedestre = 44 * proporcao;

let imagensCarrosDireita = [];
let imagensCarrosEsquerda = [];

let fotosCarrosParaDireita;
let fotosCarrosParaEsquerda;
let fotosCarros;

const yCALCADA_SUPERIOR = 55 * proporcao;

// Sons
let trilha;

// Controle
let jogando = false;
let placar;
let pausado = false;

function preload() 
{
    // Carregando sons
    trilha = loadSound('sons/trilha.mp3');
    trilha.setVolume(0.15);
    fundo = loadImage('imagens/estrada.png');

    placar = new Placar(50, 12, 40, 20, color('blue'));

    let imagemPedestre = loadImage(PASTA_IMAGENS + 'pedestre.png');
    pedestre = new Pedestre(imagemPedestre, widthFundo / 2, heightFundo - 25, widthPedestre, heightPedestre);
    
    let fotosCarros = ['carro-amarelo', 'carro-preto', 'carro-verde'];

    for (let i = 0; i < fotosCarros.length; i++)
    {
        let carroDireita = loadImage(PASTA_IMAGENS + fotosCarros[i] + '-direita.png');
        let carroEsquerda = loadImage(PASTA_IMAGENS + fotosCarros[i] + '-esquerda.png');
        imagensCarrosDireita.push(carroDireita);
        imagensCarrosEsquerda.push(carroEsquerda);  
    }

    let vias = 6;
    
    carrosDireita = criarCarros(imagensCarrosDireita, vias / 2, PARA_DIREITA);
    carrosEsquerda = criarCarros(imagensCarrosEsquerda, vias / 2, PARA_ESQUERDA);

    let fluxoPrimeiraVia = sortear(0, PARA_DIREITA);
    if (fluxoPrimeiraVia === PARA_DIREITA) 
    {
        carros = carrosDireita.concat(carrosEsquerda);
    }
    else 
    {
        carros = carrosEsquerda.concat(carrosDireita);
    }

    // Distribuindo carros na pista
    for (let i = 0; i < carros.length; i++) 
    {
        carros[i].y = (i + 1) * afastamentoCarros;
        carros[i].x = sortear(0, widthFundo);
    }

    
}

// Cria carros indo para direita ou para esquerda
function criarCarros(fotosCarros, qtdCarros, sentido)
{
    //let totalFotos = fotosCarros.length;
    let carros = [];
    for (let i = 0; i < qtdCarros; i++) 
    {
        let carro = new Carro(sentido);

        carro.velocidadeX = sortear(6, 10) * sentido;
        carros.push(carro);
    }
    return carros;
}

function moverCarros() 
{
    for (let i = 0; i < carros.length; i++)
    {
        carros[i].movimentar();
        carros[i].mostrar();
    }
}
function setup()
{
    createCanvas(widthFundo, heightFundo);
    noLoop();

}
function draw() 
{
    imageMode(CORNER);
    background(fundo);

    placar.mostrar();

    pedestre.movimentar();
    pedestre.mostrar();

    // movendo carros
    for (let i = 0; i < carros.length; i++)
    {
        carros[i].movimentar();
        carros[i].mostrar();

        if (carros[i].tocando(pedestre))
        {
            placar.zerarPontos();
            pedestre.y = pedestre.yInicial;
        }
    }

}

function jogar()
{
    if (!jogando)
    {
        trilha.loop();
        jogando = true;
    }
    else if (pausado)
    // resume jogo e trilha
    {
        pausado = false;
        trilha.play();
    }
    loop();
}

function pausar() 
{
    pausado = true;
    noLoop();
    trilha.pause();
}