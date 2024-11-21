DELIMITER $$

CREATE PROCEDURE sp_inserir_usuario (
    IN p_nome_completo VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_sexo ENUM('Masculino', 'feminino'),
    IN p_data_nascimento DATE,
    IN p_data_cadastro DATE,
    IN p_cpf CHAR(11),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_usuario INT;

    -- Inserção do usuário
    INSERT INTO usuarios (nome_completo, email, sexo, data_nascimento, data_cadastro, cpf)
    VALUES (p_nome_completo, p_email, p_sexo, p_data_nascimento, p_data_cadastro, p_cpf);

    -- Obter o ID do usuário recém-inserido
    SET v_id_usuario = LAST_INSERT_ID();

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'usuarios', 
        'inserir', 
        v_id_usuario, 
        p_usuario, 
        CONCAT('Inserido usuário: ', p_nome_completo, ' (CPF: ', p_cpf, ')')
    );
END $$

DELIMITER ;


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

    -- Capturar o dado antigo para o log
    SELECT nome_completo INTO v_nome_completo_antigo
    FROM usuarios
    WHERE id_usuario = p_id_usuario;

    -- Atualizar o usuário
    UPDATE usuarios
    SET 
        nome_completo = p_nome_completo,
        email = p_email,
        sexo = p_sexo,
        data_nascimento = p_data_nascimento,
        cpf = p_cpf
    WHERE id_usuario = p_id_usuario;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'usuarios', 
        'editar', 
        p_id_usuario, 
        p_usuario, 
        CONCAT('Atualizado usuário: ', v_nome_completo_antigo, ' para ', p_nome_completo)
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_deletar_usuario (
    IN p_id_usuario INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_completo VARCHAR(255);

    -- Capturar o dado antigo para o log
    SELECT nome_completo INTO v_nome_completo
    FROM usuarios
    WHERE id_usuario = p_id_usuario;

    -- Deletar o usuário
    DELETE FROM usuarios
    WHERE id_usuario = p_id_usuario;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'usuarios', 
        'deletar', 
        p_id_usuario, 
        p_usuario, 
        CONCAT('Deletado usuário: ', v_nome_completo)
    );
END $$

DELIMITER ;
