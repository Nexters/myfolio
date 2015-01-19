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

/**
 * makeUserSessionData : content Object에 userId, userName 추가
 * @param req
 * @param {JSONObject} content
 */
SessionService.prototype.makeUserSessionData = function(req, content) {
    if (this.hasSession(req)) {
        content.userId = req.session.userId;
        content.userName = req.session.userName;
    }
};

module.exports = SessionService;


