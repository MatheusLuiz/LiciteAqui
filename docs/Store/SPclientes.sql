DELIMITER $$

CREATE PROCEDURE sp_inserir_cliente (
    IN p_cnpj CHAR(14),
    IN p_razao_social VARCHAR(255),
    IN p_nome_fantasia VARCHAR(255),
    IN p_status INT,
    IN p_data_cadastro DATE,
    IN p_usuario INT
)
BEGIN
    
    IF EXISTS (SELECT 1 FROM clientes WHERE cnpj = p_cnpj) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'CNPJ já cadastrado.';
    END IF;

    
    INSERT INTO clientes (cnpj, razao_social, nome_fantasia, status, data_cadastro)
    VALUES (p_cnpj, p_razao_social, p_nome_fantasia, p_status, p_data_cadastro);

    
    SELECT LAST_INSERT_ID() AS id_cliente;
END $$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_atualizar_cliente (
    IN p_id_cliente INT,
    IN p_cnpj CHAR(14),
    IN p_razao_social VARCHAR(255),
    IN p_nome_fantasia VARCHAR(255),
    IN p_status INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_razao_social_antiga VARCHAR(255);

    
    SELECT razao_social INTO v_razao_social_antiga
    FROM clientes
    WHERE id_cliente = p_id_cliente;

    
    UPDATE clientes
    SET 
        cnpj = p_cnpj, 
        razao_social = p_razao_social, 
        nome_fantasia = p_nome_fantasia, 
        status = p_status
    WHERE id_cliente = p_id_cliente;

    
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'clientes', 
        'editar', 
        p_id_cliente, 
        p_usuario, 
        CONCAT('Atualizado cliente: ', v_razao_social_antiga, ' para ', p_razao_social)
    );

    
    SELECT 'Cliente atualizado com sucesso' AS mensagem;
END$$

DELIMITER;

DELIMITER $$

CREATE PROCEDURE sp_deletar_cliente (
    IN p_id_cliente INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_razao_social VARCHAR(255);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
   
        ROLLBACK;
        SELECT 'Erro ao deletar cliente, transação revertida.' AS mensagem;
    END;

    START TRANSACTION;

    SELECT razao_social INTO v_razao_social
    FROM clientes
    WHERE id_cliente = p_id_cliente;


    IF v_razao_social IS NOT NULL THEN

        DELETE FROM contato_cliente
        WHERE cliente = p_id_cliente;

  
        DELETE FROM servicos_cliente
        WHERE id_cliente = p_id_cliente;

        DELETE FROM clientes
        WHERE id_cliente = p_id_cliente;


        INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
        VALUES (
            'clientes', 
            'deletar', 
            p_id_cliente, 
            p_usuario, 
            CONCAT('Deletado cliente: ', v_razao_social)
        );


        COMMIT;

 
        SELECT 'Cliente deletado com sucesso.' AS mensagem;
    ELSE
    
        ROLLBACK;
        SELECT 'Cliente não encontrado.' AS mensagem;
    END IF;

END $$

DELIMITER ;
