/** 
 * used for dependency management - update this to match proj properties etc for reporting (optional)
 * @return {LibraryInfo} the info about this library and its dependencies
 */
function getLibraryInfo () {
  return {
    info: {
      name:'doggerDemo',
      version:'0.0.2',
      key:'MDoNv5DDqh1k--aAYIYbDCKi_d-phDA33',
      share:"https://script.google.com/d/1WGyHrN26yoKR1c1CO0WNMJOqcSqoApSfhzLkvTsTly-NwT2NeVyW-LbT/edit?usp=sharing",
      description:"Demonstrate dogger"
    },
    dependencies:[
      yourDoggerServer.getLibraryInfo()
    ]
  }; 
}


// this will just provoke some demo data
function doGet(e) {
  // do whatever this webapp is for
  var result = doSomeStuff(e); 
  // prepare the result
  var s = JSON.stringify(result);
  // publish result
  return ContentService
    .createTextOutput(result.params.callback ? result.params.callback + "(" + s + ")" : s )
    .setMimeType(result.params.callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON); 
}

  
// the Dogger defaults you like to use are already set up in your library- we'll have a very short lifetime
var Dogger = yourDoggerServer.getDogger(false);
  

// we'll use this additional thread for verbose reporting
var Verbose = yourDoggerServer.getDogger(false, 'verbose');

function doSomeStuff(e) {

  var result = {params:{callback:''},handleError:0,data:[]};
  if (e) {
    result.params = e.parameter;
  }
  
  // clear the log before starting (there's no thread so it will clear the whole thing
  Dogger.clear();
  
  // try various logging
  Dogger.log('Im starting');
  
  for (var i = 0 ; i < 4 ; i++) {
    Verbose.log(Math.random());
  }
  
  Dogger.log ('heres an object');
  Dogger.log ({str:'im an object', num:20, bool: true});
  
  // what happens if we try to report a library object
  Dogger.log ('handler object up next');
  Dogger.log(Dogger);
  
  // an array
  Verbose.log([1,2,3,4,5]);
  
  // simulate some time passing and things happening
  for (var i = 0 ; i < 10 ; i++) {
    Verbose.log('Im doing something very busy ' + i);
    Utilities.sleep (2000);
  }
  
  // im done
  Dogger.log('Im done');
  
  return result;
  
}

function show() {
  var dogger = yourDoggerServer.getDogger(false);
  Logger.log(dogger.getHandler().count());
}