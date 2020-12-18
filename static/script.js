





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





var getNamesMulti1 = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['button'],
    cssClass: ['custom-class-1', 'custom-class-2'],
    beforeClose: function() {
        $('#p1').text($('#pname1').val());
        
        return true; 
    }
});
// add a button
getNamesMulti1.setContent("<h3>Select the player 1 name</h3><input id='pname1' type='text'></input>");

getNamesMulti1.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary', function() {
    if($('#pname1').val() == ""){
        var warning = new tingle.modal({footer: true,
            stickyFooter: false,
            closeMethods: ['button'],
            cssClass: ['custom-class-1', 'custom-class-2'],}).setContent("<h3>Choose a name</h3>");
            warning.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary', function() {
                warning.close();
            });
            warning.open();
    }else{
        getNamesMulti1.close();
    }
});

var getNamesMulti2 = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['button'],
    cssClass: ['custom-class-1', 'custom-class-2'],
    beforeClose: function() {
        $('#p2').text($('#pname2').val());
        return true; 
    }
});
// add a button
getNamesMulti2.setContent("<h3>Select the player 2 name</h3><input id='pname2' type='text'></input>");

getNamesMulti2.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary', function() {
    if($('#pname2').val() == ""){
        var warning = new tingle.modal({footer: true,
            stickyFooter: false,
            closeMethods: ['button'],
            cssClass: ['custom-class-1', 'custom-class-2'],}).setContent("<h3>Choose a name</h3>");
            warning.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary', function() {
                warning.close();
            });
            warning.open();
    }else{
        getNamesMulti2.close();
    }
});


if(window.location.pathname == "/multiplayer"){
    getNamesMulti1.open();
    getNamesMulti2.open();
};