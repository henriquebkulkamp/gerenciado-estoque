# Dedução
## 1. Função prob

Se tem-se n unidades de um produto e a probabilidade de perda de cada unidade de produto é p, então a probabilidade de que exatamente $k$ unidades sejam perdidas é dada por:
$P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}$
Para que a quantidade final seja maior que pc (Ponto Crítico), em outra palavras:<br>  
$P(X \leq n - pc) \approx P\left(Z \leq z(a)\right) = \Phi\left(z(a)\right)$
onde $Z \sim N(0, 1)$ e $z(a)$ converte a reais em unidades de produto, e também normaliza a distribuição.

A Função para aproximar a integral foi a $\phi_6(z)$, presente no seguinte [artigo](https://arxiv.org/pdf/2206.12601.pdf#page=4) e contém a aproximação de Boiroju and Rao (2014).

$$
\phi(z) = \int_{-\infty}^{z} e^{-x^2} \, dx
\approx \frac{1}{1+e^{-1.5976 \cdot z - 0.07056 \cdot z^3}}
$$

---

## 2. Função $z(a)$
Recebe x reais parados e descobre quantas unidades tem no total e então normaliza para uma distribuição normal.  
1° Divide x pelo preço de uma unidade, e com isso se obtém quantas unidades estão paradas.  
2° Adiciona pc, e com isso se obtém a quantidade total.  

$x$ representa os reais parados e $a$ representa a quantidade total  
$x = (a-pc) \cdot price$  
$a = \frac{x}{price}+pc$  

Essa é a correlação entre $x$ reais parados e a quantidade total desse produto, e normalizando para a distribuição binomial:

$P(X \leq a-pc) = P(\frac {a- pc - \mu}{\sigma})$
onde: 
- $\mu = a\cdot p$
- $\sigma = a\cdot p \cdot (1-p)$
- $a$ = quantidade total de produtos

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

$L_{est} = P(\text{manter as operacoes}) \cdot eva(x) + P(\text{não manter as operações}) \cdot cost$
$\therefore L_{est} = prob(z(x)) \cdot eva(x) + (1-prob(z(x))) \cdot cost$

---

## 6. Max $L_{est}$
$$\max_{a} \int_a^{a+c} L_{est}(x) \, dx$$

Como $L_{est}$ tem apenas um ponto crítico e é de máximo, derivar e igualar a zero funciona:


$$\frac{d}{dx} \int_a^{a+c} L_{est}(x) \, dx = 0$$


$$L_{est}(a+c) - L_{est}(a) = 0$$

$prob(z(a+c)) \cdot eva(a+c)   + (1-prob(z(a+c))) \cdot cost$ = 
$prob(z(a)) \cdot eva(x) + (1-prob(z(a))) \cdot cost$

$<=> prob(z(a+c)) \cdot eva(a+c) + cost-prob(z(a+c)) \cdot cost =$
$prob(z(a)) \cdot eva(x) + cost-prob(z(a)) \cdot cost$

$<=> prob(z(a+c)) \cdot eva(a+c) - prob(z(a+c)) \cdot cost =$
$prob(z(a)) \cdot eva(x)-prob(z(a)) \cdot cost$

$<=> prob(z(a+c)) \cdot (eva(a+c) - cost) =$
$prob(z(a)) \cdot (eva(x) - cost)$

$\therefore prob(z(a+c)) \cdot (eva(a+c) - cost) = prob(z(a)) \cdot (eva(x) - cost)$

---

### 7. Cálculo Limite

Deseja-se obter um x, tal que a x - perda esperada seja igual a quantidade mínima. 

$x - x*p = pc$
$=> x = \frac{pc}{1-p}$

X está em quantidade absoluta, agora será feita uma conversão para reais extras.

$(x - pc) *price$
$= (\frac{pc}{1-p} - pc) \cdot price$
$= (\frac{pc}{1-p} - \frac{(1-p)\cdot pc}{1-p}) \cdot price$
$= (\frac{pc - pc + p \cdot pc}{1-p}) \cdot price$
$= \frac{pc\cdot p}{1-p} \cdot price$

$ \therefore limite = \frac{pc\cdot p}{1-p} \cdot price$

---

### 8. Forçar $z(a) = -10$
$\frac{1}{2} \left( -\sqrt{-400 \cdot pc \cdot p \cdot price^2 - \frac{400 \cdot pc \cdot price^2}{1 - p} + \frac{400 \cdot pc \cdot price^2}{(1 - p)^2} - \frac{20000 \cdot price^2}{1 - p} + \frac{10000 \cdot price^2}{(1 - p)^2} + 10000 \cdot price^2} - price \left( -\frac{2 \cdot pc}{1 - p} + 2 \cdot pc - \frac{100}{1 - p} + 100 \right) \right)$

Essa formula foi resolvida via: [Wolfram Alpha](https://www.wolframalpha.com/)

---

### 9. Encontrar b
Se encontra b tal que $cost = eva(b)$:

$-ki \cdot p - ke \cdot pl = nopat - ki \cdot (p+wi\cdot b) - ke \cdot (pl + we \cdot b)$

$=> -ki\cdot p - ke\cdot pl = nopat -ki\cdot p - ki\cdot wi\cdot b - ke\cdot pl - ke \cdot we \cdot b$

$=> 0 = nopat - (ki\cdot wi + ke\cdot we) \cdot b$
$=> wacc \cdot b = nopat$
$=> b = \frac{nopat}{wacc}$  
$\therefore b$ = $\frac{nopat}{wacc}$

---

### Ordem de complexidade de execução
Como o algoritmo tem que, no pior dos casos, executar uma busca em bissecção do intervalo [0, $\frac{nopat}{wacc}$], até um intervalo [a, a+0.5].

O Tamanho do intervalor inicial é $\frac{nopat}{wacc}$ e serão feitas iterações, que cortam o tamanho do intervalo pela metade até que o tamanho seja 0.5, portanto:

$\frac{nopat}{wacc}\cdot 2^n = 0.5$
$=> log_2(\frac{nopat}{wacc}\cdot 2^n) = log_2(0.5)$
$=> log_2(\frac{nopat}{wacc}) + log_2(2^n) = -1$
$=> n = -log_2(\frac{nopat}{wacc})-1$

Portanto, em $\lceil log_2(\frac{nopat}{wacc}) \rceil + 1$ iterações se chega na resposta. E como cada iteração é O(1) pois executa apenas a calcula do resultado de uma funcao, um if e o calculo de uma media de dois valores.
O Algoritmo possui O($\lceil log_2(\frac{nopat}{wacc}) \rceil + 1$) = O( $log_2(n)$ ).
