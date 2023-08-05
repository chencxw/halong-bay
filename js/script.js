/* Variables */
const parallax_el = document.querySelectorAll(".parallax");
const landing = document.querySelector(".landing-section");
// X and Y axis variables
let xValue = 0, yValue = 0;
let rotateDegree = 0;

/* Helper Function */
function update(cursorPosition) {
    // Move each layer depending on the mouse movement
    parallax_el.forEach( el => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.speedrot;
        // Check if element is on the left or right side of the page
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth/2 ? 1: -1;
        // Distance between mouse and element
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `translateX(calc( -50% + ${-xValue * speedx}px )) translateY(calc( -50% + ${yValue * speedy}px )) perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDegree * rotateSpeed}deg)`;

    })
};
update(0);

/* Event Listner */
window.addEventListener("mousemove", (e) => {
    // Position of mouse from the center of the window
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    // Rotate mountains depending on location of mouse
    rotateDegree = (xValue / (window.innerWidth / 2) ) * 20;

    update(e.clientX);
})

// GSAP Animation
// Animation for all images except text
gsap.utils.toArray(".parallax").forEach(el => {
    if(el.classList.contains("landing-text")) {
        return
    }

    parallax_animation = gsap.from(el, {
        top: `${window.innerHeight/2 + parseFloat(el.dataset.distance)}px`, 
        duration: 3,
        ease: "power3.out"
    });
});

// Animation for text
gsap.from(".landing-text h1", {
    y: window.innerHeight,
    duration: 2,
    delay: 1.5
})

text_animation = gsap.from(".landing-text h2", {
    y: -150,
    opacity: 0,
    duration: 1.5,
    delay: 2,
})

// Fade in Animation for non-moving elements
header_animation = gsap.from(".hide", {
    opacity: 0,
    duration: 1.5,
    delay: 2,
})
