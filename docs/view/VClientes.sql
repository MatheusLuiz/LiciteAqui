-- Clientes por Status --

-- Clientes Ativos --
CREATE VIEW vw_clientes_ativos AS
SELECT
    c.id_cliente,
    c.cnpj,
    c.nome_fantasia,
    c.razao_social,
    c.data_cadastro,
    c.`status`
FROM
    clientes c
JOIN 
	status_cliente sc ON c.`status` = sc.id_status
WHERE 
    sc.descricao = 'Ativo';

-- Clientes Inativos --
CREATE VIEW vw_clientes_inativos AS
SELECT
    c.id_cliente,
    c.cnpj,
    c.nome_fantasia,
    c.razao_social,
    c.data_cadastro,
    c.`status`
FROM
    clientes c
JOIN 
	status_cliente sc ON c.`status` = sc.id_status
WHERE 
    sc.descricao = 'Inativo';

-- Clientes Suspensos --
CREATE VIEW vw_clientes_suspenso AS
SELECT
    c.id_cliente,
    c.cnpj,
    c.nome_fantasia,
    c.razao_social,
    c.data_cadastro,
    c.`status`
FROM
    clientes c
JOIN 
	status_cliente sc ON c.`status` = sc.id_status
WHERE 
    sc.descricao = 'Suspenso';

-- Todos os Clientes --
CREATE VIEW vw_clientes_all AS 
SELECT 
    id_cliente,
    cnpj,
    nome_fantasia,
    razao_social,
    `status`,
    data_cadastro
FROM    
    clientes;
