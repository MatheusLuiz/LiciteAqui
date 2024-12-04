DELIMITER $$

CREATE PROCEDURE sp_inserir_licitacao (
    IN p_id_cliente INT,
    IN p_num_licitacao VARCHAR(50),
    IN p_modalidade INT,
    IN p_orgao VARCHAR(255),
    IN p_portal VARCHAR(50),
    IN p_numero_identificacao VARCHAR(100),
    IN p_status_licitacao INT,
    IN p_objeto TEXT,
    IN p_cidade VARCHAR(55),
    IN p_estado CHAR(2),
    IN p_data_licitacao DATE,
    IN p_usuario INT
    
)
BEGIN
    DECLARE v_id_licitacao INT;

    
    INSERT INTO licitacoes (
        id_cliente,num_licitacao, modalidade, orgao, portal, numero_identificacao, 
        status_licitacao, objeto, cidade, estado, data_licitacao
    )
    VALUES (
        p_id_cliente,p_num_licitacao, p_modalidade, p_orgao, p_portal, p_numero_identificacao, 
        p_status_licitacao, p_objeto, p_cidade, p_estado, p_data_licitacao
    );

    
    SET v_id_licitacao = LAST_INSERT_ID();

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'licitacoes', 
        'inserir', 
        v_id_licitacao, 
        p_usuario, 
        CONCAT('Inserida licitação número: ', p_num_licitacao)
    );
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_atualizar_licitacao (
    IN p_id_licitacao INT,
    IN p_id_cliente INT,
    IN p_num_licitacao VARCHAR(50),
    IN p_modalidade INT,
    IN p_orgao VARCHAR(255),
    IN p_portal VARCHAR(50),
    IN p_numero_identificacao VARCHAR(100),
    IN p_status_licitacao INT,
    IN p_objeto TEXT,
    IN p_cidade VARCHAR(55),
    IN p_estado CHAR(2),
    IN p_data_licitacao DATE,
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_antigo VARCHAR(255);

    
    SELECT num_licitacao INTO v_nome_antigo
    FROM licitacoes
    WHERE id_licitacao = p_id_licitacao;

    
    UPDATE licitacoes
    SET 
        id_cliente = p_id_cliente,
        num_licitacao = p_num_licitacao,
        modalidade = p_modalidade,
        orgao = p_orgao,
        portal = p_portal,
        numero_identificacao = p_numero_identificacao,
        status_licitacao = p_status_licitacao,
        objeto = p_objeto,
        cidade = p_cidade,
        estado = p_estado,
        data_licitacao = p_data_licitacao
    WHERE id_licitacao = p_id_licitacao;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'licitacoes', 
        'atualizar', 
        p_id_licitacao, 
        p_usuario, 
        CONCAT('Atualizada licitação número: ', v_nome_antigo, ' para ', p_num_licitacao)
    );

    
    SELECT 'Licitação atualizada com sucesso' AS mensagem;
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_deletar_licitacao ( 
    IN p_num_licitacao VARCHAR(50),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_licitacao INT;
    DECLARE v_num_documentos INT;

    
    SELECT id_licitacao INTO v_id_licitacao
    FROM licitacoes
    WHERE num_licitacao = p_num_licitacao;

    
    IF v_id_licitacao IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Licitação não encontrada';
    END IF;

    
    SELECT COUNT(*) INTO v_num_documentos
    FROM documentos_licitacao
    WHERE num_licitacao = p_num_licitacao;

    
    IF v_num_documentos > 0 THEN
        DELETE FROM documentos_licitacao
        WHERE num_licitacao = p_num_licitacao;
    END IF;

    
    DELETE FROM licitacoes
    WHERE num_licitacao = p_num_licitacao;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'licitacoes', 
        'deletar', 
        v_id_licitacao, 
        p_usuario, 
        CONCAT('Deletada licitação com número: ', p_num_licitacao)
    );
END $$

DELIMITER;