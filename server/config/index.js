var config = {
    local: {
        mode: 'local',
        port: 2014,
        db: {
            host: '127.0.0.1',
            port: 3306
        }
    }
};

module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
};