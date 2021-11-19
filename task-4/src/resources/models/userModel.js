class UserModel {
    constructor({
        _id = 'id',
        email = 'user@gmail.com',
        password = 'pas$$ord',
        role = 'user',
        createdAt = 'data',
        updatedAt = 'data',
    } = {}) {
        this.id = _id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static toResponse(user) {
        const {
            _id,
            email,
            role,
            createdAt
        } = user;

        return {
            _id,
            email,
            role,
            createdAt
        };
    }
}

module.exports = UserModel;
