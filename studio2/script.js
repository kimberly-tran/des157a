(function(){
    'use strict';
    console.log('js is running');

    const hotSpots = document.querySelectorAll('#container div');
    const theImg = document.querySelector('#container img');
    const stillImg = document.querySelectorAll('.right')
    const gifImg = document.querySelectorAll('.hidden');
    const compress = document.querySelectorAll('.compress');

    // establishing hot spots that the user can identify by hovering over, and can then 'click' on
    hotSpots.forEach(function(eachSpot){
        eachSpot.addEventListener('mouseover', function(){
            // console.log('mouse is over')
            eachSpot.style.cursor = 'crosshair';
        });
        eachSpot.addEventListener('click', zoomIn);
    });

    // zooms in to the specific section that is clicked on + opens an different overlay specific to each hot spot
    function zoomIn(event) {
        const thisCorner = event.target.id;
        console.log(thisCorner);
        switch(thisCorner) {
            case 'dutchbros': theImg.className = 'dutchbros'; document.querySelector('#overlay1').className = "showing"; break;
            case 'colorguard': theImg.className = 'colorguard'; document.querySelector('#overlay2').className = "showing"; break;
            case 'kirby': theImg.className = 'kirby'; document.querySelector('#overlay3').className = "showing"; break;
        }
        theImg.style.filter = 'blur(4px)';
    }

    // photo switches still img -> gif once mouse enters photo frame
    stillImg.forEach(function(eachStill) {
        eachStill.addEventListener('mouseover', function toGif(event) {
            const thisStill = event.target.id;
            switch(thisStill) {
                case 'still1': document.querySelector('#still1').className = "hidden"; document.querySelector('#gif1').className = "right"; break;
                case 'still2': document.querySelector('#still2').className = "hidden"; document.querySelector('#gif2').className = "right"; break;
                case 'still3': document.querySelector('#still3').className = "hidden"; document.querySelector('#gif3').className = "right"; break;
            }
            eachStill.style.cursor = 'auto';
        });
    });

    // grabbing each gif image separately
    gifImg.forEach(function(eachGif) {
        // changing cursor from auto to crosshair on hover
        eachGif.addEventListener('mouseover', function(event) {
            const thisGif = event.target.id;
            switch(thisGif) {
                case 'gif1': eachGif.style.cursor = 'crosshair'; break;
                case 'gif2': eachGif.style.cursor = 'crosshair'; break;
                case 'gif3': eachGif.style.cursor = 'crosshair'; break;
            }
        });
        // photo switches back from gif -> still img once mouse leaves photo frame
        eachGif.addEventListener('mouseout', function toStill(event) {
            const thisGif = event.target.id;
            switch(thisGif) {
                case 'gif1': document.querySelector('#gif1').className = "hidden"; document.querySelector('#still1').className = "right"; eachGif.style.cursor = 'auto'; break;
                case 'gif2': document.querySelector('#gif2').className = "hidden"; document.querySelector('#still2').className = "right"; eachGif.style.cursor = 'auto'; break;
                case 'gif3': document.querySelector('#gif3').className = "hidden"; document.querySelector('#still3').className = "right"; eachGif.style.cursor = 'auto'; break;
            }
        });
    });

    // establishing different 'zoom out' / 'compress' icons, so that they can close the correct overlay
    compress.forEach(function(eachCompress) {
        // make it clear to the user that the 'zoom out' icon is clickable
        eachCompress.addEventListener('mouseover', function zoomOut() {
            eachCompress.style.cursor = 'pointer';
        });
        // closes the overlay and zooms the main image back out
        eachCompress.addEventListener('click', function zoomOut(event) {
            const thisCompress = event.target.id;
            switch(thisCompress) {
                case 'dutch': document.querySelector('#overlay1').className = "hidden"; break;
                case 'color': document.querySelector('#overlay2').className = "hidden"; break;
                case 'kir': document.querySelector('#overlay3').className = "hidden"; break;
            }
            theImg.className = 'start';
            theImg.style.filter = 'blur(0px)';
        });
    });

})();