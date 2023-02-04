const PASTA_IMAGENS   = "imagens/";
const CAMINHO_ESTRADA = PASTA_IMAGENS + "estrada.png";
const CAMINHO_ATOR = PASTA_IMAGENS + "pedestre.png";
const SUFIXO_DIREITA  = "-direita.png";
const SUFIXO_ESQUERDA = "-esquerda.png";


let imagemDaEstrada;
let imagemDoAtor;

// TODO: transformar em 2 funções: 1 que lê N carros da pasta PASTA_IMAGENS
// e coloca na lista nomesDosCarros.
// E outra que vai chamando loadImage() para cada item de nomesDosCarros. 
let nomesDosCarros = ["carro-amarelo-direita.png",
"carro-preto-direita.png",
"carro-verde-direita.png",
"carro-amarelo-esquerda.png",
"carro-preto-esquerda.png",
"carro-verde-esquerda.png"] 

let imagensCarrosDireita = [];
let imagensCarrosEsquerda = [];


function carregarImagens()
{      
    imagemDaEstrada = loadImage(CAMINHO_ESTRADA);
    imagemDoAtor = loadImage(CAMINHO_ATOR);
    // Carregando imagens dos carros
    for (let i = 0; i < nomesDosCarros.length; i++)
    {
        let imagemDoCarro = loadImage(PASTA_IMAGENS + nomesDosCarros[i]); 
        if (nomesDosCarros[i].endsWith(SUFIXO_DIREITA))
        {
            imagensCarrosDireita.push(imagemDoCarro);   
        }
        else if (nomesDosCarros[i].endsWith(SUFIXO_ESQUERDA))
        {
            imagensCarrosEsquerda.push(imagemDoCarro);
        }
        else
        {
            throw "Erro: Nome da imagem (" + nomesDosCarros[i] + ") é inválida. "
            + "Use um dos sufixos: {" + SUFIXO_ESQUERDA + " | " +  SUFIXO_DIREITA + "}";
        }
    }
}

//---------------------------------------------------------------------

function sortearImagem(listaDeImagens)
{
    let totalFotos = listaDeImagens.length;
    let nrFotoSorteada = sortear(0, totalFotos - 1);
    let fotoSorteada = listaDeImagens[nrFotoSorteada];
    return fotoSorteada;
}