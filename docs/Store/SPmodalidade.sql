DELIMITER $$

CREATE PROCEDURE sp_inserir_modalidade (
    IN p_nome_modalidade VARCHAR(20),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_modalidade INT;

    
    INSERT INTO modalidade (nome_modalidade)
    VALUES (p_nome_modalidade);

    
    SET v_id_modalidade = LAST_INSERT_ID();

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'modalidade', 
        'inserir', 
        v_id_modalidade, 
        p_usuario, 
        CONCAT('Inserido modalidade: ', p_nome_modalidade)
    );
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_atualizar_modalidade (
    IN p_id_modalidade INT,
    IN p_nome_modalidade VARCHAR(20),
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_modalidade_antiga VARCHAR(20);

    
    SELECT nome_modalidade INTO v_nome_modalidade_antiga
    FROM modalidade
    WHERE id_modalidade = p_id_modalidade;

   
    UPDATE modalidade
    SET nome_modalidade = p_nome_modalidade
    WHERE id_modalidade = p_id_modalidade;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'modalidade', 
        'editar', 
        p_id_modalidade, 
        p_usuario, 
        CONCAT('Alterado modalidade: ', v_nome_modalidade_antiga, ' para ', p_nome_modalidade)
    );
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_deletar_modalidade (
    IN p_id_modalidade INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_modalidade VARCHAR(20);

    
    SELECT nome_modalidade INTO v_nome_modalidade
    FROM modalidade
    WHERE id_modalidade = p_id_modalidade;

    
    DELETE FROM modalidade
    WHERE id_modalidade = p_id_modalidade;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'modalidade', 
        'deletar', 
        p_id_modalidade, 
        p_usuario, 
        CONCAT('Deletado modalidade: ', v_nome_modalidade)
    );
END $$

DELIMITER;