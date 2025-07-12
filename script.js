//define variable for our location
let locationField;

let audioCtx;

let freq = 0;

let infoField;
//wait until html document is loaded so that we can access the keyboard input field
document.addEventListener('DOMContentLoaded', function(event) { 
  //locationField = document.getElementById("location");
  locationField = document.querySelector("#location");
  infoField = document.getElementById('info');
})

// create web audio api context
audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = "square";
oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);
oscillator.start();
//idiosyncratic glitch.me thing
audioCtx.suspend();

function sonify(){
  console.log(locationField.value);
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '29d811170cmsh9fab021f6b05ac9p19ce94jsn32bd2c989e1b',
		'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
	}
};

fetch('https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location='+locationField.value +'&contentType=json&unitGroup=us&shortColumnNames=0', options)
	.then(response => response.json())
	.then(response => {
    console.log(response);
    //console.log(response.locations[locationField]);
    
    freq = response.locations[locationField.value].values[0].temp + 50; console.log(freq); 
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); 
    audioCtx.resume();
    infoField.innerHTML = "the weather in " + locationField.value + " is " + response.locations[locationField.value].values[0].temp
    if (response.locations[locationField.value].values[0].temp < 60) {
      infoField.innerHTML += " ❄️"
    }
    else {
      infoField.innerHTML += " ☀️"
    }
  })
	.catch(err => console.error(err));
}

function stop(){
  audioCtx.suspend();
}






