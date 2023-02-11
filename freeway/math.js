// sorteia um valor inteiro entre o intervalo fechado de min até max
function sortear(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Sorteio um dos valores, valor1 OU valor2
function sortearExtremos(valor1, valor2)
{
    // 10 e 20: sorteia inteiro entre 19 e 20, e retorna valor1 (= 10) se der 19. Se não, retorna valor2.
    // 15 e 100: sorteia inteiro entre 99 e 100 e retorna valor1 (= 15) se der 99. Se não, retorna valor1.

    let sorteado = sortear(valor2 - 1, valor2);

    if (sorteado === valor2 - 1)
    {
        sorteado = valor1;
    }
    return sorteado;


}