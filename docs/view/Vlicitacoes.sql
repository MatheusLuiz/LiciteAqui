CREATE VIEW vw_licitacoes AS
SELECT
    id_licitacao,
    num_licitacao,
    modalidade,
    orgao,
    portal,
    numero_identificacao,
    objeto,
    cidade,
    status_licitacao,
    estado,
    data_licitacao,
    data_cadastro_licitacao
FROM
    licitacoes;