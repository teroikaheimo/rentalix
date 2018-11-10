const {ru,ia} = require("./register");
const mocData = {"username":"test","password":"test"}

test("Test inserting existing username",()=>{
    expect(ru(mocData,res)).toBeFalsy();
});