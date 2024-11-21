const db = require('../config/db'); 

class LoginModel {

    static async findByUsername(username) {
        const query = `SELECT * FROM vw_login_usuarios WHERE username = ? LIMIT 1`;
    
        try {
            const results = await this.executeQuery(query, [username]);

            if (!results || (Array.isArray(results) && results.length === 0)) {
                console.warn(`Nenhum resultado encontrado para o username: "${username}"`);
                return null;
            }

            const user = Array.isArray(results) ? results[0] : results;
    
            console.log('Resultados encontrados:', user);

            return user; 
        } catch (error) {
            console.error(`Erro ao buscar usuário por username:`, error.message);
            throw error;
        }
    }

    static async executeQuery(sql, params = []) {
        try {
            const [results] = await db.query(sql, params);
    
            if (!results) {
                return null;
            }
    
            return results; 
        } catch (error) {
            console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
            throw new Error(`Erro ao executar a consulta no banco de dados: ${error.message}`);
        }
    }
    
    
}

module.exports = LoginModel;
