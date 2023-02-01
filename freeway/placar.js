class Placar {
    constructor(x, y, width, height, cor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cor = cor;
        this.raioAresta = 5;
        this.pontos = 0;
    }
    
    mostrar() {
        stroke(255);
        fill(this.cor);
        rect(this.x, this.y, this.width, this.height,
            this.raioAresta);
        noStroke();
        textAlign(CENTER);
        textSize(15);
        // cor dos pontos: amarela
        fill(251, 255, 68); 
        text(this.pontos, this.x + 20, this.y + 15);
    }

    adicionarPonto() {
        this.pontos++;
    }
    retirarPenalidade() {
        if (this.pontos > 0) {
            this.pontos--;
        }
    }
    zerarPontos()
    {
        this.pontos = 0;
    }
    tirarPonto()
    {
        if (this.pontos > 0)
        {
            this.pontos--;
        }
    }
}