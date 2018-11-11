jest.mock('../database');
const route = require("./register");
const mocData = {body:{"username":"test","password":"test"}};
const res = {};
const err = {};
test("Test inserting existing username",()=>{
    route('/').then(res =>{
        expect(res.body).toBe();
    })

});