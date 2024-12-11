SELECT 
    p.id, p.nome, p.qtde_atual, p.preco, p.p, p.quantidade_demandada
FROM 
    produto p
JOIN 
    grupo_acesso ga ON p.grupo_acesso_id = ga.id
JOIN 
    usuario u ON ga.usuario_id = u.id
WHERE 
    u.nome = 'Maria';

-- resultado esperado:
-- NOME
-- Produto AA
-- Produto AB
-- Produto AI
-- Produto AP
-- Produto AW