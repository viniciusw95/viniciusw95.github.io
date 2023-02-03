class Helicoptero extends Objeto {
    constructor(x, y) {
        super(x, y);

        this.imagens.push(loadImage("helicoptero-direita.png"));
        this.imagens.push(loadImage("helicoptero-direita-splash.png"));
        this.imagens.push(loadImage("helicoptero-esquerda.png"));
        this.imagens.push(loadImage("helicoptero-esquerda-splash.png"));

        this.imagemAtual = 0;

        this.imagem = this.imagens[this.imagemAtual];

        this.width = 100;
        this.height = 56;
    
    }

    checarMovimento() {
        if (keyIsDown(UP_ARROW)) {
            this.y -= 6;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.y += 6;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.x += 6;
            this.imagemAtual = 0;
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= 6;
            this.imagemAtual = 2;
        }

        this.checarTeclaEspaco();

        this.imagem = this.imagens[this.imagemAtual];
    }
    checarTeclaEspaco() {
        if (keyIsDown(TECLA_A)) {
            if (this.imagemAtual === 0) {
                this.imagemAtual = 1;
            } else if (this.imagemAtual === 2) {
                this.imagemAtual = 3;

            }
        } else {
            if (this.imagemAtual === 1) {
                this.imagemAtual = 0;
            } else if (this.imagemAtual === 3) {
                this.imagemAtual = 2;

            }
        }
    }

    


    apagarFogo(balao) {
        if (this.distancia(balao) <= 50 && keyIsDown(SHIFT)) {
            balao.pararFogo();
            return true;
        }
        return false;
    }

}
