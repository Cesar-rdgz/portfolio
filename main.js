let sliderCards = document.querySelectorAll('.slide-content'),
    arrowLeft = document.querySelector('#arrow-left'),
    arrowRight = document.querySelector('#arrow-right'),
    current = 0,
    titles = document.querySelectorAll('.title-animated'),
    paragraph = document.querySelectorAll('.p-animated');
    slideShow = document.querySelector('.slideshow');
    showWorks = document.querySelector('#showWorks');

// hidde everything
function reset() {
    for( let i = 0; i < sliderCards.length; i++) {
        sliderCards[i].style.display = 'none';
    }
}

// initializer
function startSlide() {
    reset();
    sliderCards[0].style.display = 'flex';
}

// move to left
function slideLeft () {
    reset();
    sliderCards[current - 1].style.display = 'flex';
    current--;
    titles[current].classList.remove('animateRight');
    paragraph[current].classList.remove('animateRight');
    titles[current].classList.add('animateLeft');
    paragraph[current].classList.add('animateLeft');
}

// move to right
function slideRight() {
    reset();
    sliderCards[current + 1].style.display = 'flex';
    current++;
    titles[current].classList.remove('animateLeft');
    paragraph[current].classList.remove('animateLeft');
    titles[current].classList.add('animateRight');
    paragraph[current].classList.add('animateRight');
}

//click left arrow
arrowLeft.addEventListener('click', function (){
    if(current === 0){
        current = sliderCards.length;
    }
    slideLeft();
});

//click right arrow
arrowRight.addEventListener('click', function (){
    if(current === sliderCards.length -1){
        current = -1;
    }
    slideRight();
});

startSlide();

//remove menu
showWorks.addEventListener('click', function (){
    document.getElementById('toggle-menu').checked = false;
    slideShow.style.display = 'block';
});