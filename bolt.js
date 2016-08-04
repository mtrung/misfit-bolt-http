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
function done(error, value) {
    console.log('value = '+value);
}

// toggle
function action(bolt, done) {
    bolt.getState((error, value) => {
        //done2('state', value);
        bolt.setState(!value, done);
    });
}

function disconnect(bolt) {
      bolt.disconnect( (error) => {
        console.log("- disconnected");
        // Bolt.stopDiscover(function (bolt) {
        //     console.log("stopDiscoverAll");
        // });
      });
}

function onConnect(bolt) {
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
      (done) => { bolt.getGradualMode(done); },
    ], (error, values) => {
      if (error) {
        console.log(response);
      } else {
        var response = {
          id: bolt.id,
          address: bolt.address,
          RGBA: values[0],
          HSB: values[1],
          state: values[2],
          name: values[3],
          gradualMode: values[4]
        };
        console.log(response);
        action(bolt, () => {
            //disconnect(bolt);
        });
      }
    });
}

// Bolt.init();

// Discover every nearby Bolt
Bolt.discoverAll(function(bolt) {
  console.log("- discover " + bolt.id + ' ' + bolt.address);
  // Each time a bolt is discovered, connect to it
  bolt.connectAndSetUp(function(error) {
    console.log("- connect " + bolt.id + ' ' + bolt.address);
    onConnect(bolt);
  });
});
