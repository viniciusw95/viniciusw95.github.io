const widthPedestre = 50 * proporcao;
const heightPedestre = 44 * proporcao;

let xPedestre = widthFundo / 2;
let yPedestre = heightFundo - 25;

class Pedestre extends Ator
{
    constructor(foto, x, yInicial, width, height) 
    {
        super(foto, x, yInicial, width, height);
        this.velocidadeY = 4;
        this.velocidadeX = 4;
        this.velocidadeYPadrao = this.velocidadeY;
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
            somPonto.play();
            this.y = this.yInicial;
            this.velocidadeY = 0;
            setTimeout(() => {this.velocidadeY = this.velocidadeYPadrao;}, 300);
        }
    }

}