const Vue = require("vue")
const RPSApp = require("./RPSApp.vue")
const {UseCaseFactory, FakeRepoFactory} = require("rps")

const useCases = new UseCaseFactory(new FakeRepoFactory())

new Vue({
    el: '#app',
    provide: { useCases },
    render: (createElement) => createElement(RPSApp)
})
