DELIMITER $$

CREATE PROCEDURE sp_inserir_documento_licitacao (
    IN p_id_documento INT,
    IN p_num_licitacao VARCHAR(50),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_doc_licitacao INT;

    -- Inserção do documento da licitação
    INSERT INTO documentos_licitacao (id_documento, num_licitacao)
    VALUES (p_id_documento, p_num_licitacao);

    -- Obter o ID do documento recém-inserido
    SET v_id_doc_licitacao = LAST_INSERT_ID();

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'documentos_licitacao', 
        'inserir', 
        v_id_doc_licitacao, 
        p_usuario, 
        CONCAT('Inserido documento ID: ', p_id_documento, ' para licitação: ', p_num_licitacao)
    );
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_atualizar_documento_licitacao (
    IN p_id_doc_licitacao INT,
    IN p_id_documento INT,
    IN p_num_licitacao VARCHAR(50),
    IN p_usuario INT
)
BEGIN
    DECLARE v_num_licitacao_antiga VARCHAR(50);

    -- Capturar os dados antigos para o log
    SELECT num_licitacao INTO v_num_licitacao_antiga
    FROM documentos_licitacao
    WHERE id_doc_licitacao = p_id_doc_licitacao;

    -- Atualizar o documento da licitação
    UPDATE documentos_licitacao
    SET id_documento = p_id_documento, num_licitacao = p_num_licitacao
    WHERE id_doc_licitacao = p_id_doc_licitacao;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'documentos_licitacao', 
        'editar', 
        p_id_doc_licitacao, 
        p_usuario, 
        CONCAT('Alterado documento de licitação: ', v_num_licitacao_antiga, ' para ', p_num_licitacao)
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_deletar_documento_licitacao (
    IN p_id_doc_licitacao INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_num_licitacao VARCHAR(50);

    -- Capturar o dado antigo para o log
    SELECT num_licitacao INTO v_num_licitacao
    FROM documentos_licitacao
    WHERE id_doc_licitacao = p_id_doc_licitacao;

    -- Deletar o documento da licitação
    DELETE FROM documentos_licitacao
    WHERE id_doc_licitacao = p_id_doc_licitacao;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'documentos_licitacao', 
        'deletar', 
        p_id_doc_licitacao, 
        p_usuario, 
        CONCAT('Deletado documento da licitação: ', v_num_licitacao)
    );
END $$

DELIMITER ;
