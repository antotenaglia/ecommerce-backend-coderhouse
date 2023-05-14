const isAdmin = (req, res, next) => {
    if (req.query.username === "admin@admin.com") {   
        return next();
    } else {
        return res.render("noPermission");
    };
};

export default isAdmin;