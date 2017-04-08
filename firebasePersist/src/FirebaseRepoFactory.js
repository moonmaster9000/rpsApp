const FirebaseRoundRepo = require("./FirebaseRoundRepo")
const firebase = require("firebase")

let fb;

function provideFirebaseRepoFactory(apiKey, databaseURL, databaseNameOrProvider) {
  const FirebaseRepoFactory = function(){
    this.roundRepo = function(){
      if (fb === null || fb === undefined) {
        fb = firebase.initializeApp({
          apiKey: apiKey,
          databaseURL: databaseURL
        });
      }

      const databaseName = typeof databaseNameOrProvider === 'string' ?
        databaseNameOrProvider :
        databaseNameOrProvider()

      round = new FirebaseRoundRepo(fb, databaseName)

      return round
    }
  }

  return FirebaseRepoFactory
}

module.exports = provideFirebaseRepoFactory