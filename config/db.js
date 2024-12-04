const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      timezone: "Z",
      charset: "utf8mb4",
      multipleStatements: true
    });

    this.pool.on("connection", (connection) => {
      console.log(
        `Conexão estabelecidade com o banco de dados Licite Aqui: ${connection.threadId}`
      );
    });

    this.pool.on("release", (connection) => {
      console.log(
        `Conexão com o banco de dados Licite Aqui Liberada: ${connection.threadId}`
      );
    });

    this.pool.on("enqueue", (connection) => {
      console.log(
        "Aguardando Conexão Disponível com o banco de dados Licite Aqui:"
      );
    });
  }

  async getConnection() {
    try {
        const connection = await this.pool.getConnection(); 
        console.log("Conectado ao banco de dados Licite Aqui");
        return connection;
    } catch (error) {
        this.handleError(error, "Erro ao conectar ao banco de dados Licite Aqui");
    }
}

async query(sql, params) {
  let connection;
  try {
      connection = await this.getConnection();
      const [results] = await connection.query(sql, params);
      return results;
  } catch (error) {
      this.handleError(error, "Erro ao executar a consulta SQL");
  } finally {
      if (connection) connection.release(); 
  }
}

async transaction(queries) {
  const connection = await this.getConnection();
  try {
      await connection.beginTransaction();
      for (const { sql, params } of queries) {
          await connection.query(sql, params);
      }
      await connection.commit();
      return { success: true };
  } catch (error) {
      await connection.rollback();
      this.handleError(error, "Erro na transação SQL");
  } finally {
      if (connection) connection.release(); 
  }
}


  handleError(error, message) {
    console.error(`${message}`, error);
    throw new Error(message);
  }
}

const db = new Database();

module.exports = db;
