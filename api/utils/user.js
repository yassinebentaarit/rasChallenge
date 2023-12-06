const isSameUser = (req, id) => req.payload.user._id === id;

const canDeleteUser = (req, id) => isSameUser(req, id) || isSuperAdmin(req);

const canUpdateUser = (req, id) => isSameUser(req, id) || isSuperAdmin(req);

module.exports = {
    canDeleteUser,
    canUpdateUser,
    isSameUser
};