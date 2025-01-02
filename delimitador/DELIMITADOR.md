# Delimitador

Aqui estão presentes as funções, uma descrição dos inputs e output, clique [aqui](DEDUCAO.md) para ver as demonstrações das formulas e como foram obtidas

O calcudo do limite inferior é a maximização variando em a, da integral da funcao de lucro economico estimado, indo de a até a + c, onde c é a quantidade média de ordens de compra do produto mais um desvio padrão.

$$
\max \int_a^{a+c} L_{\text{est}}(x) \, dx
$$


A função $L_{\text{est}}(x)$ representa o lucro estimado onde x é o estoque parado em reais.
$L_{\text{est}}(x) = prob(z(x))*cost + (1-prob(z(x)))*(eva(x))$


1. Função prob(x) (Probabilidade de Manutenção de Operações)

Descrição: Modela a probabilidade de manter as operações em uma função $\phi(z)$

2. Função $z(x)$

Converte x reais a em estoque parado para uma versão em unidades e que possa ser utilizada na função de distribuição acumulada da normal padrão $\phi(z)$.

$z(x) = \frac{x \cdot (1-p) - price \cdot p \cdot pc}{\sqrt{price \cdot p\cdot (1-p) \cdot (x+price \cdot pc )}}$

Entradas:
    
    p: probabilidade de perder um único produto de forma independente
    pc: quantidade mínima para se manter as operações
    price: preco do produto em reais


3. Função eva(x)

Representa o eva caso seja deixado x reias a mais do que o mínimo para manter as operações e sem alterar as mesmas.

$eva(x) = nopat - ki*p - ke*pl - wacc*x$

Entradas:

    nopat: o lucro das operações
    ki: custo de capital de terceiros
    ke: custo de capital próprio
    wacc: custo de capital médio e ponderado
    p: capital de terceiros
    pl: capital próprio

3. cost:

Descrição: Calcula o custo fixo da empresa, o que acontece caso a empresa pare as operações:
$cost = -ki*p -ke*pl$

Entradas:

    Custo fixo
    Custo variável (dependente de produção ou quantidade vendida)

4. Lucro Estimado:

Descrição: Calcula a esperança de lucro ponderando entre a chance de parar as operações e ter como retorno cost e manter as operações e retornar o eva.

$L_{\text{est}}(x) = prob(z(x)) \cdot eva(x) + (1-prob(z(x))) \cdot cost$

5. Monitoramento de Estoque Externo

Descrição: Calcula os limites minimos e maximos para se ter em estoque, encontrando $a$ tal que:
$L_{\text{est}}(a) = L_{\text{est}}(a+c)$


Entradas:

    Todos os dados necessários para as funções anteriores
    c: quantidade média de ordens de compra do produto mais um desvio padrão.

Saídas:

    a: limite inferior da quantidade de estoque
    a+c: limite superior da quantidade de estoque