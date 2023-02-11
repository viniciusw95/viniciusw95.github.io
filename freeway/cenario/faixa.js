// Arquivo para faixa dos carros
class Faixa
{
    constructor(y)
    {
        this.carros = [];
        this.y = y;
    }

    adicionarCarro(novoCarro)
    {   
        for (let i = 0; i < this.carros.length; i++)
        {
            if (carros[i].tocando(novoCarro))
            {
                console.log('Carro ' + i + ' não foi adicionado pois colidiu está colidindo com outro.');
                return;
            }
        }

        // não sobrepôs, então pode adicionar o novoCarro na lista.
        this.carros.push(novoCarro);
    }
}