-- Serão 3 tabelas:
-- 1° usuario, cada usuario terá um id, nome e acesso as informações de alguns produtos
-- 2° produto, será uma tabela com id, nome, qtde atual, "quem tem acesso", preco,
--     p (prob de perder cada produto) e quantidade demandada.
-- 3° tabela que relaciona cada pessoa com um "quem tem acesso".

-- Tabela usuario
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,     -- Identificador único do usuário
    nome VARCHAR(255) NOT NULL -- Nome do usuário
);

CREATE INDEX idx_usuario_nome_hash 
ON usuario USING hash (nome);


CREATE TABLE grupo_acesso (
    id SERIAL NOT NULL,               -- Identificador único do grupo de acesso
    usuario_id INTEGER NOT NULL,      -- Usuário associado ao grupo
    CONSTRAINT pk_grupo_acesso PRIMARY KEY (id, usuario_id),  -- Chave primária composta
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
    grupo_acesso_id INTEGER NOT NULL,  -- Grupo de acesso ao qual o produto pertence
    CONSTRAINT fk_grupo_acesso 
        FOREIGN KEY (grupo_acesso_id) 
        REFERENCES grupo_acesso (id) ON DELETE CASCADE
);

CREATE INDEX idx_produto_grupo_acesso_id_btree
ON produto (grupo_acesso_id);