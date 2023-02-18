// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    
    document.documentElement.style.setProperty('--main-color', mainColors);

    // Remove Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        // Add Active Class On Element With Color-Data === Local Storage Item
        if (element.dataset.color === mainColors) {

            // Add Active Class
            element.classList.add("active");
        }
    });

}

// Random Background Option
let BackgroundOption = true;

// Variable To Control The Inerval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty
if(backgroundLocalItem !== null) {

    if(backgroundLocalItem === 'true') {

        BackgroundOption = true;

    }
    else {

        BackgroundOption = false;

    }

    // Remove Active Class For All Spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });

    if(backgroundLocalItem === 'true') {

        document.querySelector(".random-backgrounds .yes").classList.add("active");

    }else {

        document.querySelector(".random-backgrounds .no").classList.add("active");

    }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    // Spin Icon
    this.classList.toggle("fa-spin");

    //Open Settings Box
    document.querySelector(".settings-box").classList.toggle("open");

};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

//Loop On All List Items
colorsLi.forEach(li => {

    // Click On List Items
    li.addEventListener("click", (e) => {

        // Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Set Color On Local Storage 
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);

    });
});

// Switch Random Backgrounds Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

//Loop On All List Items
randomBackEl.forEach(span => {

    // Click On Span Item
    span.addEventListener("click", (e) => {

        

        handleActive(e);

        if (e.target.dataset.background === 'yes') {

            BackgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option",true);

        } else {

            BackgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option",false);
        }

    });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["slide.jpg","slide-1.jpg","slide-2.png","slide-3.jpg","slide-4.jpg","slide-5.png"];

 // Change Background Image Url
landingPage.style.backgroundImage = 'url("imgs/slide-3.jpg")';

// Function To Randomize Imgs
function randomizeImgs() {

    if(BackgroundOption === true) {

        backgroundInterval = setInterval(() => {
            //Get Random Number
        let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
         // Change Background Image Url
        landingPage.style.backgroundImage = 'url("imgs/'+imgsArray[randomNumber]+'")';
        
        }, 3000);
    }
}
randomizeImgs();

// Select Skills Selctor 
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    //Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.scrollY;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            
            skill.style.width = skill.dataset.progress;

        });
    }
};

// Create Popup With The Images 
let ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach(img => {

    img.addEventListener('click', (e) => {

        //Create Overly Element
        let overlay = document.createElement("div");

        // Add Class To Overly
        overlay.className = 'popup-overly';

        // Append Overly To The Body 
        document.body.appendChild(overlay);
        
        // Create The Popup Box
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box
        popupBox.className = 'popup-box';

        if (img.alt !== null){

            // Creat Heading 
            let imgHeading  = document.createElement("h3");

            // Create Text For Heading 
            let imgText = document.createTextNode(img.alt);

            // Append The Text To Heading 
            imgHeading.appendChild(imgText);

            // Append The Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }

        //Create The Image
        let popupImage = document.createElement("img");

        // Set Image Source
        popupImage.src = img.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage);

        // Add Popup Box To Body 
        document.body.appendChild(popupBox);

        // Create The Close Span
        let closeButton = document.createElement("span");

        // Create The Close Button Text
        let closeText = document.createTextNode("X");

        // Append Text To Close Button
        closeButton.appendChild(closeText);

        // Add Class To Close Button
        closeButton.className = 'close-btn';

        // Add Close Button To Popup Box
        popupBox.appendChild(closeButton);
    });

});

// Close Popup 
document.addEventListener('click', function (e) {

    if (e.target.className === 'close-btn') {

        // Remove The Current Popup
        e.target.parentNode.remove();

        //Remove The Overly
        document.querySelector(".popup-overly").remove();
    }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });

    });
});

// Handle Active States 
function handleActive (ev) {

    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    // Add Active Class On Clicked
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");

    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", 'none');

        }

        handleActive(e);

    });

});

// Reset Button 
document.querySelector(".reset-options").onclick = function () {

    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option"); 

    // Reload Window
    window.location.reload();

};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    // Stop Propagation
    e.stopPropagation();
    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tLinks.classList.toggle("open");

};

// Click Anywhere Outside Menu and Toggle Button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // Check If Menu Is Opened
        if (tLinks.classList.contains("open")) {

            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class "open" On Links
            tLinks.classList.toggle("open");
        };

    };
});

// Stop Propagation On Menu 
tLinks.onclick = function (e) {
    e.stopPropagation();
};