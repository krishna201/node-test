const config = {
    app: {
        port: 4444,
        adminHost: 'http://localhost:4444/'
    },
    database: {
        db: 'newtestdb',
        username: 'postgres',
        password: 'GuestlineDb123#$',
        host: `192.168.43.242`, //'192.168.43.128',
        port: 5432
    },
};

module.exports = config;