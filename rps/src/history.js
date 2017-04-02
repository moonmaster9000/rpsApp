async function history(ui, repo) {
    let rounds = await repo.getAll()
    let empty = await repo.empty()

    if (empty) {
        ui.norounds()
    } else {
        ui.rounds(rounds)
    }
}

module.exports = history