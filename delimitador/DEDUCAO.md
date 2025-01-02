# Dedução

## 1. Função prob

Se tem-se n unidades de um produto e a probabilidade de perda de cada unidade de produto é p, então a probabilidade de que exatamente $k$ unidades sejam perdidas é dada por:
$P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}$
Para que a quantidade final seja maior que pc (Ponto Crítico), em outra palavras:<br>  
$P(X \leq n - pc) \approx P\left(Z \leq z(a)\right) = \Phi\left(z(a)\right)$
onde $Z \sim N(0, 1)$ e $z(a)$ converte a reais em unidades de produto, e também normaliza a distribuição.

A Função para aproximar a integral foi a $\phi_6(z)$, presente no seguinte [artigo](https://arxiv.org/pdf/2206.12601.pdf#page=4) e contem a aproximação de Boiroju and Rao (2014).

$
\phi(z) = \int_{-\infty}^{z} e^{-x^2} \, dx
\approx \frac{1}{1+e^{-1.5976 \cdot z - 0.07056 \cdot z^3}}
$

---

## 2. Função z
Essa função toma como parametro um x que representa a quantidade de dinheiro parado e converte para a quantidade total de produtos, com algumas manipulações algébricas.
Recebe um x em reais, divide pelo preço de uma unidade, o resultado representa a quantidade de produtos parados então é somado pc, o resultado final é a quantidade total de produtos normalizada.



tomando um $x$, onde 
$x = (a-pc) \cdot price$
$a = \frac{x}{price}+pc$

Essa é a correlação entre $x$ reais parados e a quantidade total desse produto, e normalizando para a distribuição binomial:

$P(X \leq a-pc) = P(\frac {a- pc - \mu}{\sigma})$
onde: 
- $\mu = a\cdot p$
- $\sigma = a\cdot p \cdot (1-p)$
- $a = $ quantidade total de produtos

Reescrevendo a em termos de x:

$\frac{(x/price+pc) - pc -(pc+x/price)\cdot p}{\sqrt{(pc+x/price)\cdot p \cdot (1-p)}}$

$=\frac{x/price-(pc+x/price)\cdot p}{\sqrt{(pc+x/price)\cdot p \cdot (1-p)}}$

$=\frac{x-(pc\cdot price +x)\cdot p}{price \cdot \sqrt{(pc+x/price)\cdot p \cdot (1-p)}}$

$=\frac{(1-p)\cdot x- pc\cdot price \cdot p}{price \cdot \sqrt{(pc+x/price)\cdot p \cdot (1-p)}}$

$=\frac{(1-p)\cdot x- pc\cdot price \cdot p}{price \cdot \sqrt{\frac{(pc\cdot price+x)\cdot p \cdot (1-p)}{price}}}$

$=\frac{(1-p)\cdot x- pc\cdot price \cdot p}{\sqrt{price \cdot( pc\cdot price+x)\cdot p \cdot (1-p)}}$

$\therefore z(x) = \frac{(1-p)\cdot x- pc\cdot price \cdot p}{\sqrt{price \cdot( pc\cdot price+x)\cdot p \cdot (1-p)}}$

---

## 3. Função eva
Assumindo que as operação seja continuada, é estimado o lucro econômico quando se deixa $x$ reais parados.

No caso de $x$ reais parados, se assume:
- Capital investido ($invs$) aumenta em $x$ reais
- Capital de terceiros ($p$) aumenta em $wi\cdot x$ reais
- Capital próprio ($pl$) aumenta em $we\cdot x$ reais
- O resultado das operações ($nopat$) não muda
- Custo de capital percentual não muda ($ki$, $ke$, $wacc$)

Dedução:
$roi = \frac{nopat}{invs + x}$
$roe = roi + (roi-ki)\cdot \frac{p}{pl}$
$ll = roe \cdot pl$
$ll = roi \cdot pl + (roi-ki) \cdot p$
$eva = ll - ke \cdot pl$
$eva = roi \cdot pl + (roi-ki) \cdot p - ke \cdot pl$
$eva = roi \cdot pl + roi \cdot p - ki \cdot p - ke \cdot pl$

$eva = roi \cdot (p + pl) - p \cdot ki - pl \cdot ke$
$eva = \frac{nopat}{invs+x}\cdot (invs+x) - p \cdot ki - pl \cdot ke$

$eva = nopat - p \cdot ki - pl \cdot ke$
onde $p$ aumenta em $wi\cdot x$ reais e $pl$ aumenta em $we\cdot x$ reais

$eva = nopat - ki \cdot (p_0+wi\cdot x) - ke \cdot (pl_0 + we \cdot x)$

$\therefore eva(x) = nopat - ki \cdot (p_0+wi\cdot x) - ke \cdot (pl_0 + we \cdot x)$

---

## 4. Função cost
Se assume que as operações são interrompidas e é retornado o lucro econômico.

$cost = eva(0) - nopat$
$cost = nopat - ki \cdot (p_0+wi\cdot 0) - ke \cdot (pl_0 + we \cdot 0) - nopat$
$cost = nopat - ki \cdot p_0 - ke \cdot pl_0 - nopat$
$cost = -ki \cdot p_0 - ke \cdot pl_0$

$\therefore cost = -ki \cdot p_0 - ke \cdot pl_0$

---

## 5. Função $L_{est}$
Retorna o lucro esperado ponderando entre a probabilidade de manter as operação e de interromper.

$L_{est} = P($manter as operacoes$)\cdot eva(x) + P($não manter as operações$) \cdot cost$
$\therefore L_{est} = prob(z(x)) \cdot eva(x) + (1-prob(z(x))) \cdot cost$

---

## 6. Max $L_{est}$
$$\max_{a} \int_a^{a+c} L_{est}(x) \, dx$$

Como $L_{est}$ tem apenas um ponto crítico e é de máximo, derivar e igualar a zero funciona:


$$\frac{d}{dx} \int_a^{a+c} L_{est}(x) \, dx = 0$$


$$L_{est}(a+c) - L_{est}(a) = 0$$

$ prob(z(a+c)) \cdot eva(a+c) + (1-prob(z(a+c))) \cdot cost =$ 
$prob(z(a)) \cdot eva(x) + (1-prob(z(a))) \cdot cost$

$<=> prob(z(a+c)) \cdot eva(a+c) + cost-prob(z(a+c)) \cdot cost =$
$prob(z(a)) \cdot eva(x) + cost-prob(z(a)) \cdot cost$

$<=> prob(z(a+c)) \cdot eva(a+c) - prob(z(a+c)) \cdot cost =$
$prob(z(a)) \cdot eva(x)-prob(z(a)) \cdot cost$

$<=> prob(z(a+c)) \cdot (eva(a+c) - cost) =$
$prob(z(a)) \cdot (eva(x) - cost)$

$\therefore prob(z(a+c)) \cdot (eva(a+c) - cost) = prob(z(a)) \cdot (eva(x) - cost)$