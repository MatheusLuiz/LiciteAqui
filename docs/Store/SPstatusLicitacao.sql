DELIMITER $$

CREATE PROCEDURE sp_inserir_status_licitacao (
    IN p_nome_status VARCHAR(30),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_status INT;

    
    INSERT INTO status_licitacao (nome_status)
    VALUES (p_nome_status);

    
    SET v_id_status = LAST_INSERT_ID();

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'status_licitacao', 
        'inserir', 
        v_id_status, 
        p_usuario, 
        CONCAT('Inserido status de licitação: ', p_nome_status)
    );
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_atualizar_status_licitacao (
    IN p_id_status INT,
    IN p_nome_status VARCHAR(30),
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_status_antigo VARCHAR(30);

    
    SELECT nome_status INTO v_nome_status_antigo
    FROM status_licitacao
    WHERE id_status = p_id_status;

    
    UPDATE status_licitacao
    SET nome_status = p_nome_status
    WHERE id_status = p_id_status;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'status_licitacao', 
        'editar', 
        p_id_status, 
        p_usuario, 
        CONCAT('Alterado status de licitação: ', v_nome_status_antigo, ' para ', p_nome_status)
    );
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_deletar_status_licitacao (
    IN p_id_status INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_status VARCHAR(30);

    
    SELECT nome_status INTO v_nome_status
    FROM status_licitacao
    WHERE id_status = p_id_status;

    
    DELETE FROM status_licitacao
    WHERE id_status = p_id_status;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'status_licitacao', 
        'deletar', 
        p_id_status, 
        p_usuario, 
        CONCAT('Deletado status de licitação: ', v_nome_status)
    );
END $$

DELIMITER;