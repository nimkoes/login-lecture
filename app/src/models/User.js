"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }
    
    async login() {
        const client = this.body;

        try {
            // await 은 .getUserInfo 가 반환하는 객체가 Promise 이기 때문에, 결과를 받아 올 떄까지 기다리게 함
            const user = await UserStorage.getUserInfo(client.id);

            if(user) {
                if(user.id === client.id && user.psword === client.psword) {
                    return { success: true };
                }
                return  { success: false, msg: "비밀번호가 틀렸습니다." }
            }
            return { success: false, msg: "존재하지 않는 아이디입니다." }

        } catch (err) {
            return { success: false, err };
        }
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = User;
