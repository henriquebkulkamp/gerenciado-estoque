# Componentes:

## ERP:
É um pseudo erp para enviar informações financeiras da empresa:
- invs:     Total investido na empresa
- p:        Dívidas com terceiros
- pl:       Capital próprio
- wi:       Percentual que o capital de terceiros representa do invs
- we:       Percentual que o capital próprio representa do invs
- nopat:    Receita das operações
- ki:       Custo de capital de terceiros (percentual dos juros)
- ke:       Custo de oportunidade

Esses indicadores influenciam nos limites superiores e inferiores para se ter de estoque, por exemplo, se a empresa nao tem custo de capital, então é viável manter mais estoque parado. Em quanto que custo de capital muito elevados precionam esses limites para baixo, mais próximo do mínimo para manter as operações.

## ADM:
É uma interface usuário com o banco de dados, onde são feitas as leitura, inserções, atualizações e deleções de produtos, usuários e quais grupos de usuários tem acesso a quais produtos.

## BD:
É o banco de dados, contém as seguintes tabelas:
### produto
- id:               Identificador único
- nome:             Nome do produto
- qtde_atual:       Quantidade atual de produtos em estoque
- preco:            Preço de uma unidade de produto
- p:                Probabilidade individual de um determinado produto ser perdido
- qtde_demandada:   Menor quantidade que precisa para manter as operações
- grupo_acesso_id:  Qual grupo de usuários tem acesso ao produto

### usuario
- id:       Identificador
- nome:     Nome do usuário

### grupo_acesso
- id            Identificador do grupo (não único)
- usario_id:    Identificador do integrante do grupo

## G
É uma interface entre serviços de terceiros e banco de dados com os usuários finais (não adiministrador).

## Front
Contém a tela onde o usuário final usa o gerenciador de estoque
