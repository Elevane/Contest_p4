
/**$('#single').ready(function(){
    // changemment du nom du player en mode solo
    var player = prompt("Please enter your name : ");
    console.log(player);
    if(player != null){
        $('#p1').text(player) ;
    };


});


$('#multipla').on('ready', function(){
    // changemment du nom du player en mode solo
    var player1 = prompt("Player 1 please enter your name : ");
    while(player1 == null || player1 == ""){
        player1 =prompt("Player please enter a valid name :")
    }
    $('#p1').text(player1);
    var player2 = prompt("Player 2 please enter your name : ");
    while(player2 == null || player2 == ""){
        player1 =prompt("Player please enter a valid name :")
    }
    $('#p2').text(player2);
});**/
    