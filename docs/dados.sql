INSERT INTO
    status_cliente (id_status, descricao)
VALUES
    (1, 'Ativo'),
    (2, 'Inativo'),
    (3, 'Suspenso');

INSERT INTO
    clientes (
        id_cliente,
        cnpj,
        razao_social,
        nome_fantasia,
        status,
        data_cadastro
    )
VALUES
    (
        1,
        '38055030122867',
        'Razão Social 1',
        'Nome Fantasia 1',
        1,
        '2022-11-13'
    ),
    (
        2,
        '23654963574042',
        'Razão Social 2',
        'Nome Fantasia 2',
        3,
        '2023-10-07'
    ),
    (
        3,
        '79383920489646',
        'Razão Social 3',
        'Nome Fantasia 3',
        2,
        '2021-04-21'
    ),
    (
        4,
        '21729404043157',
        'Razão Social 4',
        'Nome Fantasia 4',
        2,
        '2023-07-16'
    ),
    (
        5,
        '92431777955528',
        'Razão Social 5',
        'Nome Fantasia 5',
        2,
        '2020-09-12'
    );

INSERT INTO
    tipos_telefone (id_tipo_telefone, descricao)
VALUES
    (1, 'Celular'),
    (2, 'Residencial'),
    (3, 'Comercial');

INSERT INTO
    contato_cliente (
        id_contato,
        cliente,
        tipo_telefone,
        ddd,
        telefone,
        nome_completo,
        sexo,
        data_nascimento,
        cpf,
        email
    )
VALUES
    (
        1,
        1,
        1,
        '47',
        '85977083',
        'Contato 1',
        'Feminino',
        '2000-07-09',
        '11741956385',
        'contato1@email.com'
    ),
    (
        2,
        2,
        1,
        '42',
        '15035027',
        'Contato 2',
        'Masculino',
        '1998-09-15',
        '82986999379',
        'contato2@email.com'
    ),
    (
        3,
        1,
        2,
        '94',
        '27989346',
        'Contato 3',
        'Feminino',
        '1985-05-17',
        '00158484079',
        'contato3@email.com'
    ),
    (
        4,
        2,
        3,
        '43',
        '29746446',
        'Contato 4',
        'Feminino',
        '1990-08-08',
        '14367385893',
        'contato4@email.com'
    ),
    (
        5,
        4,
        2,
        '61',
        '67870176',
        'Contato 5',
        'Masculino',
        '1992-12-21',
        '58536850621',
        'contato5@email.com'
    );

INSERT INTO
    tipo_servico (id_tipo_servico, descricao)
VALUES
    (1, 'Consultoria'),
    (2, 'Manutenção'),
    (3, 'Desenvolvimento');

INSERT INTO
    servicos_cliente (id_servico, id_cliente, id_tipo_servico)
VALUES
    (1, 1, 1),
    (2, 2, 3),
    (3, 3, 3),
    (4, 4, 3),
    (5, 4, 3);

INSERT INTO
    usuarios (
        id_usuario,
        nome_completo,
        email,
        sexo,
        data_nascimento,
        data_cadastro,
        cpf
    )
VALUES
    (
        1,
        'Usuário 1',
        'usuario1@empresa.com',
        'Masculino',
        '1993-07-21',
        '2022-07-17',
        '95629731733'
    ),
    (
        2,
        'Usuário 2',
        'usuario2@empresa.com',
        'feminino',
        '1991-09-26',
        '2020-02-28',
        '27057710821'
    ),
    (
        3,
        'Usuário 3',
        'usuario3@empresa.com',
        'feminino',
        '1987-05-11',
        '2020-08-16',
        '43440211368'
    ),
    (
        4,
        'Usuário 4',
        'usuario4@empresa.com',
        'Masculino',
        '1990-08-28',
        '2021-06-14',
        '45418409358'
    ),
    (
        5,
        'Usuário 5',
        'usuario5@empresa.com',
        'Masculino',
        '1980-04-13',
        '2022-10-01',
        '92379118963'
    );

INSERT INTO
    login_usuarios (id_login, usuario, username, senha, data_cadastro)
VALUES
    (1, 1, 'usuario1', 'senha1', CURRENT_TIMESTAMP),
    (2, 2, 'usuario2', 'senha2', CURRENT_TIMESTAMP),
    (3, 3, 'usuario3', 'senha3', CURRENT_TIMESTAMP),
    (4, 4, 'usuario4', 'senha4', CURRENT_TIMESTAMP),
    (5, 5, 'usuario5', 'senha5', CURRENT_TIMESTAMP);

INSERT INTO
    status_licitacao (id_status, nome_status)
VALUES
    (1, 'Aberta'),
    (2, 'Encerrada'),
    (3, 'Cancelada');

INSERT INTO
    modalidade (id_modalidade, nome_modalidade)
VALUES
    (1, 'Pregão'),
    (2, 'Concorrência'),
    (3, 'Tomada de Preços');

INSERT INTO
    licitacoes (
        id_licitacao,
        num_licitacao,
        modalidade,
        orgao,
        portal,
        numero_identificacao,
        objeto,
        status_licitacao,
        cidade,
        estado,
        data_licitacao
    )
VALUES
    (
        1,
        'LIC00001',
        2,
        'Órgão 1',
        'portal1.gov.br',
        'ID-0001',
        'Objeto da licitação 1',
        1,
        'Cidade 1',
        'RS',
        '2023-07-01'
    ),
    (
        2,
        'LIC00002',
        1,
        'Órgão 2',
        'portal2.gov.br',
        'ID-0002',
        'Objeto da licitação 2',
        1,
        'Cidade 2',
        'MG',
        '2024-01-11'
    ),
    (
        3,
        'LIC00003',
        3,
        'Órgão 3',
        'portal3.gov.br',
        'ID-0003',
        'Objeto da licitação 3',
        1,
        'Cidade 3',
        'MG',
        '2022-07-23'
    );

INSERT INTO
    tipos_documentos (id_documento, descricao)
VALUES
    (1, 'Contrato'),
    (2, 'Ata'),
    (3, 'Edital');

INSERT INTO
    documentos_licitacao (id_doc_licitacao, id_documento, num_licitacao)
VALUES
    (1, 1, 'LIC00001'),
    (2, 2, 'LIC00002'),
    (3, 3, 'LIC00003');

