function SessionService() {
    if(!(this instanceof SessionService)) {
        return new SessionService();
    }
}

SessionService.prototype.getSession = function(req) {
    var data = {
        userId: req.session.userId,
        userName: req.session.userName
    };
    return data;
};

SessionService.prototype.hasSession = function(req) {
    return (req.session && typeof req.session.userId !== "undefined");
};

SessionService.prototype.registerSession = function(req, id, name) {
    req.session.userId = id;
    req.session.userName = name;
};

module.exports = SessionService;


