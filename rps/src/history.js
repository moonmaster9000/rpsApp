async function history(ui, repo) {
    if (await repo.empty()) {
        ui.norounds()
    } else {
        let rounds = await repo.getAll()
        ui.rounds(rounds)
    }
}

module.exports = history