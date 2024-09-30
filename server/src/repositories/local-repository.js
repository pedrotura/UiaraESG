const mysql = require('mysql2/promise');

const conectar = async () => {
    try {
        const con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectTimeout: 10000
        });
        console.log('Conexão com o banco de dados realizada com sucesso.');
        global.connection = con;
        return con;

    } catch (err) {
        console.log('Erro ao realizar conexão com o banco de dados.', err);
    }
}

exports.get = async () => {
    try {
        const con = await conectar();
        const [results, fields] = await con.query('SELECT * FROM locais');
        return results;
    } catch (err) {
        throw err;
    }
}

exports.create = async (data) => {
    try {
        const con = await conectar();
        con.query('INSERT INTO locais VALUES(?, ?, ?, ?)',
            [data.id_local, data.endereco, data.cidade, data.id_estado]);
    } catch (err) {
        throw err;
    }
}

exports.update = async (id, data) => {
    try {
        const con = await conectar();
        con.query('UPDATE locais SET endereco = ?, cidade = ?, id_estado = ? WHERE id_local = ?',
            [data.endereco, data.cidade, data.id_estado, data.id_local]);
    } catch (err) {
        throw err;
    }
}

process.on('SIGINT', () => {
    con.end((err) => {
        if (err) {
            console.log('Erro ao finalizar conexão com o banco de dados.', err);
        } else {
            console.log('Conexão ao banco de dados finalizada com sucesso.');
        }
    });
});