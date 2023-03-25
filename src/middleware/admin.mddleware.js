const isAdmin = (req, res, next) => {
    if (req.user.username === "anto@anto.com") {
        return next();
    } else {
        return res.render("noPermission");
    }
};

export default isAdmin;