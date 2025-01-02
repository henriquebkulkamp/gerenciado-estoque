-- Tabela usuario
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,     -- Identificador único do usuário
    nome VARCHAR(255) NOT NULL -- Nome do usuário
);

CREATE INDEX idx_usuario_nome_hash 
ON usuario USING hash (nome);


CREATE TABLE grupo_acesso (
    id SERIAL NOT NULL,
    usuario_id INTEGER NOT NULL,
    CONSTRAINT pk_grupo_acesso PRIMARY KEY (id, usuario_id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
);

CREATE INDEX idx_grupo_acesso_usuario_id_hash 
ON grupo_acesso USING hash (usuario_id);


-- Tabela produto
CREATE TABLE produto (
    id SERIAL PRIMARY KEY,             -- Identificador único do produto
    nome VARCHAR(255) NOT NULL,        -- Nome do produto
    qtde_atual INTEGER NOT NULL,       -- Quantidade atual no estoque
    preco NUMERIC(10, 2) NOT NULL,     -- Preço do produto
    p NUMERIC(5, 2) NOT NULL,          -- Probabilidade de perder o produto (0-1)
    quantidade_demandada INTEGER NOT NULL, -- Quantidade demandada
    grupo_acesso_id INTEGER NOT NULL   -- Grupo de acesso ao qual o produto pertence
);

CREATE INDEX idx_produto_grupo_acesso_id_btree
ON produto (grupo_acesso_id);

CREATE TABLE compra_produtos (
    id SERIAL PRIMARY KEY,
    produto_id INTEGER NOT NULL,
    fornecedor VARCHAR(45),
    qtde_compra INTEGER NOT NULL,
    preco_medio NUMERIC(10, 2) NOT NULL,
    dta_chegada DATE NOT NULL,
    CONSTRAINT fk_produto FOREIGN KEY (produto_id) REFERENCES produto (id) ON DELETE CASCADE
);

CREATE INDEX idx_compra_produtos_id_btree
ON compra_produtos(produto_id);