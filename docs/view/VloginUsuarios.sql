CREATE VIEW vw_login_usuarios AS
SELECT
    lu.id_login,
    lu.usuario,
    lu.username,
    lu.senha,
    lu.data_cadastro AS data_login_cadastro,
    u.nome_completo,
    u.email,
    u.sexo,
    u.data_nascimento,
    u.data_cadastro AS data_usuario_cadastro,
    u.cpf
FROM login_usuarios lu
    JOIN usuarios u ON lu.usuario = u.id_usuario;