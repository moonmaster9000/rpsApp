const {UseCaseFactory, FakeRepoFactory} = require("rps")
const RPSApp = require("./src/RPSApp")
const useCases = new UseCaseFactory(new FakeRepoFactory())

const element = document.getElementById('app')

RPSApp.render(element, useCases)
