// Settings for API endpoint routes. Using proxy!
export default ({
    getAllAvaileable:'/items/',
    getItem: "/items/getitem",
    insertItem:"/items/insert",
    modifyItem:"/items/modify",
    deleteItem:"/items/delete",
    login: "/login",
    logout: "/logout",
    register: "/register/",
    usernameAvailable: "/register/available",
    getCategories:"/items/category",
    getOwner:"/items/owner",
    getAddress:"/items/address",
    updatePassword:"/user/modify",
    getUserRents:"/items/rent",
    getAllRents:"/items/rent/all",
    reserveInsert:"/items/reserve/insert",
    reserveModify:"/items/reserve/modify",
    reserveDelete:"/items/reserve/delete",
    rentInsert:"/items/rent/insert",
    rentModify:"/items/rent/modify",
    rentReturn:"/items/rent/return",
    rentReturnReserved:"/items/rent/returnreserved"
});
/*
*                   PARAMETERS
* reserveInsert
* user_id
* item_id
* reservation_start
* reservation_end
*
* reserveModify
* id = reservation_rent row id
* user_id
* item_id = for availability check
* reservation_start
* reservation_end
*
* reserveDelete
* id = reservation_rent row id
*
* rentInsert
* id = reservation_rent row id
* item_id = for availability check
* start_date
* end_date
*
* rentModify
* id = reservation_rent row id
* item_id = for availability check
* start_date  = for availability check
* end_date
*
* rentReturn
* id
*
* rentReturnReserved
* id = reservation_rent row id
*
* */