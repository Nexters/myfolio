function SessionService() {
    if(!(this instanceof SessionService)) {
        return new SessionService();
    }
}

SessionService.prototype.hasSession = function(req) {
    return (typeof req.session !== "undefined" && typeof req.session.userId !== "undefined");
};

SessionService.prototype.getSession = function(req) {
    var data = {
        userId: req.session.userId,
        userName: req.session.userName
    };
    return data;
};

SessionService.prototype.registerSession = function(req, id, name) {
    req.session.userId = id;
    req.session.userName = name;
};

SessionService.prototype.removeSession = function(req) {
    req.session.destroy();
};

module.exports = SessionService;


