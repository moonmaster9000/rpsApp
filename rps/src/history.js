async function history(ui, repo) {
    if (await repo.empty()) {
        ui.norounds()
    } else {
        ui.rounds(await repo.getAll())
    }
}

module.exports = history