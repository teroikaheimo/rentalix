import settings from './Components/Settings';

class Auth { // Class to control user access to main page.
    constructor() {
        this.username = "";
        this.authenticated = false;
        this.admin = false;
        this.userId ="";
        console.log("RESET");
    }

    usernameAvailable(username) {
        return new Promise((resolve, reject) => {
            fetch(settings.usernameAvailable, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username
                }),
            }).then(result => result.json())
                .then(result => {
                    if (result.success) {
                        resolve(result.success);
                    } else {
                        console.log(result);
                        reject(false);
                    }
                }).catch(err => console.log(err));
        });
    }

    register(username, pwd, pwdCheck) {
        return new Promise((resolve, reject) => {
            if (this.usernameAvailable(username) && username.length > 3 && (pwd === pwdCheck)) {
                fetch(settings.register, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: pwd
                    }),
                }).then(result => result.json())
                    .then(result => {
                        if (result.success) {
                            resolve(true);
                        } else {
                            reject(false)
                        }
                    }).catch(err => console.log(err));
            }
        });

    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            if (username.length > 3 && password.length > 3) {
                fetch(settings.login, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "username": username,
                        "password": password
                    })
                }).then(result => result.json())
                    .then(result => {
                        let sendResult={};
                        if (result[0]) {
                            this.admin = (result[0].admin === 1);
                            this.authenticated = true;
                            this.username = result[0].username;
                            this.userId = result[0].id;

                            sendResult.username = result[0].username;
                            sendResult.admin = (result[0].admin === 1);
                            sendResult.id = result[0].id;
                            resolve(sendResult);

                        } else if (result.logged) { // IF all ready logged in
                            this.admin = (result.admin === 1);
                            this.authenticated = true;
                            this.username = result.username;
                            this.userId = result.id;

                            sendResult.username = result.username;
                            sendResult.admin = (result.admin === 1);
                            sendResult.id = result.id;
                            resolve(sendResult);
                        } else {
                            reject(false);
                        }
                    }).catch(err => console.log(err));
            }
        });

    }

    logout() {
        return new Promise((resolve, reject) => {
            fetch(settings.logout, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(result => result.json())
                .then(result => {
                    if (result.success) {
                        this.authenticated = false;
                        resolve(true);
                    } else {
                        reject("logout failed");
                    }

                }).catch(err => console.log(err));
        });

    }

    isAuthenticated() {
        return new Promise((resolve, reject) => {
            fetch(settings.login, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            }).then(result => result.json())
                .then(result => {
                    if (result.logged) { // IF all ready logged in
                        this.admin = result.admin;
                        this.authenticated = true;
                        this.username = result.username;
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
        })
    }


    isAdmin() {
        return this.admin;
    }

    getUsername() {
        return this.username;
    }
}

export default new Auth();