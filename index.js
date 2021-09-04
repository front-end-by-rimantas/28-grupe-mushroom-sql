const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'your_database_name',
    });

    let sql = '';
    let rows = [];

    // LOGIC BELOW


}

app.init();

module.exports = app;