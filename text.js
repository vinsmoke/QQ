var fs = require('fs');
var minglinghang = require('child_process');
var files = fs.readdirSync('./musics/');
var result = [];
var format_duration = function(str){
  var num =Number(str);
  var minute = parseInt(num/60);
  var seconds =  Math.round(num%60);
  seconds=(seconds<10)?('0'+seconds):(seconds);
  minute = (minute<10)?('0'+minute):(minute);
  return minute + ':' + seconds;
}
files.forEach(function(v){
  var data = JSON.parse(minglinghang.execSync('ffprobe -v quiet -print_format json -show_format "./musics/'+v+'"'));
  var duration = format_duration(data.format.duration)
  var r = {
    filename:data.format.filename,
    duration:duration,
    title:data.format.tags.title,
    album:data.format.tags.album,
    artist:data.format.tags.artist
  }
  // result.push(JSON.parse(data));
  result.push(r);
})

fs.writeFile('./database.json',JSON.stringify(result,null,2));
