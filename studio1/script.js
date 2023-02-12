(function (){
    'use strict';
    console.log('js is running');

    const form = document.querySelector('form');
    const header = document.querySelector('h3');
    const madlib = document.querySelector('#madlib')
    
    form.addEventListener('submit', function(event){
        event.preventDefault();
        const time = document.querySelector('#time').value;
        const place = document.querySelector('#place').value;
        const noun1 = document.querySelector('#noun1').value;
        const adj = document.querySelector('#adj').value;
        const noun2 = document.querySelector('#noun2').value;
        const verb = document.querySelector('#verb').value;
        const name = document.querySelector('#name').value;

        let warningText;
        let madlibText;

        if(time == "") {
            warningText = "please provide a time";
            document.querySelector('#time').focus();
            header.innerHTML = warningText;
        }
        else if(place == "") {
            warningText = "please provide a place";
            document.querySelector('#place').focus();
            header.innerHTML = warningText;
        }
        else if(noun1 == "") {
            warningText = "please provide a noun";
            document.querySelector('#noun1').focus();
            header.innerHTML = warningText;
        }
        else if(adj == "") {
            warningText = "please provide a adjective";
            document.querySelector('#adj').focus();
            header.innerHTML = warningText;
        }
        else if(noun2 == "") {
            warningText = "please provide another noun";
            document.querySelector('#noun2').focus();
            header.innerHTML = warningText;
        }
        else if(verb == "") {
            warningText = "please provide a verb";
            document.querySelector('#verb').focus();
            header.innerHTML = warningText;
        }
        else if(name == "") {
            warningText = "please provide a name";
            document.querySelector('#name').focus();
            header.innerHTML = warningText;
        }
        else {
            madlibText = `Yesterday <span>${time}</span>, I went to the <span>${place}</span> for the first time. I didn’t even know they served <span>${noun1}</span> there, but I was super hungry and decided to try it anyway. The <span>${noun1}</span> tasted so <span>${adj}</span>, I can’t wait to come back for more. And don’t even get me started on the <span>${noun2}</span>…  When I first tried it, I wanted to <span>${verb}</span>, which is a little embarrassing. I’ll definitely bring <span>${name}</span> to try it next time I come!`;
            warningText = "your review";
            header.innerHTML = warningText;
            madlib.innerHTML = madlibText;
            document.querySelector('#form').className = "hidden";
            document.querySelector('#overlay').className = "showing";
        }

    });
})();