const { Round } = require("rps")
const PouchDB = require("pouchdb")

function PouchRepoFactory(dbName){
    this.roundRepo = function(){
        return new PouchRoundRepo(dbName || `roundRepoDb_${Math.random()}`)
    }
}

function PouchRoundRepo(dbName){
    let db = new PouchDB(dbName.toString())

    this.save = async function(round){
        return db.post(Object.assign({}, round))
    }

    this.empty = async function(){
        return (await this.getAll()).length === 0
    }

    this.getAll = async function(){
        let rounds = (await savedRoundRecords()).map(r => {
            return new Round(r.p1Throw, r.p2Throw, r.winner)
        })

        return rounds
    }

    async function savedRoundRecords() {
        return (await db.allDocs({include_docs: true})).rows.map(r => r.doc)
    }
}

module.exports = PouchRepoFactory