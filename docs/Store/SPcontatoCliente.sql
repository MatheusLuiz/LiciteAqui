DELIMITER $$

CREATE PROCEDURE sp_inserir_contato_cliente (
    IN p_cliente INT,
    IN p_tipo_telefone INT,
    IN p_ddd CHAR(3),
    IN p_telefone VARCHAR(10),
    IN p_nome_completo VARCHAR(255),
    IN p_sexo ENUM('Masculino', 'Feminino'),
    IN p_data_nascimento DATE,
    IN p_cpf CHAR(11),
    IN p_status_cadastro ENUM('Ativo', 'Inativo'),
    IN p_email VARCHAR(250),
    IN p_usuario INT
)
BEGIN
    DECLARE v_id_contato INT;

    -- Inserção do contato
    INSERT INTO contato_cliente (
        cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, 
        data_nascimento, cpf, status_cadastro, email
    )
    VALUES (
        p_cliente, p_tipo_telefone, p_ddd, p_telefone, p_nome_completo, p_sexo, 
        p_data_nascimento, p_cpf, p_status_cadastro, p_email
    );

    -- Obter o ID do contato recém-inserido
    SET v_id_contato = LAST_INSERT_ID();

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'contato_cliente', 
        'inserir', 
        v_id_contato, 
        p_usuario, 
        CONCAT('Inserido contato: ', p_nome_completo, ' (CPF: ', p_cpf, ')')
    );
END $$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE sp_atualizar_contato_cliente (
    IN p_id_contato INT,
    IN p_cliente INT,
    IN p_tipo_telefone INT,
    IN p_ddd CHAR(3),
    IN p_telefone VARCHAR(10),
    IN p_nome_completo VARCHAR(255),
    IN p_sexo ENUM('Masculino', 'Feminino'),
    IN p_data_nascimento DATE,
    IN p_cpf CHAR(11),
    IN p_status_cadastro ENUM('Ativo', 'Inativo'),
    IN p_email VARCHAR(250),
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_completo_antigo VARCHAR(255);

    -- Capturar o dado antigo para o log
    SELECT nome_completo INTO v_nome_completo_antigo
    FROM contato_cliente
    WHERE id_contato = p_id_contato;

    -- Atualizar o contato
    UPDATE contato_cliente
    SET 
        cliente = p_cliente,
        tipo_telefone = p_tipo_telefone,
        ddd = p_ddd,
        telefone = p_telefone,
        nome_completo = p_nome_completo,
        sexo = p_sexo,
        data_nascimento = p_data_nascimento,
        cpf = p_cpf,
        status_cadastro = p_status_cadastro,
        email = p_email
    WHERE id_contato = p_id_contato;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'contato_cliente', 
        'editar', 
        p_id_contato, 
        p_usuario, 
        CONCAT('Atualizado contato: ', v_nome_completo_antigo, ' para ', p_nome_completo)
    );
END $$
DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_deletar_contato_cliente (
    IN p_id_contato INT,
    IN p_usuario INT
)
BEGIN
    DECLARE v_nome_completo VARCHAR(255);

    -- Capturar o dado antigo para o log
    SELECT nome_completo INTO v_nome_completo
    FROM contato_cliente
    WHERE id_contato = p_id_contato;

    -- Deletar o contato
    DELETE FROM contato_cliente
    WHERE id_contato = p_id_contato;

    -- Inserir log
    INSERT INTO logs (tabela_afetada, operacao, id_registro, usuario, descricao)
    VALUES (
        'contato_cliente', 
        'deletar', 
        p_id_contato, 
        p_usuario, 
        CONCAT('Deletado contato: ', v_nome_completo)
    );
END $$

DELIMITER ;


