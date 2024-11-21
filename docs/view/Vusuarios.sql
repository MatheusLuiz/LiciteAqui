CREATE VIEW vw_usuarios AS
SELECT
    id_usuario,
    nome_completo,
    email,
    sexo,
    data_nascimento,
    data_cadastro,
    cpf
FROM
    usuarios;