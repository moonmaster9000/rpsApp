const RPSApp = require("../src/RPSApp")
const {NgModule} = require("@angular/core")
const {BrowserModule} = require("@angular/platform-browser")
const {FormsModule} = require("@angular/forms")
const {platformBrowserDynamic} = require("@angular/platform-browser-dynamic")
const { UseCaseFactory } = require("rps")

const webSpecs = require("webSpecs")

webSpecs(
    (useCases)=> {
        let RPSTestModule = NgModule({
            imports: [BrowserModule, FormsModule],
            declarations: [RPSApp],
            bootstrap: [RPSApp],
            providers: [{provide: UseCaseFactory, useValue: useCases}]
        }).Class({
            constructor(){
            }
        })

        platformBrowserDynamic().bootstrapModule(RPSTestModule)
    },
    ()=> {
        document.getElementsByTagName("rps-app")[0].innerHTML = ""
    }
)