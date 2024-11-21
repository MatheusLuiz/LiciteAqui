DELIMITER $$

CREATE PROCEDURE sp_inserir_modalidade (
    IN p_nome_modalidade VARCHAR(20),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_modalidade INT;

    -- Inserção da modalidade
    INSERT INTO modalidade (nome_modalidade)
    VALUES (p_nome_modalidade);

    -- Obter o ID da modalidade recém-inserida
    SET v_id_modalidade = LAST_INSERT_ID();

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'modalidade', 
        'inserir', 
        v_id_modalidade, 
        p_usuario, 
        CONCAT('Inserido modalidade: ', p_nome_modalidade)
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_atualizar_modalidade (
    IN p_id_modalidade INT,
    IN p_nome_modalidade VARCHAR(20),
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_modalidade_antiga VARCHAR(20);

    -- Capturar o dado antigo para o log
    SELECT nome_modalidade INTO v_nome_modalidade_antiga
    FROM modalidade
    WHERE id_modalidade = p_id_modalidade;

    -- Atualizar a modalidade
    UPDATE modalidade
    SET nome_modalidade = p_nome_modalidade
    WHERE id_modalidade = p_id_modalidade;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'modalidade', 
        'editar', 
        p_id_modalidade, 
        p_usuario, 
        CONCAT('Alterado modalidade: ', v_nome_modalidade_antiga, ' para ', p_nome_modalidade)
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_deletar_modalidade (
    IN p_id_modalidade INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_modalidade VARCHAR(20);

    -- Capturar o dado antigo para o log
    SELECT nome_modalidade INTO v_nome_modalidade
    FROM modalidade
    WHERE id_modalidade = p_id_modalidade;

    -- Deletar a modalidade
    DELETE FROM modalidade
    WHERE id_modalidade = p_id_modalidade;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'modalidade', 
        'deletar', 
        p_id_modalidade, 
        p_usuario, 
        CONCAT('Deletado modalidade: ', v_nome_modalidade)
    );
END $$

DELIMITER ;
