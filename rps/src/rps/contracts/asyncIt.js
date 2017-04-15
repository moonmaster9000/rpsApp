module.exports = function asyncIt(description, asyncFun){
    it(description, function(done){
        asyncFun().then(done, e=> {
            fail(e);
            done();
        })
    })
}
