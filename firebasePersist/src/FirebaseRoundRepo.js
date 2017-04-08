const { Round } = require("rps")

function FirebaseRoundRepo(firebase, databaseName){
  this.save = function(round){
    return new Promise(function(resolve) {
      const sanitizedRound = stripUndefinedProperties(round)
      getDatabaseRef().push(sanitizedRound).then(resolve)
    })
  }

  this.empty = function(){
    return new Promise(function(resolve) {
      getDatabaseRef().once('value').then(function(snapshot) {
        const savedRounds = snapshot.val();
        const isEmpty = savedRounds === null;
        resolve(isEmpty);
      })
    })
  }

  this.getAll = function() {
    return new Promise(function(resolve) {
      getDatabaseRef().once('value').then(function (snapshot) {
        let rounds = []

        snapshot.forEach(function (child) {
          const childValue = child.val();
          rounds.push(new Round(
            childValue.p1Throw,
            childValue.p2Throw,
            childValue.winner
          ))
        })

        resolve(rounds)
      });
    });
  }

  function getDatabaseRef() {
    return firebase.database().ref(databaseName + '/rounds/')
  }
}

function stripUndefinedProperties(round) {
  return JSON.parse(JSON.stringify(round))
}

module.exports = FirebaseRoundRepo