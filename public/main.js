import {Model} from './model.js'
import * as View from '/views.js'

window.addEventListener("modelUpdated",function(e){
    binding();
    
});

function binding() {
    //shuff button
    let shuffButton = document.getElementById("shuff");
    shuffButton.onclick = shuffButtonHandler;

    //draw button
    let drawButton = document.getElementById("draw");
    drawButton.onclick = drawButtonHandler;

    //refresh button
    let refreshButton = document.getElementById("refresh");
    refreshButton.onclick = refreshButtonHandler;
};

function shuffButtonHandler(event) {
    Model.shuff();
};

function refreshButtonHandler() {
    Model.updateDeck();
    View.refreshView();
    console.log("refresh page! Updata local deck database.");
    let countNum = Model.getCountDeck();
    View.countDeckView("deckCount",countNum);
};

function drawButtonHandler(event) {
    let card = Model.drawCard();
    if (card) {
        View.cardView("target",card[0]);
    } else {
        View.emptyView();
    }
};

window.addEventListener("cardIsDrawn", function(e){
    let countNum = Model.getCountDeck();
    View.countDeckView("deckCount",countNum);
});

window.addEventListener("countUpdated", function(e){
    
});

window.addEventListener("deckIsReset!", function(e){
    View.shuffView();
    let countNum = Model.getCountDeck();
    View.countDeckView("deckCount",countNum);
    console.log("Deck is Reset!");
});

window.onload = function() {
    Model.updateDeck();
    let countNum = Model.getCountDeck();
    View.countDeckView("deckCount",countNum);
};