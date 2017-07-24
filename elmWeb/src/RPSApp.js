const ElmWeb = require("../bundled/ElmWeb")
const Locale = require("rpsPresentationI18n")

const RPSApp = {
  render(element, useCases) {
    const app = ElmWeb.Main.embed(element)
    const locale = new Locale()

    const ui = {
      invalid: app.ports.invalid.send,
      tie: app.ports.tie.send,
      p1Wins: app.ports.p1Wins.send,
      p2Wins: app.ports.p2Wins.send,
      norounds: app.ports.norounds.send,
      rounds: app.ports.rounds.send,
    }

    app.ports.play.subscribe(([p1, p2]) => {
      useCases.play(p1, p2, ui)
    })

    app.ports.translate.subscribe((result) => {
      app.ports.message.send(locale.t(result))
    })

    app.ports.history.subscribe(() => {
      useCases.history(ui)
    })
  }
}

module.exports = RPSApp
