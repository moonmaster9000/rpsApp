const webSpecs = require("webSpecs")
const RPSApp = require("../RPSApp.vue")
const Vue = require("vue")

let vm

webSpecs(
    function createFixture() {
        const div = document.createElement("div")
        div.id = "vueApp"
        return div
    },

    function mountApp(useCases) {
        Vue.config.devtools = false
        Vue.config.productionTip = false
        vm = new Vue({
            el: "#vueApp",
            provide: { useCases },
            render: (createElement) => createElement(RPSApp)
        })
    },

    function teardown() {
      vm.$destroy()
      vm.$el.remove()
    }
)
