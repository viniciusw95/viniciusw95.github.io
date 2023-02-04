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

}

function setup()
{
    // Criado carros, metade para cada lado.
    let vias = 6;
    let carrosDireita = criarCarros(imagensCarrosDireita, vias / 2, PARA_DIREITA);
    let carrosEsquerda = criarCarros(imagensCarrosEsquerda, vias / 2, PARA_ESQUERDA);
    carros = distribuirCarrosNaPista(carrosDireita, carrosEsquerda);

    // Criando os atores restantes.
    ator = new Pedestre(imagemDoAtor, xPedestre, yPedestre, widthPedestre, heightPedestre);
    placar = new Placar(xPlacar, yPlacar, widthPlacar, heightPlacar, color('blue'));

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