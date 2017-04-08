const RPSApp = require("./src/RPSApp")
const {NgModule} = require("@angular/core")
const {BrowserModule} = require("@angular/platform-browser")
const {FormsModule} = require("@angular/forms")
const {platformBrowserDynamic} = require("@angular/platform-browser-dynamic")
const { UseCaseFactory } = require("rps")
const { provideFirebaseRepoFactory } = require("firebasePersist")

let FirebaseRepoFactory = provideFirebaseRepoFactory(
  "AIzaSyA811T0l1_v1utC7d8DFpZcYMlNfJC9nfo",
  "https://rpstest-f3cba.firebaseio.com",
  "testing123"
)

let RPSTestModule = NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [RPSApp],
    bootstrap: [RPSApp],
    providers: [{provide: UseCaseFactory, useValue: new UseCaseFactory(new FirebaseRepoFactory())}]
}).Class({
    constructor(){
    }
})

platformBrowserDynamic().bootstrapModule(RPSTestModule)
