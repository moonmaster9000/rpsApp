function history(ui, repo) {
    repo.empty()
        .then((isEmpty)=> {
            if (isEmpty) {
                ui.norounds()
            } else {
                repo.getAll()
                    .then((rounds)=> {
                        ui.rounds(rounds)
                    })
            }
        })
}

module.exports = history