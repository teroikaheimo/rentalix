
module.exports = class Database{ // Wrapper for mysql to get promises.
    constructor(config){
        this.conf = config;
    }
    query(sql,args){
        console.log("Using Mock class query!!!!");
        return new Promise((resolve,reject)=>{
            Promise.resolve(
                {rows:[{username:"test",password:"test"}]}
                )});
    };
};