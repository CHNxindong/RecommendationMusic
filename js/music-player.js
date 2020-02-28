$(document).ready(function(){
  $(".music-player-audio").mediaelementplayer({
    alwaysShowControls:true,
    enableKeyboard: true,
    features:['playpause','progress','current','duration','tracks','volume'],
    audioWidth: 1200,
    audioHeight: 80,
    alwaysShowHours: true,
    pauseOtherPlayers: true,
    KeyActions:["32"]
  });
  
}); //->docment
