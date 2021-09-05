class RedirectWithAuth {
    GoToIndexIfIsAuth(req, res, next) {
        if (req.isAuthenticated()) {
            return res.json({
                status : 304, 
                success : false,
                message : "صفحه اصلی"
            })
        }
        next();
    }
    GoToAuthIfNotAuth(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.json({
                status : 304, 
                success : false,
                message : "وارد حساب کاربری خود شوید"
            })
        }
        next();
    }
}

module.exports = new RedirectWithAuth()