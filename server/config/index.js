var config = {
    local: {
        mode: 'local',
        port: 3000,
        db: {
            host: 'localhost',
            port: 3307,
            user: 'dev',
            password: 'asdf'
        }
    },
    test: {
        mode: 'local',
        port: 4000,
        db: {
            host: '127.0.0.1',
            port: 3307
        }
    }
};

module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
};