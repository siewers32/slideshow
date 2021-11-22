//const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
var slideInterval = setInterval(transition, 3000);
var slideShow = document.getElementById('slideshow');
var divs = [];
var transitionCount = 0;
slideShow.addEventListener('click', openFullscreen);

fetch('files.php', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(images) {
        console.log('Request successful', images);
        addElements(images);
    })
    .catch(function(error) {
        console.log('Request failed', error)
    });

function addElements(images) {
    for (var i = 0; i < images.length; i++) {
        let url = "images/"+images[i];
        addElement(i, url, i);
        // if(i == (images.length-1)) {
        //     addElement(999, url, 0);
        // } else {
        //     addElement(i, url, i);
        // }
    }
}

function addElement(id, url, zindex) {
    let div = document.createElement('div');
    div.style.backgroundImage = "url(" + url + ")";
    div.style.zIndex = zindex;
    div.id = "slideshow-image" + id;
    //div.style.display = "none";
    //div.classList = "";
    div.className = "slideshow-image";
    slideShow.appendChild(div);
}



function transition() {
    divs = document.getElementsByClassName("slideshow-image");
    if(divs.length <= 0) {
        clearInterval(slideInterval);
        addElements();
    } else {
        if(divs.length >= 2) {
            if(transitionCount == 0) {
                divToBeDissolved = divs[divs.length - 1];
            } else {
                divToBeDissolved = divs[divs.length - 2];
            }
            console.log(divToBeDissolved);
            divToBeDissolved.classList.add('dissolve');
        }
        if(transitionCount > 0) {
            divToBeRemoved = divs[divs.length - 1];
            divToBeRemoved.remove();
        }
        transitionCount++;
    }
}

function openFullscreen() {
    var elem = document.body;
    console.log("in fullscreen?")
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        console.log("speciaal voor safari??")
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}