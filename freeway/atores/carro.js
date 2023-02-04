const widthCarros = 110 * proporcao;
const heightCarros = 60 * proporcao;
let yCarro = 100 * proporcao;
let afastamentoCarros = 90 * proporcao;

// Direção do carro
const PARA_DIREITA = 1;
const PARA_ESQUERDA = -1;

class Carro extends Ator
{
    constructor(imagem, sentido) 
    {
        super(null, 0, 0, widthCarros, heightCarros);
        
        this.sentido = sentido;
        this.foto = imagem;

        this.velocidadeXMinima = 6;
        this.velocidadeXMaxima = 10;

        this.sortearVelocidade();
    }   

    movimentar()
    {
        this.x += this.velocidadeX;
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

    tocando(pedestre)
    {
        return this.distanciaX(pedestre) <= this.width / 2 + pedestre.width / 2 && 
        this.distanciaY(pedestre) <= this.height / 2 + pedestre.height / 2;
    }


}

// Cria carros indo para direita ou para esquerda
function criarCarros(imagemCarros, qtdCarros, sentido)
{
    //let totalFotos = fotosCarros.length;
    let carros = [];
    for (let i = 0; i < qtdCarros; i++) 
    {
        let imagemSorteada = sortearImagem(imagemCarros);
        let carro = new Carro(imagemSorteada, sentido);

        //carro.velocidadeX = sortear(6, 10) * sentido;
        carros.push(carro);
    }
    return carros;
}

function distribuirCarrosNaPista(carrosDireita, carrosEsquerda)
{
    // Distribuindo carros na pista
    let carros;
    let fluxoPrimeiraVia = sortear(0, PARA_DIREITA);
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
