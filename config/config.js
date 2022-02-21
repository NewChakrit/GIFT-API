module.exports = {
    development: {
        username: 'root',
        password: 'AofAof334455!',
        database: 'cc10_gift',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false,
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'lzp1r9l4abut5clr',
        password: 'fyvsgxfps5byaycn',
        database: 'wcahilngr47kt8vo',
        host: 'eanl4i1omny740jw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
