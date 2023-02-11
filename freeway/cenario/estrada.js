// Identificação das vias (conjunto de faixas onde passam carros)
const VIA_SUPERIOR = 0;
const VIA_INFERIOR = 1;

class Estrada 
{
    constructor()
    {
        this.faixasSuperiores = [];
        this.faixasInferiores = [];
        this.vias = [this.faixasSuperiores, this.viaInferiores];
    }

    // define a localização de uma faixa, seja na VIA_SUPERIOR (0) OU na VIA_INFERIOR (1)
    adicionarFaixa(yFaixa, identificacaoDaVia)
    {
        let faixa = new Faixa(yFaixa);
        this.vias[identificacaoDaVia].push(faixa);    
    }

    adicionarCarro(carro, identificacaoDaVia, numeroDaFaixa) 
    {
        this.vias[identificacaoDaVia][numeroDaFaixa].push(carro);
    }
}