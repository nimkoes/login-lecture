"use strict";

const db = require("../config/db");

class UserStorage {
    static getUserInfo(id) {
        // Promise 는 처리하는 데 시간이 필요한 내용을 넣을 때 사용
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?;";

            db.query(query, [id], (err, data) => {
                if(err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";

            db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => {
                if(err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = UserStorage;
