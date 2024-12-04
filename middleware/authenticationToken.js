const jwt = require("jsonwebtoken");
const UserModel = require("../models/loginModel");
const { redirectToLogin } = require("./redirectLogin");

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      console.warn("Token não encontrado.");
      return redirectToLogin(
        res,
        "Acesso não autorizado. Token não encontrado."
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.info("Token decodificado com sucesso.");
    } catch (err) {
      console.error("Erro ao verificar o token:", err.message);
      return redirectToLogin(res, "Token inválido ou expirado.");
    }

    const { username } = decoded;

    if (!username) {
      console.warn("Username ausente no payload do token.");
      return redirectToLogin(
        res,
        "Acesso não autorizado. Dados inválidos no token."
      );
    }

    const user = await UserModel.findByUsername(username);

    if (!user) {
      console.warn(
        `Usuário com username "${username}" não encontrado no banco.`
      );
      return redirectToLogin(res, "Usuário não encontrado.");
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Erro no middleware de autenticação:", err.message);
    return redirectToLogin(
      res,
      "Erro interno ao autenticar. Tente novamente mais tarde."
    );
  }
};

module.exports = authenticateToken;
