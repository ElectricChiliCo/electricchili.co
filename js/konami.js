// a key map of allowed keys
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};

// the 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
  // get the value of the key code from the key map
  var key = allowedKeys[e.keyCode];
  // get the value of the required key from the konami code
  var requiredKey = konamiCode[konamiCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {

    // move to the next key in the konami code sequence
    konamiCodePosition++;

    // if the last key is reached, activate cheats
    if (konamiCodePosition == konamiCode.length)
      activateCheats();
  } else
    konamiCodePosition = 0;
});

function activateCheats() {
  chili.electricBugaloo {
    top: 100%;
    left: 100%;
    -webkit-transform: rotate(2000deg);
    transform: rotate(2000deg);
  };
    
  chili {
    position: fixed;
    width: 32px;
    height: 32px;
    background: url('http://i.imgur.com/SyCqOhA.png');
    top: -5%;
    left: -5%;
    z-index: 11200000;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: all 2s linear;
    transition: all 2s linear;
  };
  
  var audio = new Audio('audio/pling.mp3');
  audio.play();

  alert("cheats activated");
}
