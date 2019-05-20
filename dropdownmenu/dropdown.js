

function init(){
    let menu = document.getElementsByClassName('dropmenu');
    console.log(menu[0].id);
    document.getElementById("services").addEventListener('mouseover', togglelist);
    document.getElementById("services").addEventListener('mouseout', togglelist);

    function togglelist(e) {
        console.log(e);
        if(e.type == 'mouseover'){
            console.log("true");
            menu[0].id = 'servicelistshow'
        };
        if(e.type == "mouseout"){
            menu[0].id = 'servicelisthide'
        };
    }
}

window.onload = init;