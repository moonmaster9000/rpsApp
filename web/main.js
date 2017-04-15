const React = require("react")
const ReactDOM = require("react-dom")
const RPSApp = require("./RPSApp")
const { provideFirebaseRepoFactory } = require("firebasePersist")
const {UseCaseFactory} = require("rps")

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })
}

const FirebaseRepoFactory = provideFirebaseRepoFactory(
    "AIzaSyA811T0l1_v1utC7d8DFpZcYMlNfJC9nfo",
    "https://rpstest-f3cba.firebaseio.com",
    function() {
        return generateUUID()
    }
)

ReactDOM.render(
    <RPSApp useCases={new UseCaseFactory(new FirebaseRepoFactory())}></RPSApp>,
    document.getElementById("app")
)