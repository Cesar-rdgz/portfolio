let slides = document.querySelectorAll('#slider .slide-content');
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');
let current = 0;

function reset(){
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
}

function init(){
    reset();
    slides[0].style.display = 'flex';
}

arrowLeft.addEventListener('click', () => {
    if(current === 0){
        reset();
        current = slides.length - 1;
        slides[current].style.display = "flex";
        slides[current].classList.add('animateLeft');
    }else {
        reset();
        current--;
        slides[current].style.display = "flex";
        slides[current].classList.add('animateLeft');
    }

});

arrowRight.addEventListener('click', () => {
    if(current === slides.length -1){
        reset();
        current = 0;
        slides[current].style.display = "flex";
        slides[current].classList.add('animateRight');
    }else {
        reset();
        current++;
        slides[current].style.display = "flex";
        slides[current].classList.add('animateRight');
    }

});

init();