import settings from './Components/Settings';

class Auth { // Class to control user access to main page.
    constructor() {
        this.authenticated = false;
        this.username = "";
        this.admin = false;
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
                        if (result[0]) {
                            this.admin = result[0].admin;
                            this.authenticated = true;
                            this.username = result[0].username;
                            resolve(true);
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
                    reject("Logout failed");
                }

            }).catch(err => console.log(err));
        });

    }

    isAuthenticated() {
        return new Promise((resolve, reject) => {
            if (this.authenticated) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

    isAuthenticatedBool() {
        if (this.authenticated) {
            return true
        } else {
            return false
        }
    }

    isAdmin(){
        return this.admin;
    }

    getUsername() {
        return this.username;
    }
}

export default new Auth();