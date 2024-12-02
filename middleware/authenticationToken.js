const jwt = require("jsonwebtoken");
const LoginUsuarioModel = require("../models/loginModel");  // Atualizado para LoginUsuarioModel
const { redirectToLogin } = require("./redirectLogin");

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            console.warn("Token ausente no cookie.");
            return redirectToLogin(res, "Acesso não autorizado. Token não fornecido.");
        }

        console.log("Token recebido:", token);

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET não está definido. Verifique as variáveis de ambiente.");
            return redirectToLogin(res, "Erro interno no servidor.");
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decodificado:", decoded);

            const username = decoded.username;
            if (!username) {
                console.warn("Username não foi extraído corretamente do token.");
                return redirectToLogin(res, "Acesso não autorizado. Username inválido.");
            }

            // Buscar o usuário completo no banco de dados com base no username extraído do token
            const user = await LoginUsuarioModel.findByUsername(username);  // Atualizado para usar LoginUsuarioModel
            if (!user) {
                console.warn("Usuário não encontrado no banco de dados.");
                return redirectToLogin(res, "Usuário não encontrado");
            }

            console.log("Usuário encontrado no banco de dados:", user);

            req.user = user;
            next();
        } catch (err) {
            console.error("Erro ao verificar o token:", err.message);
            if (err.name === "TokenExpiredError") {
                return redirectToLogin(res, "Sessão expirada. Por favor, faça login novamente.");
            } else {
                return redirectToLogin(res, "Token inválido ou malformado.");
            }
        }
    } catch (err) {
        console.error("Erro no middleware de autenticação:", err.message);
        return redirectToLogin(res, "Erro interno ao autenticar.");
    }
};

module.exports = authenticateToken;
