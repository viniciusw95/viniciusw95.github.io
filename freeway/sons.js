// Sons
let somTrilha;
let somPonto;
let somColidiu;

function carregarSons()
{
    somTrilha = loadSound('sons/trilha.mp3');
    somPonto = loadSound('sons/pontos.wav');
    somColidiu = loadSound('sons/colidiu.mp3');
}

function definirVolumesDosSons()
{
    somTrilha.setVolume(0.25);
    somPonto.setVolume(0.20);
}