"use strict";

class UserStorage {
    static #users = {
        id: ["nimkoes", "admin", "potato"],
        psword: ["1234", "1234", "123456"],
        names: ["감자", "고구마", "가지"]
    };

    static getUsers(...fields) {
        const users = this.#users;

        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});

        return newUsers;
    }
}

module.exports = UserStorage;
