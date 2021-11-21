//const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
var slideInterval = setInterval(transition, 1000);
var slideShow = document.getElementById('slideshow');
var images = [];
var divs = [];
slideShow.addEventListener('click', openFullscreen);

fetch('files.php', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log('Request successful', data);
        images = data;
        addElements();
    })
    .catch(function(error) {
        console.log('Request failed', error)
    });

function addElements() {
    for (var i = 0; i < images.length; i++) {
        let url = "images/"+images[i];
        if(i == (images.length-1)) {
            addElement(999, url, 0);
        } else {
            addElement(i, url, i);
        }
    }
}

function addElement(id, url, zindex) {
    let div = document.createElement('div');
    div.style.backgroundImage = "url(" + url + ")";
    div.style.zIndex = zindex;
    div.id = "slideshow-image" + id;
    div.classList = "";
    div.className = "slideshow-image";
    slideShow.appendChild(div);
}

function transition() {
    divs = document.getElementsByClassName("slideshow-image");
    if(divs.length <= 2) {
        //clearInterval(slideInterval);
        addElements();
    } else {
        divToBeDissolved = document.getElementsByClassName("slideshow-image") [divs.length - 2];
        divToBeDissolved.classList.add('dissolve');
        divToBeRemoved = document.getElementsByClassName("slideshow-image") [divs.length - 1];
        console.log(divToBeRemoved);
        divToBeRemoved.remove();
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