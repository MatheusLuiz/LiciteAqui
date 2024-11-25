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
const statusLicitacaoRoute = require('./routes/statusLicitacaoRoute')
const servicoClienteRoute = require('./routes/servicoClienteRoute');
const modalidadeRoute = require('./routes/modalidadeRoute');
const contatoClienteRoute = require('./routes/contatoClienteRoute');
const licitacaoRoute= require('./routes/licitacaoRoute');
const documentolicitacaoRoute = require('./routes/documentoLicitacaoRoute');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(cors({
  origin: 'http://localhost:8081' 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/cliente', clienteRoute);
app.use('/tipoTelefone', tipoTelefoneRoute);
app.use('/tipoServico', tipoServicoRoute);
app.use('/tipoDocumetno', tipoDocumentoRoute);
app.use('/StatusCliente', statusClienteRoute);
app.use('/StatusLicitacao', statusLicitacaoRoute);
app.use('/modalidade', modalidadeRoute);
app.use('/servicoCliente', servicoClienteRoute);
app.use('/contatoCliente', contatoClienteRoute);
app.use('/licitacao', licitacaoRoute);
app.use('/documentolicitacao', documentolicitacaoRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

module.exports = app;
