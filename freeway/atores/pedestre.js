class Pedestre extends Ator
{
    constructor(foto, x, yInicial, width, height) 
    {
        super(foto, x, yInicial, width, height);
        this.velocidadeY = 6;
        this.velocidadeX = 6;
        this.yInicial = yInicial;
    }
 
    movimentar() {
        if (keyIsDown(UP_ARROW) && this.y - this.height / 2 - this.velocidadeY >= 0)
        {
            this.y -= this.velocidadeY;
        }
        if (keyIsDown(DOWN_ARROW) && this.y + this.height / 2 + this.velocidadeY <= height)
        {
            this.y += this.velocidadeY;
        }
        if (keyIsDown(LEFT_ARROW) && this.x - this.width / 2 - this.velocidadeX >= 0)
        {
            this.x -= this.velocidadeX;
        }
        if (keyIsDown(RIGHT_ARROW) && this.x + this.width / 2 + this.velocidadeX <= width)
        {
            this.x += this.velocidadeX;
        }
        if (this.y <= yCALCADA_SUPERIOR)
        {
            placar.adicionarPonto();
            this.y = this.yInicial;
            this.velocidadeY = 0;
            setTimeout(() => {this.velocidadeY = 6;}, 300);
        }
    }

}