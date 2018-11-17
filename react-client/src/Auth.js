import settings from './Components/Settings';
class Auth { // Class to control user access to main page.
    constructor() {
        this.authenticated = false;
        this.username = "";
    }

    usernameAvailable(username) {
        return new Promise((resolve,reject)=>{
            fetch(settings.usernameAvailable, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username
                }),
            }).then(result => {
                if(result.ok){
                    resolve(result.ok);
                }else{reject(false);}
            }).catch(err => console.log(err));
        });
    }

    register(username, pwd, pwdCheck) {
        return new Promise((resolve,reject)=>{
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
                })
                    .then(result => {
                        if(result.ok){
                            resolve(true);
                        }else{reject(false)}
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
                        username: username,
                        password: password
                    }),
                }).then(result => {
                    if (result.ok) {
                        this.authenticated = true;
                        this.username = username;
                        resolve();

                    } else {
                        reject();
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
            }).then(result => {
                if (result.ok) {
                    this.authenticated = false;
                    resolve();
                } else {
                    reject();
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

    getUsername() {
        return this.username;
    }
}

export default new Auth();