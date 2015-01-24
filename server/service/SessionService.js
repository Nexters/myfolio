'use strict';

function SessionService() {
    if (!(this instanceof SessionService)) {
        return new SessionService();
    }
}

SessionService.prototype.hasSession = function (req) {
    return (typeof req.session !== "undefined" && typeof req.session.userId !== "undefined");
};

SessionService.prototype.getSession = function (req) {
    var data = {
        userId: req.session.userId,
        userName: req.session.userName
    };
    return data;
};

SessionService.prototype.registerSession = function (req, id, name, portfolio) {
    req.session.userId = id;
    req.session.userName = name;
};


SessionService.prototype.removeSession = function (req) {
    req.session.destroy();
};

/**
 * makeUserSessionData
 * - content Object에 userId, userName 추가
 * @param req
 * @param {JSONObject} content
 * @returns {boolean} : session 있을 때 true, 없을 때 false
 */
SessionService.prototype.makeUserSessionData = function (req, content) {
    var hasSessionResult = false;
    if (this.hasSession(req)) {
        content.userId = req.session.userId;
        content.userName = req.session.userName;
        content.isLogin = true;
        hasSessionResult = true;
    } else {
        content.isLogin = false;
        hasSessionResult = false;
    }
    return hasSessionResult;
};

/**
 * hasUserAuthority
 * - 다른 사람 포트폴리오 수정하지 못하도록 권한 검사
 * @param req
 * @returns {boolean}
 */
SessionService.prototype.hasUserAuthority = function (req) {
    return (req.params.id && (req.params.id === req.session.userId));
};

module.exports = SessionService;


