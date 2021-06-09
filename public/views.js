export {cardView, shuffView, emptyView, countDeckView}

function applyTemplate (targetid, templateid, data){
    let target = document.getElementById(targetid);

    let template = Handlebars.compile(
        document.getElementById(templateid).textContent
    )

    target.innerHTML = template(data);
}

function cardView (targetid, card) {
    applyTemplate(targetid,"cardView", card);
}

function shuffView() {
    let target = document.getElementById("target");
    target.innerHTML = "<p>Deck is Shuffled and reset!</p>"
}

function emptyView() {
    let target = document.getElementById("target");
    target.innerHTML = "<p>Deck is Empty</p>"
}

function countDeckView(targetid, countDeck) {
    let target = document.getElementById(targetid);
    target.innerHTML = "<p>Cards in DECK: </p><p>";
    target.innerHTML += countDeck;
    target.innerHTML += "/54 </p>";
}