// Direções
const PARA_DIREITA = 1;
const PARA_ESQUERDA = -1;

// Dimensões e posicionamento
const proporcao = 0.80;

const widthFundo = 964 * proporcao;
const heightFundo = 642 * proporcao;

let yCarro = 100 * proporcao;
let afastamentoCarros = 90 * proporcao;

const widthCarros = 110 * proporcao;
const heightCarros = 60 * proporcao;

const widthPedestre = 50 * proporcao;
const heightPedestre = 44 * proporcao;

const yCALCADA_SUPERIOR = 55 * proporcao;

// Controle
let jogando = false;
let pausado = false;

// Atores
let ator;
let carros = [];
let placar;


function preload() 
{
    carregarSons();

    try {
        carregarImagens();
    } catch (error) {
        document.write(error);
    }

    placar = new Placar(50, 12, 40, 20, color('blue'));

}

function setup()
{
    // Criado carros, metade para cada via.
    let vias = 6;
    let carrosDireita = criarCarros(imagensCarrosDireita, vias / 2, PARA_DIREITA);
    let carrosEsquerda = criarCarros(imagensCarrosEsquerda, vias / 2, PARA_ESQUERDA);
    carros = distribuirCarrosNaPista(carrosDireita, carrosEsquerda);

    // Criando os atores restantes.
    ator = new Pedestre(imagemDoAtor, widthFundo / 2, heightFundo - 25, widthPedestre, heightPedestre);
    placar = new Placar(50, 12, 40, 20, color('blue'));

    createCanvas(widthFundo, heightFundo);
    definirVolumesDosSons();
    
    // Vai esperar apertar o botão de jogar.
    noLoop();

}

function jogar()
{
    if (!jogando)
    {
        somTrilha.loop();
        jogando = true;
    }
    else if (pausado)
    // resume jogo e trilha
    {
        pausado = false;
        somTrilha.play();
    }
    loop();
}

function pausar() 
{
    pausado = true;
    noLoop();
    somTrilha.pause();
}

function draw() 
{
    imageMode(CORNER);
    background(imagemDaEstrada);

    placar.mostrar();

    ator.movimentar();
    ator.mostrar();

    // movendo carros
    for (let i = 0; i < carros.length; i++)
    {
        carros[i].movimentar();
        carros[i].mostrar();

        if (carros[i].tocando(ator))
        {
            placar.tirarPonto();
            somColidiu.play();
            ator.y = ator.yInicial;
        }
    }

}