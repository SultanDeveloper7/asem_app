import mysql from "mysql2/promise";

const createConn = async () => {
    const conn = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    return conn;
};

export default createConn;