const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute');
const clienteRoute = require('./routes/clienteRoute');
const tipoTelefoneRoute = require('./routes/tipoTelefoneRoute');
const tipoServicoRoute = require('./routes/tipoServicoRoute');
const tipoDocumentoRoute = require('./routes/tipoDocumentoRoute');
const statusClienteRoute = require('./routes/statusClienteRoute');
const statusLicitacaoRoute = require('./routes/statusLicitacaoRoute');
const servicoClienteRoute = require('./routes/servicoClienteRoute');
const modalidadeRoute = require('./routes/modalidadeRoute');
const contatoClienteRoute = require('./routes/contatoClienteRoute');
const licitacaoRoute = require('./routes/licitacaoRoute');
const documentolicitacaoRoute = require('./routes/documentoLicitacaoRoute');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(cors({}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/login', loginRoute);
app.use('/user', authenticateToken, userRoute);
app.use('/cliente', authenticateToken, clienteRoute);
app.use('/tipoTelefone', authenticateToken, tipoTelefoneRoute);
app.use('/tipoServico', authenticateToken, tipoServicoRoute);
app.use('/tipoDocumento', authenticateToken, tipoDocumentoRoute);
app.use('/statusCliente', authenticateToken, statusClienteRoute);
app.use('/statusLicitacao', authenticateToken, statusLicitacaoRoute);
app.use('/modalidade', authenticateToken, modalidadeRoute);
app.use('/servicoCliente', authenticateToken, servicoClienteRoute);
app.use('/contatoCliente', authenticateToken, contatoClienteRoute);
app.use('/licitacao', authenticateToken, licitacaoRoute);
app.use('/documentolicitacao', authenticateToken, documentolicitacaoRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/home', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/clientes', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'clientes.html'));
});

app.get('/licitacao', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'licitacao.html'));
});

app.get('/configuracao', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'configuracao.html'));
});

app.get('/logout', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'logout.html'));
});

module.exports = app;