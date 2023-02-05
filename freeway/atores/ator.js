// Considerando ator qualquer objeto que realiza uma ação no jogo
class Ator
{
    constructor(foto, x, y, width, height) 
    {
        this.foto = foto;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocidadeY;
        this.velocidadeX;
    }

    mostrar() 
    {
        imageMode(CENTER);    
        image(this.foto, this.x, this.y, this.width, this.height);
    }

    distanciaX(segundoAtor)
    {
        return abs(this.x - segundoAtor.x);
    }
    distanciaY(segundoAtor)
    {
        return abs(this.y - segundoAtor.y);
    }
}