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



-- TRIGGERS

CREATE FUNCTION valida_produto()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar se qtde_atual, preco e quantidade_demandada são positivos e diferentes de 0
    IF NEW.qtde_atual <= 0 OR NEW.preco <= 0 OR NEW.quantidade_demandada <= 0 THEN
        RAISE EXCEPTION 'Quantidade atual, preço e quantidade demandada devem ser positivos e diferentes de zero';
    END IF;

    -- Verificar se p está no intervalo (0, 1)
    IF NEW.p <= 0 OR NEW.p >= 1 THEN
        RAISE EXCEPTION 'A probabilidade (p) deve estar entre 0 e 1, excluindo os valores 0 e 1';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar o gatilho para inserção e atualização
CREATE TRIGGER verifica_produto
BEFORE INSERT OR UPDATE ON produto
FOR EACH ROW
EXECUTE FUNCTION valida_produto();


CREATE OR REPLACE FUNCTION valida_compra_produtos()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar se qtde_compra e preco_medio são positivos e diferentes de 0
    IF NEW.qtde_compra <= 0 OR NEW.preco_medio <= 0 THEN
        RAISE EXCEPTION 'Quantidade de compra e preço médio devem ser positivos e diferentes de zero';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar o gatilho para inserção e atualização
CREATE TRIGGER verifica_compra_produtos
BEFORE INSERT OR UPDATE ON compra_produtos
FOR EACH ROW
EXECUTE FUNCTION valida_compra_produtos();
