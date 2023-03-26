const isAdmin = (req, res, next) => {
    if (req.query.username === "anto@anto.com") {    //me falta un paso mas para que no se cambie desde el query
        return next();
    } else {
        return res.render("noPermission");
    }
};

export default isAdmin;