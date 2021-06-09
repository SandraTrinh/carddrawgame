export {Model};
import * as Util from './util.js'

const Model = {

  deckURL: '/decks',
  
  data: {
    deck: []
  },

  updateDeck: function() {
    fetch(this.deckURL)
    .then (
        function(response){
            //turn response into json and return it
            return response.json();
        }
    )
    .then (
        (data) => {
            //put updated post data from the database
            // into local post array
            this.data.deck = data;
            //create a model update event
            console.log(data);
            let event = new CustomEvent("modelUpdated");
            window.dispatchEvent(event);
        }
    )

  },

  updateCount: function(cardId, countNum) {
    fetch(this.deckURL+'/'+cardId,{
        method: 'PUT',
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify({
          count: Number(countNum)
        })
      })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Count updated this Card: ",data);
      this.updateDeck();
      let event = new CustomEvent("countUpdated");
      window.dispatchEvent(event)
    })
  },

  // reset the deck
  shuff: function() {
    this.updateCount(1,6);
    this.updateCount(2,12);
    this.updateCount(3,12);
    this.updateCount(4,12);
    this.updateCount(5,12);
    let event = new CustomEvent("deckIsReset!");
    window.dispatchEvent(event)
  },

  //is the card still in the deck?
  haveCard: function(cardId) {
    let haveTheCard = true;
    let card = this.getCard(cardId);
    if(card[0].count === 0){
      haveTheCard = false;
    }
    return haveTheCard;
  },

  //get the current number of cards left in the deck
  getCountDeck: function() {
    let count1 = 0;
    for(let i=0; i<this.data.deck.length; i++){
      count1 += this.data.deck[i].count;
    }
    return count1;
  },

  // //this check if the deck have cards or not
  // deckFull: function() {
  //   let full = false;
  //   for(let i=0; i<this.data.deck.length; i++){
  //     if (this.data.deck[i].count !== 0){
  //       full = true;
  //     }
  //   }
  //   return full;
  // },

  //decriment card count
  removeCard: function(cardId) {
    if(this.haveCard(cardId)){
      let card = this.getCard(cardId);
      let countNum = card[0].count;
      countNum --;
      this.updateCount(cardId,countNum);
    }
  },

  getCard: function(cardId) {
    let card = [];
    for(let i=0; i<this.data.deck.length; i++){
      if(this.data.deck[i].id === cardId){
        card.push(this.data.deck[i]);
      }
    }
    console.log("get card is: ", card);
    return card;
  },

  //draw a card
  drawCard: function() {
    //pick a card 1 to 5
    let cardid = Util.getRndInteger(1,6);
    
    //check if card is still in deck
    let flag = true;
    let full = false;
    for(let i=0; i<this.data.deck.length; i++){
      if (this.data.deck[i].count !== 0){
        full = true;
      }
    }
    if(full){
      while (flag){
        console.log("Random card id is: ", cardid);
        if(!this.haveCard(cardid)){
          console.log("card is not in deck!");
          cardid = Util.getRndInteger(1,6);
        } else {
          flag = false;
        }
      }

      this.removeCard(cardid);

      let event = new CustomEvent("cardIsDrawn");
      window.dispatchEvent(event)
      return this.getCard(cardid);
    } else {
      return null;
    } 
  }

}