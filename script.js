function setup() {
  cnv = createCanvas(400, 400);
  background(225, 225, 225, 0);
  //create a button to sonify the weather
  button = createButton('Sonify Weather');
  button.position(10, 10);
  button.mousePressed(sonify);
  //create a button to stop the sound
  stopButton = createButton('Stop');
  stopButton.position(120, 10);
  stopButton.mousePressed(stop);
  //create a text input field for the location
  locationField = createInput('pick a place');
  locationField.position(10, 50);
  //create a paragraph to display the info
  infoField = createP('Search for a location to "hear" 🔊 its temperature')
  infoField.position(10, 80);
  //create an oscillator to generate sound
  osc = new p5.Oscillator('sine');
}


function sonify(){
  console.log("sonifying weather for ");
  console.log(locationField.value());
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '29d811170cmsh9fab021f6b05ac9p19ce94jsn32bd2c989e1b',
      'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
    }
  };

  fetch('https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location='+locationField.value() +'&contentType=json&unitGroup=us&shortColumnNames=0', options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      pitch = response.locations[locationField.value()].values[0].temp + 50;
      osc.freq(pitch);
      osc.start();
      //make this line work with p5.js
      infoField.html("the weather in " + locationField.value() + " is " + response.locations[locationField.value()].values[0].temp);
      if (response.locations[locationField.value()].values[0].temp < 60) {
        infoField.html(infoField.html() + " ❄️");
      }
      else {
        infoField.html(infoField.html() + " ☀️");
      }
    }).catch(err => console.error(err));
}

function stop(){
  osc.stop();
}






