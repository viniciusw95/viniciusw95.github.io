class Objeto {
    constructor(x, y) {
        this.width = 72;
        this.height = 72;
        this.x = x;
        this.y = y;
        this.velocidade = 6;
        this.contImagem = 0;
        this.pegandoFogo = 0;
        this.imagens = [];

    }

    mostrar() {
        imageMode(CENTER);
        image(this.imagem, this.x, this.y, this.width, this.height);
    }

    distancia(segundoObjeto) {
        let b = abs(this.x - segundoObjeto.x);
        let c = abs(this.y - segundoObjeto.y);
        let a = sqrt(b ** 2 + c ** 2);
        
        //let dist = abs(this.x - segundoObjeto.x);
        return a;

    }
}