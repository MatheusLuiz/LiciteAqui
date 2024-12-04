DELIMITER $$

CREATE PROCEDURE sp_inserir_usuario (
    IN p_nome_completo VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_sexo ENUM('Masculino', 'Feminino'),
    IN p_data_nascimento DATE,
    IN p_data_cadastro DATE,
    IN p_cpf CHAR(11),
    IN p_usuario INT
)
BEGIN
    
    INSERT INTO usuarios (nome_completo, email, sexo, data_nascimento, data_cadastro, cpf)
    VALUES (p_nome_completo, p_email, p_sexo, p_data_nascimento, p_data_cadastro, p_cpf);

   
    SELECT LAST_INSERT_ID() AS id_usuario;

   
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'usuarios', 
        'inserir', 
        LAST_INSERT_ID(), 
        p_usuario, 
        CONCAT('Inserido usuário: ', p_nome_completo, ' (CPF: ', p_cpf, ')')
    );
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_atualizar_usuario (
    IN p_id_usuario INT,
    IN p_nome_completo VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_sexo ENUM('Masculino', 'feminino'),
    IN p_data_nascimento DATE,
    IN p_cpf CHAR(11),
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_completo_antigo VARCHAR(255);

    
    SELECT nome_completo INTO v_nome_completo_antigo
    FROM usuarios
    WHERE id_usuario = p_id_usuario;

    
    UPDATE usuarios
    SET 
        nome_completo = p_nome_completo,
        email = p_email,
        sexo = p_sexo,
        data_nascimento = p_data_nascimento,
        cpf = p_cpf
    WHERE id_usuario = p_id_usuario;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'usuarios', 
        'editar', 
        p_id_usuario, 
        p_usuario, 
        CONCAT('Atualizado usuário: ', v_nome_completo_antigo, ' para ', p_nome_completo)
    );
    SELECT 'Usuário atualizado com sucesso' AS mensagem;
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_deletar_usuario (
    IN p_id_usuario INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_completo VARCHAR(255);

    
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id_usuario = p_id_usuario) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Usuário não encontrado.';
    END IF;

    
    SELECT nome_completo INTO v_nome_completo
    FROM usuarios
    WHERE id_usuario = p_id_usuario;

    
    IF EXISTS (SELECT 1 FROM login_usuarios WHERE id_usuario = p_id_usuario) THEN
        
        DELETE FROM login_usuarios WHERE id_usuario = p_id_usuario;
    END IF;

    
    DELETE FROM usuarios
    WHERE id_usuario = p_id_usuario;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'usuarios', 
        'deletar', 
        p_id_usuario, 
        p_usuario, 
        CONCAT('Deletado usuário: ', v_nome_completo)
    );

    
    SELECT p_id_usuario AS id_usuario, CONCAT('Usuário ', v_nome_completo, ' foi excluído com sucesso.') AS mensagem;
END $$

DELIMITER;