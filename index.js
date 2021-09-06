const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'mushroom',
    });

    let sql = '';
    let rows = [];
    let i = 0;

    const upName = str => {
        return str[0].toUpperCase() + str.slice(1);
    }

    // LOGIC BELOW

    // 1
    sql = 'SELECT `mushroom`, `price` FROM `mushroom` ORDER BY `price` DESC';
    [rows] = await connection.execute(sql);

    console.log('Grybai:');
    for (const { mushroom, price } of rows) {
        console.log(`${++i}) ${upName(mushroom)} - ${price} EUR/kg`);
    }

    console.log('');
    // 2
    sql = 'SELECT `name` FROM `gatherer`';
    [rows] = await connection.execute(sql);

    const names = rows.map(obj => obj.name);
    console.log(`Grybautojai: ${names.join(', ')}.`);

    console.log('');
    // 3
    sql = 'SELECT `mushroom` \
            FROM `mushroom` \
            WHERE `price` = ( \
                SELECT MAX(`price`) FROM `mushroom` \
            )';
    [rows] = await connection.execute(sql);

    console.log(`Brangiausias grybas yra: ${upName(rows[0].mushroom)}.`);

    console.log('');
    // 4
    sql = 'SELECT `mushroom` \
            FROM `mushroom` \
            WHERE `price` = ( \
                SELECT MIN(`price`) FROM `mushroom` \
            )';
    [rows] = await connection.execute(sql);

    console.log(`Pigiausias grybas yra: ${upName(rows[0].mushroom)}.`);

}

app.init();

module.exports = app;