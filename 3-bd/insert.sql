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
    
INSERT INTO produto (nome, qtde_atual, preco, p, quantidade_demandada, quantidade_a_receber, grupo_acesso_id)
VALUES 
    ('Produto AA', 40, 10.00, 0.05, 30, 30,1),      -- Grupo 1
    ('Produto AB', 150, 20.00, 0.10, 40, 30,1),     -- Grupo 1
    ('Produto AB1', 150, 20.00, 0.10, 50, 30,1),     -- Grupo 1
    ('Produto AB2', 150, 20.00, 0.10, 60, 30,1),     -- Grupo 1
    ('Produto AB3', 150, 20.00, 0.10, 70, 30,1),     -- Grupo 1
    ('Produto AB4', 150, 20.00, 0.10, 80, 30,1),     -- Grupo 1
    ('Produto AB5', 150, 20.00, 0.10, 90, 30,1),     -- Grupo 1
    ('Produto AB6', 150, 20.00, 0.10, 100, 30,1),     -- Grupo 1


    ('Produto AC', 200, 30.00, 0.02, 50, 30,2),     -- Grupo 2
    ('Produto AD', 250, 25.00, 0.08, 60, 30,2),     -- Grupo 2
    ('Produto AE', 300, 15.00, 0.03, 70, 30,3),     -- Grupo 3
    ('Produto AF', 120, 18.00, 0.12, 20, 30,3),     -- Grupo 3
    ('Produto AG', 180, 22.00, 0.04, 25, 30,4),     -- Grupo 4
    ('Produto AH', 140, 28.00, 0.07, 35, 30,4),     -- Grupo 4
    ('Produto AI', 160, 14.00, 0.50, 45, 30,1),     -- Grupo 1
    ('Produto AJ', 110, 35.00, 0.11, 55, 30,2),     -- Grupo 2
    ('Produto AK', 220, 40.00, 0.06, 60, 30,2),     -- Grupo 2
    ('Produto AL', 250, 50.00, 0.02, 70, 30,3),     -- Grupo 3
    ('Produto AM', 300, 60.00, 0.03, 80, 30,3),     -- Grupo 3
    ('Produto AN', 130, 12.00, 0.01, 30, 30,4),     -- Grupo 4
    ('Produto AO', 170, 17.00, 0.10, 40, 30,4),     -- Grupo 4
    ('Produto AP', 190, 19.00, 0.05, 50, 30,1),     -- Grupo 1
    ('Produto AQ', 210, 24.00, 0.08, 60, 30,2),     -- Grupo 2
    ('Produto AR', 250, 26.00, 0.04, 70, 30,2),     -- Grupo 2
    ('Produto AS', 270, 29.00, 0.03, 80, 30,3),     -- Grupo 3
    ('Produto AT', 320, 32.00, 0.09, 90, 30,3),     -- Grupo 3
    ('Produto AU', 140, 38.00, 0.07, 20, 30,4),     -- Grupo 4
    ('Produto AV', 160, 45.00, 0.02, 30, 30,4),     -- Grupo 4
    ('Produto AW', 180, 42.00, 0.16, 40, 00,1),     -- Grupo 1
    ('Produto AX', 200, 48.00, 0.01, 50, 30,2),     -- Grupo 2
    ('Produto AY', 220, 55.00, 0.10, 60, 30,2),     -- Grupo 2
    ('Produto AZ', 240, 60.00, 0.04, 70, 30,3),     -- Grupo 3
    ('Produto BA', 260, 65.00, 0.05, 80, 30,3),     -- Grupo 3
    ('Produto BB', 280, 70.00, 0.09, 90, 30,4),     -- Grupo 4
    ('Produto BC', 300, 75.00, 0.03, 100, 30,4);    -- Grupo 4
