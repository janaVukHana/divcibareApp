const sections = document.querySelectorAll("section");
// navigation elements 
const hamburgerMenu = document.querySelector('.bars');
const navUl = document.querySelector('nav ul');
const navLis = document.querySelectorAll('nav ul li');
// header 
const headerCarouselImgs = document.querySelectorAll('#home .image-container');
// gallery elements
 const largeImg = document.querySelector('.large-img img');
 const caption = document.querySelector('.caption-text');
 const thumbnailImgs = document.querySelectorAll('#gallery .col img');
// testimonial elements
const testimonials = document.querySelectorAll('.testimonial-box');
const testimonialParagraphs = document.querySelectorAll('.testimonial-text');
// footer elements 
const copyrightYear = document.querySelector('.dinamic-year');

// NAVIGATION HAMBURGER MENU: 
// ::task:: 
// bars visible on smaller screen else invisible. 
// Links when visible: on smaller vertical else horizontal.

// something like @media, or just like @media.
window.addEventListener('resize', function(e) {
    // console.log('resizing');
    // dodaje 17px na scroll bar
    // console.log(e.target.innerWidth);
    if (e.target.innerWidth < 600) {
        navUl.style.display = 'none';
        hamburgerMenu.style.display = 'block';
    }
    else if(e.target.innerWidth >= 600) {
        navUl.style.display = 'flex';
        navUl.style.flexDirection = 'row';
        hamburgerMenu.style.display = 'none';
    }
})

hamburgerMenu.addEventListener('click', function() {
    if(navUl.style.display === 'flex') {
        navUl.style.display = 'none';
    }
    else {
        navUl.style.display = 'flex';
        navUl.style.flexDirection = 'column';
    }
})

// NAVIGATION LINKS
// change state with .active on click
// .active change color and background-color

navLis.forEach(li => {
    li.addEventListener('click', function() {
        navLis.forEach(li => li.classList.remove('active'));
        this.classList.add('active');
    })
})


// GALLERY SECTION
let source = thumbnailImgs[0].getAttribute('src');
let alt = thumbnailImgs[0].getAttribute('alt');
largeImg.setAttribute('src', source);
largeImg.setAttribute('alt', alt);
caption.textContent = alt;

thumbnailImgs.forEach(img => {
    img.addEventListener('click', function() {
        thumbnailImgs.forEach(item => item.classList.remove('active-thumbnail'));
        this.classList.add('active-thumbnail');
        const source = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        largeImg.setAttribute('src', source);
        largeImg.setAttribute('alt', alt);
        caption.textContent = alt;
    })
})

// HEADER SECTION::carousel 
carousel(headerCarouselImgs, 'block', 5000);
// TESTIMONIALS SECTION::carousel
carousel(testimonials, 'flex', 10000);

function carousel(section, display, time) {
    section.forEach(el => el.style.display = 'none');
    section[0].style.display = display;

    let count = 1;

    setInterval(() => {
        section.forEach(el => el.style.display = 'none');
        if(count === section.length) {
            count = 0;
        };
        section[count].style.display = display;
        count++;
    }, time)
}

// adding dinamically quotes to start and end of testimonial section paragraphs
// just fooling around with javaScript

testimonialParagraphs.forEach(p => {
    //const start and kraj moraju da budu unutar for loop iliti forEach-a. Ne radi izvan. Ne kapiram zasto, ali ukapiracu.
    const start = document.createElement('i');
    start.classList = 'fas fa-quote-left fa-2x';

    const kraj = document.createElement('i');
    kraj.classList = 'fas fa-quote-right fa-2x';

    p.prepend(start);
    p.appendChild(kraj);
})

// FOOTER SECTION 
// dinamic year in footer
const year = new Date().getFullYear();

copyrightYear.textContent = year;

// PAGE 

// smooth scrolling with jQuery //COPY FROM OTHER WEBSITE
$(document).ready(function () {
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});

// navigation links/sections add .active on scroll
window.onscroll = () => {
  var current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    console.log(current); }
  });

  navLis.forEach(li => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
};

