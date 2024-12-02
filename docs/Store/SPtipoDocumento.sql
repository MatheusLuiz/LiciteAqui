DELIMITER $$

CREATE PROCEDURE sp_inserir_tipo_documento (
    IN p_descricao VARCHAR(50),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_documento INT;

    -- Inserção do tipo de documento
    INSERT INTO tipos_documentos (descricao)
    VALUES (p_descricao);

    -- Obter o ID do tipo de documento recém-inserido
    SET v_id_documento = LAST_INSERT_ID();

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'tipos_documentos', 
        'inserir', 
        v_id_documento, 
        p_usuario, 
        CONCAT('Inserido tipo de documento: ', p_descricao)
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_atualizar_tipo_documento (
    IN p_id_documento INT,
    IN p_descricao VARCHAR(50),
    IN p_usuario INT
)
BEGIN
    DECLARE v_descricao_antiga VARCHAR(50);

    -- Capturar o dado antigo para o log
    SELECT descricao INTO v_descricao_antiga
    FROM tipos_documentos
    WHERE id_documento = p_id_documento;

    -- Atualizar o tipo de documento
    UPDATE tipos_documentos
    SET descricao = p_descricao
    WHERE id_documento = p_id_documento;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'tipos_documentos', 
        'editar', 
        p_id_documento, 
        p_usuario, 
        CONCAT('Alterado tipo de documento: ', v_descricao_antiga, ' para ', p_descricao)
    );
END $$

DELIMITER ;



DELIMITER ;


-- Atualização da Store Procedure para validar e deletar documentos antes de deletar o tipo de documento
DELIMITER $$

CREATE PROCEDURE sp_deletar_tipo_documento (
    IN p_id_documento INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_descricao VARCHAR(50);
    DECLARE v_num_documentos INT;

    -- Capturar o dado antigo para o log
    SELECT descricao INTO v_descricao
    FROM tipos_documentos
    WHERE id_documento = p_id_documento;

    -- Verificar se há documentos vinculados ao tipo de documento
    SELECT COUNT(*) INTO v_num_documentos
    FROM documentos_licitacao
    WHERE id_documento = p_id_documento;

    -- Se houver documentos vinculados, deletar antes de deletar o tipo de documento
    IF v_num_documentos > 0 THEN
        DELETE FROM documentos_licitacao
        WHERE id_documento = p_id_documento;
    END IF;

    -- Deletar o tipo de documento
    DELETE FROM tipos_documentos
    WHERE id_documento = p_id_documento;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'tipos_documentos', 
        'deletar', 
        p_id_documento, 
        p_usuario, 
        CONCAT('Deletado tipo de documento: ', v_descricao)
    );
END $$

DELIMITER ;

