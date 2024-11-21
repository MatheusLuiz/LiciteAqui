DELIMITER $$

CREATE PROCEDURE sp_inserir_tipos_telefone (
    IN p_descricao VARCHAR(20),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_tipo_telefone INT;

    INSERT INTO tipos_telefone (descricao)
    VALUES (p_descricao);

    SET v_id_tipo_telefone = LAST_INSERT_ID();

    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES ('tipos_telefone', 'inserir', v_id_tipo_telefone, p_usuario, CONCAT('Inserido tipo de telefone: ', p_descricao));
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_atualizar_tipos_telefone (
    IN p_id_tipo_telefone INT,
    IN p_descricao VARCHAR(20),
    IN p_usuario INT
)
BEGIN
    DECLARE v_descricao_antiga VARCHAR(20);

    SELECT descricao INTO v_descricao_antiga
    FROM tipos_telefone
    WHERE id_tipo_telefone = p_id_tipo_telefone;

    UPDATE tipos_telefone
    SET descricao = p_descricao
    WHERE id_tipo_telefone = p_id_tipo_telefone;

    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES ('tipos_telefone', 'editar', p_id_tipo_telefone, p_usuario, CONCAT('Alterado tipo de telefone: ', v_descricao_antiga, ' para ', p_descricao));
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_deletar_tipos_telefone (
    IN p_id_tipo_telefone INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_descricao VARCHAR(20);

    SELECT descricao INTO v_descricao
    FROM tipos_telefone
    WHERE id_tipo_telefone = p_id_tipo_telefone;

    DELETE FROM tipos_telefone
    WHERE id_tipo_telefone = p_id_tipo_telefone;

    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES ('tipos_telefone', 'deletar', p_id_tipo_telefone, p_usuario, CONCAT('Deletado tipo de telefone: ', v_descricao));
END $$

DELIMITER ;


