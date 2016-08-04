Bolt = require('misfit-bolt');
async = require('async'),

console.log("Discovering ...");

function setColorInInterval(bolt) {
    var i = 0,
        colors = [[228,41,15,10],
                  [216,62,36,10],
                  [205,55,56,10],
                  [211,27,76,10],
                  [166,18,97,10]];
    // Change color every 500 ms
    setInterval(function(){
      var color = colors[i++ % colors.length];
      bolt.setRGBA(color, function(){
        console.log("- setRGBA " + bolt.id + ' ' + bolt.address);
        // set complete
      });
    }, 500);
}

function done2(key, value) {
    console.log(key+' = '+value);
}

Bolt.onConnect = function (bolt) {
    console.log("onConnect");

    // bolt.getState((error, value) => {done2('state', value);});
    // bolt.getRGBA((error, value) => {done2('RGBA', value);});
    // bolt.getHSB((error, value) => {done2('HSB', value);});
    // bolt.getName((error, value) => {done2('name', value);});
    // bolt.getGradualMode((error, value) => {done2('gradualMode', value);});

    async.series([
      (done) => { bolt.getRGBA(done); },
      (done) => { bolt.getHSB(done); },
      (done) => { bolt.getState(done); },
      (done) => { bolt.getName(done); },
      (done) => { bolt.getGradualMode(done); }
    ], (error, values) => {
      if (error) {
        console.log(response);
      } else {
        var response = {
          id: bolt.id,
          address: bolt.address,
          name: values[3],
          state: values[2],
          RGBA: values[0],
          HSB: values[1],
          gradualMode: values[4]
        };
        console.log(response);
      }

      Bolt.stopDiscover(function (bolt) {
          console.log("stopDiscoverAll");
      });
    });
}

// Bolt.init();


// Discover every nearby Bolt
Bolt.discover(function(bolt) {
  console.log("- discover " + bolt.id + ' ' + bolt.address);
  // Each time a bolt is discovered, connect to it
  bolt.connectAndSetUp(function(error) {
    console.log("- connect " + bolt.id + ' ' + bolt.address);
    Bolt.onConnect(bolt);
  });
});
