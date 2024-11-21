CREATE VIEW vw_documentos_licitacao AS
SELECT
    dl.id_doc_licitacao,
    dl.id_documento,
    dl.num_licitacao,
FROM
    documentos_licitacao
JOIN 
    licitacoes l ON dl.num_licitacao = l.num_licitacao;