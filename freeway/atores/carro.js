const widthCarros = 110 * proporcao;
const heightCarros = 60 * proporcao;
let yInicial = 90 * proporcao;
let afastamentoCarros = 90 * proporcao;

// Direção do carro
const PARA_DIREITA = 1;
const PARA_ESQUERDA = -1;

class Carro extends Ator
{
    constructor(imagem, sentido, velocidadeXMinima, velocidadeXMaxima) 
    {
        super(null, 0, 0, widthCarros, heightCarros);
        
        this.sentido = sentido;
        this.foto = imagem;

        this.velocidadeXMinima = velocidadeXMinima;
        this.velocidadeXMaxima = velocidadeXMaxima;

        this.sortearVelocidade();
    }   

    movimentar()
    {
        this.x += this.velocidadeX;
    }


    voltaPosicaoInicial()
    {
        // checando se carro passou atravessou totalmente pela borda esquerda do fundo
        if (this.x + this.width / 2 < 0)
        {
            this.x = width + this.width / 2;
            this.mudarImagem();
            this.sortearVelocidade();
        } 
        // checando se carro passou atravessou totalmente pela borda direita do fundo
        else if (this.x - this.width / 2 > width)
        {
            this.x = -this.width / 2;
            this.mudarImagem();
            this.sortearVelocidade();
        }
    }
    
    mudarImagem()
    {
        let arrImagens;
        if (this.sentido == PARA_DIREITA)
        {
            arrImagens = imagensCarrosDireita;
        }
        else
        {
            arrImagens = imagensCarrosEsquerda;
        }

        this.foto = sortearImagem(arrImagens);
    }
    

    sortearVelocidade()
    {
        this.velocidadeX = sortear(this.velocidadeXMinima, this.velocidadeXMaxima) * this.sentido;
    }

}

// Cria carros indo para direita ou para esquerda
function criarCarros(imagemCarros, qtdCarros, sentido)
{
    let carros = [];
    for (let i = 0; i < qtdCarros; i++) 
    {
        let imagemSorteada = sortearImagem(imagemCarros);
        let velocidadeXMinima = 3 * i + 4;
        let velocidadeXMaxima = velocidadeXMinima + 2;

        let carro = new Carro(imagemSorteada, sentido, velocidadeXMinima, velocidadeXMaxima);

        carros.push(carro);
    }
    return carros;
}

function distribuirCarrosNaPista(carrosDireita, carrosEsquerda)
{
    // Distribuindo carros na pista
    let carros;
    let fluxoPrimeiraVia = sortearExtremos(PARA_ESQUERDA, PARA_DIREITA);
    if (fluxoPrimeiraVia === PARA_DIREITA) 
    {
        carros = carrosDireita.concat(carrosEsquerda);
    }
    else 
    {
        carros = carrosEsquerda.concat(carrosDireita);
    }
    
    for (let i = 0; i < carros.length; i++) 
    {
        carros[i].y = (i + 1) * afastamentoCarros;
        carros[i].x = sortear(0, widthFundo);
    }
    return carros;
}
