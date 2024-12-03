const jwt = require("jsonwebtoken");
const UserModel = require("../models/loginModel");
const { redirectToLogin } = require("./redirectLogin");

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.authToken; // Pega o token do cookie
        if (!token) {
            console.warn("Token ausente no cookie.");
            return redirectToLogin(res, "Acesso não autorizado. Token não fornecido.");
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next(); // Passa o controle para o próximo middleware ou rota
        } catch (err) {
            console.error("Erro ao verificar o token:", err.message);
            return redirectToLogin(res, "Token inválido ou expirado.");
        }
    } catch (err) {
        console.error("Erro no middleware de autenticação:", err.message);
        return redirectToLogin(res, "Erro interno ao autenticar.");
    }
};

module.exports = authenticateToken;
