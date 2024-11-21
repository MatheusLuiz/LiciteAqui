CREATE VIEW vw_contato_clientes AS
SELECT 
    c.id_cliente,
    c.cnpj,
    c.razao_social,
    c.nome_fantasia,
    c.`status`,
    c.data_cadastro,
    cc.id_contato,
    cc.nome_completo,
    cc.ddd,
    cc.telefone,
    cc.tipo_telefone,
    cc.sexo,
    cc.cpf,
    cc.email,
    cc.status_cadastro
FROM 
    clientes c
JOIN
    contato_cliente cc ON c.id_cliente = cc.cliente