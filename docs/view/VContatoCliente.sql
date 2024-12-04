CREATE VIEW vw_contato_cliente AS
SELECT
    id_contato,
    cliente,
    tipo_telefone,
    ddd,
    telefone,
    nome_completo,
    sexo,
    data_nascimento,
    cpf,
    status_cadastro,
    email
FROM contato_cliente;