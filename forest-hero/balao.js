
class Balao extends Objeto {
    constructor(x, y, indice) {
        super(x, y);

        this.balaoIntacto = loadImage("balao.png");
        this.imagem = this.balaoIntacto;

        this.verificadorColisao;
        this.incendio;
        this.heliChegou;
        this.indice = indice;
        this.apagado = false;
        this.colidiu;
        
        this.width = 50;
        this.height = 50;
    }

    mover() {
        this.y += this.velocidade;
    }

    checarColisaoArvores() {
        fundo.loadPixels();

        let colidiu = new Promise((resolve, reject) => {
            let intervalo = setInterval(() => {
                let cor = fundo.get(this.x, this.y);  
                if (cor.toString() === COR_VERDE) {
                    clearInterval(intervalo);
                    this.velocidade = 0;
                    placarVermelho.adicionarPonto();

                   // this.colidiu = "A";
                    resolve(this);                    
                } else if (this.distancia(helicoptero) <= 50) {
                    //this.colidiu = "H";
                    clearInterval(intervalo);
                    this.velocidade = 0;
                    //this.apagado = true;
                    placarAzul.adicionarPonto();
                    reject(this);
                }
                
            }, 1);
        });
        return colidiu;
    }

    animacaoFogo() {
        let animacao = new Promise((resolve) => {
            let k = setInterval(() => {
                this.imagem = fogoImagens[this.contImagem];
                this.contImagem++;
                if (this.contImagem == fogoImagens.length) {
                    this.contImagem = 0;
                }                
            }, 1);
            this.incendio = k;
            resolve(this);
        });
        return animacao;
    }

    receberBombeiros() {
        let espera = new Promise((resolve) => {
            let distanciaAceitavel = this.width / 4 + helicoptero.width / 4;
            let m = setInterval(() => {
                if (this.distancia(helicoptero) <= distanciaAceitavel && keyIsDown(TECLA_A)) {
                    clearInterval(this.incendio);
                    clearInterval(m);
                    resolve(this);

                    agua.play();
                    this.apagado = true;


                    this.imagem = this.balaoIntacto;
                    this.y = 60;
                    this.velocidade = 0;

                    placarVermelho.retirarPenalidade();
                    placarAzul.adicionarPonto();

                }             
            }, 100);
        });
        return espera;
    }    

    checarColisaoAgua() {
        if (this.x > 300) {
            alert("apagou");
        }
    }

    pararFogo() {
        alert("heli chegou " + this.heliChegou);
        clearInterval(this.heliChegou);
        this.imagem = this.balaoIntacto;
        //this.y = -this.height;
        //this.velocidade = 6;
    }

}

function soltarBalao() {
    if (baloes.length <= pontosPerder - 1) {
        let balao = new Balao(0, 0, indiceBalao);

        balao.x = getRndInteger(balao.width, width - balao.width);
        
        baloes.push(balao);        

        soltarBalaoExistente(balao);

        indiceBalao += 1;

        return balao;
    }
}

function soltarBalaoExistente(balaoY) {
    balaoY.x = getRndInteger(balaoY.width, width - balaoY.width);    
    return new Promise((resolve) => {
        balaoY.checarColisaoArvores()
        .then((balaoCaido) => {
                checarSePerdeu();
                return balaoCaido.animacaoFogo();            
            }
        )
        .then((balaoIncendiando) => 
            {return balaoIncendiando.receberBombeiros();}
        )
        .catch((balaoCapturado) => {balaoCapturado.apagado = true;})
        .finally(() => {checarSeGanhou();});
    });
}