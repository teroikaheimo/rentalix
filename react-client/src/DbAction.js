import settings from './Components/Settings';
import auth from './Auth';

class DbAction { // Class to control user access to main page.
    constructor() {
        this.itemData = [];
        this.itemToModifyId="";
    }

    fetchItems(id, name, model, brand, info, address, owner, category) {
        return new Promise((resolve, reject) => {
            if (auth.isAuthenticated()) {
                fetch(settings.getItems, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "id": id || "",
                        "name": name || "",
                        "model": model || "",
                        "brand": brand || "",
                        "itemInfo": info || "",
                        "address": address || "",
                        "owner": owner || "",
                        "category": category || ""
                    }),
                })
                    .then(result => result.json())
                    .then(result => {
                        this.itemData = result
                    })
                    .then(() => {
                        resolve(true);
                        console.log(this.itemData);
                    })
                    .catch(() => {
                        reject(false)
                    });
            } else {
                reject(false)
            }
        });
    }

    getItems(id, name, model, brand, info, address, owner, category) {
        return new Promise((resolve, reject) => {
            this.fetchItems(id, name, model, brand, info, address, owner, category)
                .then(() => {
                    resolve(this.itemData)
                })
                .catch(() => {
                    reject(false)
                })
        });
    }

    insertItem(name, model, brand, info, address, owner, category) {
        return new Promise((resolve, reject) => {
            if (auth.isAuthenticated()) {
                fetch(settings.insertItem, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": name || "",
                        "model": model || "",
                        "brand": brand || "",
                        "itemInfo": info || "",
                        "address": address || "",
                        "owner": owner || "",
                        "category": category || ""
                    }),
                })
                    .then(result => result.json())
                    .then(result => {
                        this.itemData = result
                    })
                    .then(() => {
                        resolve(true);
                    })
                    .catch(() => {
                        reject(false)
                    });
            } else {
                reject(false)
            }
        });
    }

    modifyItem(name, model, brand, info, address, owner, category) {
        return new Promise((resolve, reject) => {
            if (auth.isAuthenticated()) {
                fetch(settings.modifyItem, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": name || "",
                        "model": model || "",
                        "brand": brand || "",
                        "itemInfo": info || "",
                        "address": address || "",
                        "owner": owner || "",
                        "category": category || ""
                    }),
                })
                    .then(result => result.json())
                    .then(result => {
                        this.itemData = result
                    })
                    .then(() => {
                        resolve(true);
                    })
                    .catch(() => {
                        reject(false)
                    });
            } else {
                reject(false)
            }
        });
    }

    deleteItem(id) {
        return new Promise((resolve, reject) => {
            if (auth.isAuthenticated()) {
                fetch(settings.deleteItem, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "id": id || ""
                    }),
                })
                    .then(result => result.json())
                    .then(result => {
                        this.itemData = result
                    })
                    .then(() => {
                        resolve(true);
                    })
                    .catch(() => {
                        reject(false)
                    });
            } else {
                reject(false)
            }
        });
    }

    setItemToModify(id){
        this.itemToModifyId = id;
    }

    getItemToModify(){
        return new Promise((resolve)=>{resolve(this.itemToModifyId)});
    }

    // TODO GET all unique categories for dropdown

    // TODO GET all unique owners for dropdown
}

export default new DbAction();