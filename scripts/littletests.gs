function cput (value) {
  yourDoggerServer.cput(value);
}
function cget() {
  var result = yourDoggerServer.cget();
  Logger.log('from main script i can see ' + result);
  return result;
}
function writeandshow() {
  cput('some data written in the main script');
  Logger.log(cget());
}
function showit() {
  Logger.log(cget());
}
