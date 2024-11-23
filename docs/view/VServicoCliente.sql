CREATE VIEW vw_servicos_cliente AS
SELECT 
    c.id_cliente,
    c.cnpj,
    c.razao_social,
    c.nome_fantasia,
    s.id_servico,
    s.id_tipo_servico
FROM 
    clientes c
JOIN 
    servicos_cliente s ON c.id_cliente = s.id_cliente;
