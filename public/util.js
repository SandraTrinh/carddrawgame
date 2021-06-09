export{getRndInteger};

//return a random integer between min and max
// inclusive min, exclusive max
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  };