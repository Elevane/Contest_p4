

/*
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



var getNames = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['button'],
    cssClass: ['custom-class-1', 'custom-class-2'],
    beforeClose: function() {
        $('#p1').text($('#pname').val());
        
        return true; 
    }
});
// add a button
getNames.setContent("<h3>Select a player name</h3><input id='pname' type='text'></input>");

getNames.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary', function() {
    if($('#pname').val() == ""){
        var warning = new tingle.modal({footer: true,
            stickyFooter: false,
            closeMethods: ['button'],
            cssClass: ['custom-class-1', 'custom-class-2'],}).setContent("<h3>Choose a name</h3>");
            warning.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary', function() {
                warning.close();
            });
            warning.open();
    }else{
        getNames.close();
    }
});


if(window.location.pathname == "/single"){
    getNames.open();
};
