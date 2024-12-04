DELIMITER $$

CREATE PROCEDURE sp_inserir_login_usuario (
    IN p_usuario INT,
    IN p_username VARCHAR(50),
    IN p_senha VARCHAR(255),
    IN p_usuario_log INT
)
BEGIN
    DECLARE v_id_login INT;

    
    INSERT INTO login_usuarios (usuario, username, senha)
    VALUES (p_usuario, p_username, p_senha);

    
    SET v_id_login = LAST_INSERT_ID();

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'login_usuarios', 
        'inserir', 
        v_id_login, 
        p_usuario_log, 
        CONCAT('Inserido login: ', p_username, ' para usuário ID: ', p_usuario)
    );
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_atualizar_login_usuario (
    IN p_id_login INT,
    IN p_username VARCHAR(50),
    IN p_senha VARCHAR(255),
    IN p_usuario_log INT
)
BEGIN
    DECLARE v_username_antigo VARCHAR(50);

    
    SELECT username INTO v_username_antigo
    FROM login_usuarios
    WHERE id_login = p_id_login;

    
    UPDATE login_usuarios
    SET username = p_username, senha = p_senha
    WHERE id_login = p_id_login;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'login_usuarios', 
        'editar', 
        p_id_login, 
        p_usuario_log, 
        CONCAT('Atualizado login: ', v_username_antigo, ' para ', p_username)
    );
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_deletar_login_usuario (
    IN p_id_login INT,
    IN p_usuario_log INT
)
BEGIN
    DECLARE v_username VARCHAR(50);

    
    SELECT username INTO v_username
    FROM login_usuarios
    WHERE id_login = p_id_login;

    
    DELETE FROM login_usuarios
    WHERE id_login = p_id_login;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'login_usuarios', 
        'deletar', 
        p_id_login, 
        p_usuario_log, 
        CONCAT('Deletado login: ', v_username)
    );
END $$

DELIMITER;