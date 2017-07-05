<template>
  <div>
    <h1>{{ message }}</h1>

    <form @submit.prevent="onSubmit">
         <input type="text" name="p1" id="p1ThrowInput" v-model="p1" >
         <input type="text" name="p2" id="p2ThrowInput" v-model="p2" >

         <button id="playButton" type="submit">Play</button>
    </form>

    <ul>
        <li v-for="round in history">{{round.p1Throw}} {{round.p2Throw}} {{round.winner}}</li>
    </ul>
  </div>
</template>

<script>
const Locale = require("rpsPresentationI18n")

module.exports = {
  inject: [
    "useCases"
  ],

  data: function() {
      return {
          message: "",
          p1: "",
          p2: "",
          history: [],
          locale: new Locale()
      }
  },

  created: function() {
      this.updateHistory()
  },

  methods: {

    updateHistory() {
        this.useCases.history(this)
    },

    onSubmit(e){
        this.useCases.play(this.p1, this.p2, this)
    },

    invalid(){
        this.message = this.locale.t("invalid")
        this.updateHistory()
    },

    p1Wins(){
        this.message = this.locale.t("p1_wins")
        this.updateHistory()
    },

    p2Wins(){
        this.message = this.locale.t("p2_wins")
        this.updateHistory()
    },

    tie(){
        this.message = this.locale.t("tie")
        this.updateHistory()
    },

    rounds(rs){
        this.history = rs
    },

    norounds(){
        this.history = []
    }
  }
}

</script>
