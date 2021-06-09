export {cardView, shuffView, emptyView}

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