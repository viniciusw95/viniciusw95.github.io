class Carro extends Ator
{
    constructor(sentido) 
    {
        super(null, 0, 0, widthCarros, heightCarros);
        this.sentido = sentido;
        this.sortearImagem();
    }   

    movimentar()
    {
        this.x += this.velocidadeX;
        // checando se carro passou atravessou totalmente pela borda esquerda do fundo
        if (this.x + this.width / 2 < 0)
        {
            this.x = width + this.width / 2;
            this.sortearImagem();
            this.sortearVelocidade();
        } 
        // checando se carro passou atravessou totalmente pela borda direita do fundo
        else if (this.x - this.width / 2 > width)
        {
            this.x = -this.width / 2;
            this.sortearImagem();
            this.sortearVelocidade();
        }
    }

    sortearImagem()
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
        let totalFotos = arrImagens.length;
        let fotoSorteada = sortear(0, totalFotos - 1);
        this.foto = arrImagens[fotoSorteada];

    }

    sortearVelocidade()
    {
        this.velocidadeX = sortear(5, 8) * this.sentido;
    }

    tocando(pedestre)
    {
        return this.distanciaX(pedestre) <= this.width / 2 + pedestre.width / 2 && 
        this.distanciaY(pedestre) <= this.height / 2 + pedestre.height / 2;
    }


}


