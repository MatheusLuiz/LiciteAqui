DELIMITER $$

CREATE PROCEDURE sp_inserir_tipo_servico (
    IN p_descricao VARCHAR(255),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_tipo_servico INT;

    -- Inserção do tipo de serviço
    INSERT INTO tipo_servico (descricao)
    VALUES (p_descricao);

    -- Obter o ID do tipo de serviço recém-inserido
    SET v_id_tipo_servico = LAST_INSERT_ID();

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'tipo_servico', 
        'inserir', 
        v_id_tipo_servico, 
        p_usuario, 
        CONCAT('Inserido tipo de serviço: ', p_descricao)
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_atualizar_tipo_servico (
    IN p_id_tipo_servico INT,
    IN p_descricao VARCHAR(255),
    IN p_usuario INT
)
BEGIN
    DECLARE v_descricao_antiga VARCHAR(255);

    -- Capturar o dado antigo para o log
    SELECT descricao INTO v_descricao_antiga
    FROM tipo_servico
    WHERE id_tipo_servico = p_id_tipo_servico;

    -- Atualizar o tipo de serviço
    UPDATE tipo_servico
    SET descricao = p_descricao
    WHERE id_tipo_servico = p_id_tipo_servico;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'tipo_servico', 
        'editar', 
        p_id_tipo_servico, 
        p_usuario, 
        CONCAT('Alterado tipo de serviço: ', v_descricao_antiga, ' para ', p_descricao)
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_deletar_tipo_servico (
    IN p_id_tipo_servico INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_descricao VARCHAR(255);

    -- Capturar o dado antigo para o log
    SELECT descricao INTO v_descricao
    FROM tipo_servico
    WHERE id_tipo_servico = p_id_tipo_servico;

    -- Deletar o tipo de serviço
    DELETE FROM tipo_servico
    WHERE id_tipo_servico = p_id_tipo_servico;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'tipo_servico', 
        'deletar', 
        p_id_tipo_servico, 
        p_usuario, 
        CONCAT('Deletado tipo de serviço: ', v_descricao)
    );
END $$

DELIMITER ;
