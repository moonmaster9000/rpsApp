const RPSApp = require("./src/RPSApp")
const {NgModule} = require("@angular/core")
const {BrowserModule} = require("@angular/platform-browser")
const {FormsModule} = require("@angular/forms")
const {platformBrowserDynamic} = require("@angular/platform-browser-dynamic")
const { UseCaseFactory, FakeRepoFactory } = require("rps")

let RPSTestModule = NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [RPSApp],
    bootstrap: [RPSApp],
    providers: [{provide: UseCaseFactory, useValue: new UseCaseFactory(new FakeRepoFactory())}]
}).Class({
    constructor(){
    }
})

platformBrowserDynamic().bootstrapModule(RPSTestModule)
