INSERT INTO usuario (nome) 
VALUES 
    ('João'),
    ('Maria'),
    ('Carlos'),
    ('Ana'),
    ('Pedro'),
    ('Lucia'),
    ('Gabriel'),
    ('Fernanda'),
    ('Ricardo'),
    ('Sofia'),
    ('Marcelo'),
    ('Juliana'),
    ('Mateus'),
    ('Carla'),
    ('Rodrigo');


INSERT INTO grupo_acesso (id, usuario_id) 
VALUES 
    (1, 1),  -- Grupo 1, Usuário João
    (1, 2),  -- Grupo 1, Usuário Maria
    (1, 3),  -- Grupo 1, Usuário Carlos
    (2, 4),  -- Grupo 2, Usuário Ana
    (2, 5),  -- Grupo 2, Usuário Pedro
    (2, 6),  -- Grupo 2, Usuário Lucia
    (3, 7),  -- Grupo 3, Usuário Gabriel
    (3, 8),  -- Grupo 3, Usuário Fernanda
    (4, 9),  -- Grupo 4, Usuário Ricardo
    (4, 10), -- Grupo 4, Usuário Sofia
    (4, 1);  -- Grupo 4, Usuário João <-> Trabalhador
    
INSERT INTO produto (nome, qtde_atual, preco, p, quantidade_demandada, grupo_acesso_id)
VALUES 
    ('Produto AA', 40, 10.00, 0.05, 30,1),      -- Grupo 1
    ('Produto AB', 150, 20.00, 0.10, 30,1),     -- Grupo 1
    ('Produto AC', 200, 30.00, 0.02, 30,2),     -- Grupo 2
    ('Produto AD', 250, 25.00, 0.08, 30,2),     -- Grupo 2
    ('Produto AE', 300, 15.00, 0.03, 30,3),     -- Grupo 3
    ('Produto AF', 120, 18.00, 0.12, 30,3),     -- Grupo 3
    ('Produto AG', 180, 22.00, 0.04, 30,4),     -- Grupo 4
    ('Produto AH', 140, 28.00, 0.07, 30,4),     -- Grupo 4
    ('Produto AI', 160, 14.00, 0.50, 30,1),     -- Grupo 1
    ('Produto AJ', 110, 35.00, 0.11, 30,2),     -- Grupo 2
    ('Produto AK', 220, 40.00, 0.06, 30,2),     -- Grupo 2
    ('Produto AL', 250, 50.00, 0.02, 30,3),     -- Grupo 3
    ('Produto AM', 300, 60.00, 0.03, 30,3),     -- Grupo 3
    ('Produto AN', 130, 12.00, 0.01, 30,4),     -- Grupo 4
    ('Produto AO', 170, 17.00, 0.10, 30,4),     -- Grupo 4
    ('Produto AP', 190, 19.00, 0.05, 30,1),     -- Grupo 1
    ('Produto AQ', 210, 24.00, 0.08, 30,2),     -- Grupo 2
    ('Produto AR', 250, 26.00, 0.04, 30,2),     -- Grupo 2
    ('Produto AS', 270, 29.00, 0.03, 30,3),     -- Grupo 3
    ('Produto AT', 320, 32.00, 0.09, 30,3),     -- Grupo 3
    ('Produto AU', 140, 38.00, 0.07, 30,4),     -- Grupo 4
    ('Produto AV', 160, 45.00, 0.02, 30,4),     -- Grupo 4
    ('Produto AW', 180, 42.00, 0.16, 00,1),     -- Grupo 1
    ('Produto AX', 200, 48.00, 0.01, 30,2),     -- Grupo 2
    ('Produto AY', 220, 55.00, 0.10, 30,2),     -- Grupo 2
    ('Produto AZ', 240, 60.00, 0.04, 30,3),     -- Grupo 3
    ('Produto BA', 260, 65.00, 0.05, 30,3),     -- Grupo 3
    ('Produto BB', 280, 70.00, 0.09, 30,4),     -- Grupo 4
    ('Produto BC', 300, 75.00, 0.03, 30,4);     -- Grupo 4

INSERT INTO compra_produtos (produto_id, fornecedor, qtde_compra, preco_medio, dta_chegada)
    VALUES
    (1, 'Fornecedor A', 10, 15.50,  '2024-12-20'),
    (1, 'Fornecedor B', 20, 14.00,  '2024-12-21'),
    (2, 'Fornecedor C', 15, 12.75,  '2024-12-22'),
    (2, 'Fornecedor A', 25, 13.00,  '2024-12-23'),
    (3, 'Fornecedor D', 30, 10.00,  '2024-12-24'),
    (3, 'Fornecedor B', 5, 11.25,   '2024-12-25'),
    (4, 'Fornecedor A', 8, 9.50,    '2024-12-26'),
    (4, 'Fornecedor C', 12, 10.00,  '2024-12-27'),
    (5, 'Fornecedor D', 18, 8.75,   '2024-12-28'),
    (5, 'Fornecedor B', 22, 9.25,   '2024-12-29'),
    (6, 'Fornecedor A', 17, 15.00,  '2024-12-30'),
    (6, 'Fornecedor C', 11, 14.50,  '2024-12-31'),
    (7, 'Fornecedor D', 9, 13.25,   '2025-01-01'),
    (7, 'Fornecedor B', 13, 12.00,  '2025-01-02'),
    (8, 'Fornecedor A', 20, 11.75,  '2025-01-03'),
    (8, 'Fornecedor C', 10, 12.50,  '2025-01-04'),
    (9, 'Fornecedor D', 16, 13.75,  '2025-01-05'),
    (9, 'Fornecedor B', 24, 14.25,  '2025-01-06'),
    (10, 'Fornecedor A', 7, 15.50,  '2025-01-07'),
    (10, 'Fornecedor C', 19, 14.75, '2025-01-08');
