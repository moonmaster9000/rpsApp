function history(ui, repo){
    if (repo.empty()){
        ui.norounds()
    } else {
        ui.rounds(repo.getAll())
    }
}

module.exports = history