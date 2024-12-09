1. Função f_prob (Probabilidade de Manutenção de Operações)

Descrição: Modela a probabilidade de manter as operações com base em uma distribuição de Gauss, considerando que os eventos são independentes.

Entradas:

    Parâmetros do sistema (e.g., condições do mercado, nível de estoque).

Saídas:

    Probabilidade de manutenção das operações (valor entre 0 e 1).

Fórmula:
P(Operac\co~es)=1σ2πe−(x−μ)22σ2
P(Operac\c​o~es)=σ2π
​1​e−2σ2(x−μ)2​

Onde:

    μ: Média
    σ: Desvio padrão

2. Função f_eva (Avaliação de Lucro)

Descrição: Calcula o lucro baseado nas decisões de investimento, levando em consideração parâmetros como receita e custo.

Entradas:

    Valor do investimento
    Variáveis de mercado
    Projeções de vendas

Saídas:

    Valor do lucro estimado.

Fórmula:
Lucro=Receita−Custo
Lucro=Receita−Custo

Onde:

    Receita = Quantidade Vendida * Preço
    Custo = Custo fixo + Custo variável

3. Função f_cost (Cálculo de Custo)

Descrição: Calcula o custo total do sistema, levando em conta fatores fixos e variáveis.

Entradas:

    Custo fixo
    Custo variável (dependente de produção ou quantidade vendida)

Saídas:

    Custo total.

Fórmula:
Custototal=Custofixo+Custovariaˊvel
Custototal​=Custofixo​+Custovariaˊvel​
4. Função FF (Função Combinada)

Descrição: Combinando as saídas das funções de probabilidade, avaliação e custo, FF calcula uma métrica de viabilidade financeira do sistema.

Entradas:

    Saídas de f_prob, f_eva, e f_cost.

Saídas:

    Métrica única de viabilidade financeira (ex: retorno sobre investimento).

Fórmula:
FF=fprob×feva−fcost
FF=fp​rob×fe​va−fc​ost
5. Monitoramento de Estoque Externo

Descrição: Rastreia os valores de estoque de sistemas externos e verifica se estão dentro dos limites definidos.

Entradas:

    Dados de estoque
    Limites definidos de operação

Saídas:

    Relatório de status: "Dentro dos Limites" ou "Fora dos Limites".