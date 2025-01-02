SELECT 
    p.id,
    p.nome,
    p.qtde_atual,
    p.preco,
    p.p,
    (
        SELECT 
            COALESCE(SUM(cp.qtde_compra * cp.preco_medio), 0.00)
        FROM 
            compra_produtos AS cp
        WHERE 
            cp.produto_id = p.id
    ) AS quantidade_a_receber,
    p.quantidade_demandada
FROM 
    Produto AS p
INNER JOIN 
    grupo_acesso AS ga ON p.grupo_acesso_id = ga.id
INNER JOIN 
    Usuario AS u ON ga.usuario_id = u.id
WHERE
    u.nome = 'Maria';

SELECT *, (
        SELECT 
            COALESCE(SUM(cp.qtde_compra * cp.preco_medio), 0.00)
        FROM 
            compra_produtos AS cp
        WHERE 
            cp.produto_id = p.id
    ) AS quantidade_a_receber,
FROM Produto AS p;


-- resultado esperado:
-- NOME
-- Produto AA
-- Produto AB
-- Produto AI
-- Produto AP
-- Produto AW