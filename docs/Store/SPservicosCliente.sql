DELIMITER $$

CREATE PROCEDURE sp_inserir_servico_cliente (
    IN p_id_cliente INT,
    IN p_id_tipo_servico INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_servico INT;

    -- Inserção do serviço do cliente
    INSERT INTO servicos_cliente (id_cliente, id_tipo_servico)
    VALUES (p_id_cliente, p_id_tipo_servico);

    -- Obter o ID do serviço recém-inserido
    SET v_id_servico = LAST_INSERT_ID();

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'servicos_cliente', 
        'inserir', 
        v_id_servico, 
        p_usuario, 
        CONCAT('Inserido serviço para cliente ID: ', p_id_cliente, ' com tipo de serviço ID: ', p_id_tipo_servico)
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_atualizar_servico_cliente (
    IN p_id_servico INT,
    IN p_id_cliente INT,
    IN p_id_tipo_servico INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_cliente_antigo INT;
    DECLARE v_tipo_servico_antigo INT;

    -- Capturar os dados antigos para o log
    SELECT id_cliente, id_tipo_servico 
    INTO v_cliente_antigo, v_tipo_servico_antigo
    FROM servicos_cliente
    WHERE id_servico = p_id_servico;

    -- Atualizar o serviço do cliente
    UPDATE servicos_cliente
    SET id_cliente = p_id_cliente, id_tipo_servico = p_id_tipo_servico
    WHERE id_servico = p_id_servico;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'servicos_cliente', 
        'editar', 
        p_id_servico, 
        p_usuario, 
        CONCAT(
            'Alterado serviço ID: ', p_id_servico, 
            ' (Cliente ID: ', v_cliente_antigo, ' -> ', p_id_cliente, 
            ', Tipo Serviço ID: ', v_tipo_servico_antigo, ' -> ', p_id_tipo_servico, ')'
        )
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_deletar_servico_cliente (
    IN p_id_servico INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_cliente INT;
    DECLARE v_id_tipo_servico INT;

    -- Capturar os dados para o log
    SELECT id_cliente, id_tipo_servico 
    INTO v_id_cliente, v_id_tipo_servico
    FROM servicos_cliente
    WHERE id_servico = p_id_servico;

    -- Deletar o serviço do cliente
    DELETE FROM servicos_cliente
    WHERE id_servico = p_id_servico;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'servicos_cliente', 
        'deletar', 
        p_id_servico, 
        p_usuario, 
        CONCAT(
            'Deletado serviço ID: ', p_id_servico, 
            ' (Cliente ID: ', v_id_cliente, ', Tipo Serviço ID: ', v_id_tipo_servico, ')'
        )
    );
END $$

DELIMITER ;