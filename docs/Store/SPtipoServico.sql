DELIMITER $$

CREATE PROCEDURE sp_inserir_tipo_servico (
    IN p_descricao VARCHAR(255),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_tipo_servico INT;

    
    INSERT INTO tipo_servico (descricao)
    VALUES (p_descricao);

    
    SET v_id_tipo_servico = LAST_INSERT_ID();

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'tipo_servico', 
        'inserir', 
        v_id_tipo_servico, 
        p_usuario, 
        CONCAT('Inserido tipo de serviço: ', p_descricao)
    );
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_atualizar_tipo_servico (
    IN p_id_tipo_servico INT,
    IN p_descricao VARCHAR(255),
    IN p_usuario INT
)
BEGIN
    DECLARE v_descricao_antiga VARCHAR(255);

    
    SELECT descricao INTO v_descricao_antiga
    FROM tipo_servico
    WHERE id_tipo_servico = p_id_tipo_servico;

    
    UPDATE tipo_servico
    SET descricao = p_descricao
    WHERE id_tipo_servico = p_id_tipo_servico;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'tipo_servico', 
        'editar', 
        p_id_tipo_servico, 
        p_usuario, 
        CONCAT('Alterado tipo de serviço: ', v_descricao_antiga, ' para ', p_descricao)
    );
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_deletar_tipo_servico (
    IN p_id_tipo_servico INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_descricao VARCHAR(255);

    
    SELECT descricao INTO v_descricao
    FROM tipo_servico
    WHERE id_tipo_servico = p_id_tipo_servico;

    
    DELETE FROM tipo_servico
    WHERE id_tipo_servico = p_id_tipo_servico; 

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'tipo_servico', 
        'deletar', 
        p_id_tipo_servico, 
        p_usuario, 
        CONCAT('Deletado tipo de serviço: ', v_descricao)
    );
END $$

DELIMITER;