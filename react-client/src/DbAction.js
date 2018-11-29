import settings from './Components/Settings';

class DbAction { // Class to control user access to main page.
    constructor() {
        this.itemData = [];
        this.itemToModifyId="";
    }

    fetchItems(id, name, brand,model, info, address, owner, category) {
        return new Promise((resolve, reject) => {
                fetch(settings.getAllAvaileable, {
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
                    })
                }).then(result => result.json())
                    .then((result) => {
                        resolve(result);
                    })
                    .catch(() => {
                        reject("Fetching failed!")
                    });
        });
    }

    getItem(id) {
        return new Promise((resolve, reject) => {
            fetch(settings.getItems, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": id
                })
            }).then(result => result.json())
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err)
                });
        });
    }

    insertItem(name,  brand,model, info, address, owner, category) {
        console.log(name,address,owner);
        return new Promise((resolve, reject) => {
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

        });
    }

    modifyItem(id,name, brand,model, info, address, owner, category) {
        return new Promise((resolve, reject) => {
                fetch(settings.modifyItem, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "id": id,
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
                        resolve(result);
                    })
                    .catch(() => {
                        reject("Item modify failed")
                    });

        });
    }

    deleteItem(id) {
        return new Promise((resolve, reject) => {
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

        });
    }

    getDropdownInfo(){
        const dropdownData = {};
        return new Promise((resolve, reject) => {
                fetch(settings.getAddress, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                }).then(result => result.json())
                    .then((result) => {
                        dropdownData.address = result;
                    })
                    .catch(() => {
                        reject("Fetching addresses failed!")
                    });

                fetch(settings.getCategories, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                }).then(result => result.json())
                    .then((result) => {
                        dropdownData.category = result;
                    })
                    .catch(() => {
                        reject("Fetching categories failed!")
                    });

                fetch(settings.getOwner, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                }).then(result => result.json())
                    .then((result) => {
                        dropdownData.owner = result;
                        resolve(dropdownData);
                    })
                    .catch(() => {
                        reject("Fetching owners failed!")
                    });

        });
    }

    updatePassword(username,password,newPassword){
        return new Promise((resolve, reject) => {
                fetch(settings.updatePassword, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "username":username,
                        "password": password,
                        "newPassword":newPassword
                    }),
                })
                    .then(result => result.json())
                    .then(result => {
                        resolve(result);
                    })
                    .catch(() => {
                        reject("Password update failed")
                    });

        });
    }

    fetchUserRents(username) {
        return new Promise((resolve, reject) => {
                fetch(settings.getUserRents, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "username": username || "",

                    })
                }).then(result => result.json())
                    .then((result) => {
                        resolve(result);
                    })
                    .catch(() => {
                        reject("Fetching user rents failed!")
                    });
        });
    }

    fetchAllRents(search) {
        return new Promise((resolve, reject) => {
                fetch(settings.getAllRents, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "id": search.text || "",
                        "name": search.text || "",
                        "model": search.text || "",
                        "brand": search.text || "",
                        "address": search.address || "",
                        "owner": search.owner || "",
                        "category": search.category || ""

                    })
                }).then(result => result.json())
                    .then((result) => {
                        resolve(result);
                    })
                    .catch(() => {
                        reject("Fetching user rents failed!")
                    });
        });
    }

    rentInsert(reservation_id,item_id,start_date,end_date) {
        return new Promise((resolve, reject) => {
                fetch(settings.rentInsert, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "id": reservation_id,
                        "item_id":item_id,
                        "start_date": start_date ,
                        "end_date": end_date
                    }),
                })
                    .then(result => result.json())
                    .then(result => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
        });
    }

    rentModify(reservation_id,item_id,start_date,end_date) {
        return new Promise((resolve, reject) => {
            fetch(settings.rentModify, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": reservation_id,
                    "item_id":item_id,
                    "start_date": start_date ,
                    "end_date": end_date
                }),
            })
                .then(result => result.json())
                .then(result => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    rentReturn(reservation_id) {
        return new Promise((resolve, reject) => {
            fetch(settings.rentReturn, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": reservation_id
                }),
            })
                .then(result => result.json())
                .then(result => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    rentReturnReserved(reservation_id) {
        return new Promise((resolve, reject) => {
            fetch(settings.rentReturnReserved, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": reservation_id
                }),
            })
                .then(result => result.json())
                .then(result => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    reservationInsert(user_id,item_id,reservation_start,reservation_end) {
        return new Promise((resolve, reject) => {
            fetch(settings.reserveInsert, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_id": user_id,
                    "item_id":item_id,
                    "reservation_start": reservation_start,
                    "reservation_end": reservation_end
                }),
            })
                .then(result => result.json())
                .then(result => {
                    resolve(result);
                })
                .catch(() => {
                    reject("Reserving item failed")
                });
        });
    }
    reservationModify(id,user_id,item_id,reservation_start,reservation_end) {
        return new Promise((resolve, reject) => {
            fetch(settings.reserveModify, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id":id,
                    "user_id": user_id,
                    "item_id":item_id,
                    "reservation_start": reservation_start,
                    "reservation_end": reservation_end
                }),
            })
                .then(result => result.json())
                .then(result => {
                    resolve(result);
                })
                .catch(() => {
                    reject("Modifying reservation item failed")
                });
        });
    }

    reservationDelete(id) {
        return new Promise((resolve, reject) => {
            fetch(settings.reserveDelete, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id":id
                }),
            })
                .then(result => result.json())
                .then(result => {
                    resolve(result);
                })
                .catch(() => {
                    reject("Deleting reservation failed")
                });
        });
    }
}

export default new DbAction();