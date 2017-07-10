const webSpecs = require("webSpecs")
const RPSApp = require("../src/RPSApp")

webSpecs(
    function createFixture() {
        const div = document.createElement("div")
        div.id = "elmApp"
        return div
    },

    function mountApp(useCases) {
      const div = document.getElementById("elmApp")
      RPSApp.render(div, useCases)
    },
)
