-- Status Clientes --

--Inserir--
DELIMITER $$

CREATE PROCEDURE sp_inserir_status_cliente (
    IN p_descricao VARCHAR(20),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_status INT;

    -- Inserção do novo status
    INSERT INTO status_cliente (descricao)
    VALUES (p_descricao);

    -- Obter o ID do registro recém-inserido
    SET v_id_status = LAST_INSERT_ID();

    -- Inserir log na tabela logs
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES ('status_cliente', 'inserir', v_id_status, p_usuario, CONCAT('Inserido status: ', p_descricao));
END $$

DELIMITER ;


--Atualizar--

DELIMITER $$

CREATE PROCEDURE sp_atualizar_status_cliente (
    IN p_id_status INT,
    IN p_nova_descricao VARCHAR(20),
    IN p_usuario INT
)
BEGIN
    DECLARE v_descricao_antiga VARCHAR(20);

    -- Capturar a descrição atual
    SELECT descricao INTO v_descricao_antiga
    FROM status_cliente
    WHERE id_status = p_id_status;

    -- Atualizar o status
    UPDATE status_cliente
    SET descricao = p_nova_descricao
    WHERE id_status = p_id_status;

    -- Inserir log na tabela logs
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'status_cliente', 
        'editar', 
        p_id_status, 
        p_usuario, 
        CONCAT('Descrição alterada de "', v_descricao_antiga, '" para "', p_nova_descricao, '"')
    );
END $$

DELIMITER ;


-- Deletar Status --

DELIMITER $$

CREATE PROCEDURE sp_deletar_status_cliente (
    IN p_id_status INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_descricao VARCHAR(20);

    -- Capturar a descrição do registro antes da exclusão
    SELECT descricao INTO v_descricao
    FROM status_cliente
    WHERE id_status = p_id_status;

    -- Deletar o status
    DELETE FROM status_cliente
    WHERE id_status = p_id_status;

    -- Inserir log na tabela logs
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'status_cliente', 
        'deletar', 
        p_id_status, 
        p_usuario, 
        CONCAT('Deletado status: ', v_descricao)
    );
END $$

DELIMITER ;


































