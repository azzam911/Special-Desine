//Select Landing Page
let landingPage = document.querySelector(".landing-page");

//Get Array From Images
let arrImgs = ['image1.webp','image2.webp','image3.jpg','image4.webp','image5.jpg'];

window.onload = function () {
    setInterval(() => {
        let index = Math.floor(Math.random() * arrImgs.length);
        
        landingPage.style.backgroundImage = `url(../imgs/${arrImgs[index]})`;
    },5000);
};

//Start Show And hide Settings Box

let box = document.querySelector(".settings-box");
let gears = document.querySelector(".settings-box .settings-option");
let lis = document.querySelectorAll(".settings-box .options-box .colors-list li");
gears.onclick = function(e) {
    e.stopPropagation();

    if (box.classList.contains("open")) {
        box.classList.remove("open");
    }else {
        box.classList.add("open");        
    }
}

document.addEventListener("click", (e)=> {
    if (e.target !== gears) {
        if (box.classList.contains("open")) {
            box.classList.remove("open");
        }
    }
});




// Start Switch Colors

// Loop On lis
lis.forEach((li)=> {
    li.onclick= function () {

        // Remove All Active Class From lis
        removeActive()

        // Add Active Class To The Element
        li.classList.add("active");

        // Set The Active Class In Local Storage
        localStorage.setItem("class","active");

        // Set The custem COlor in the Local Storage
        localStorage.setItem("color",li.dataset.color);

        // Change The Color In Root Varibels
        document.documentElement.style.setProperty('--main-color',localStorage.getItem("color"));
    }
});

// Remove All Active Class From lis
function removeActive() {
    lis.forEach(li => {
        li.classList.remove("active");
    });
}


// Add Class Active to the cuurrent color from LocalStorage
function activeClass() {
    removeActive()
    lis.forEach(li => {
        if(li.dataset.color === localStorage.getItem("color")) {
            li.classList.add(localStorage.getItem("class"));
        }
    });
}



// Check if There is a color in localStorage
if (localStorage.getItem("color") !== '') {
    document.documentElement.style.setProperty('--main-color',localStorage.getItem("color"));
    activeClass()
}


// End Switch Colors


//End Show And hide Settings Box

// Start Our Skills


// Hide The Setting When Click outSide The Settings Box
document.querySelector(".our-skills").addEventListener("click",()=>{
    hideSettingsBox();
});



let ourSkills = document.querySelector(".our-skills");
let spn = document.querySelectorAll(".our-skills .skill-name span");

window.onscroll = function() {
    let skillOfsettTop = ourSkills.offsetTop;

    let skillOfsettHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillOfsettTop + skillOfsettHeight - windowHeight)) {
        spn.forEach(span => {
            span.style.width = `${parseInt(span.dataset.progress)}%`
            span.textContent=`${parseInt(span.dataset.progress)}%`;
        });
    }
}
// End Our Skills




/* Start Our Gallery */
let imgs = document.querySelectorAll(".gallery .gallery-box img");
let myImgs = Array.from(imgs)
let imgsontainer = document.querySelectorAll(".gallery .gallery-box");
let gallery = document.querySelector(".gallery");
myImgs.forEach((img)=> {
    img.addEventListener("click" , (e)=>{
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";

        document.body.appendChild(overlay);

        //Create PopupBox
        let popupBox = document.createElement("div");

        popupBox.className = "popup-box";
        overlay.appendChild(popupBox);

        //Create Button inside popup Box

        let popupBtn = document.createElement("button");
        let popupBtnText = document.createTextNode("X");
        popupBtn.className="popup-btn";
        popupBtn.appendChild(popupBtnText);
        popupBox.appendChild(popupBtn);

        // Add Imag To Popup

        let popupImage = document.createElement("img");

        

        popupImage.src=img.src;

        popupBox.appendChild(popupImage);



        if (img.alt !== '') {
            //Create Text For Each image
            let imgText = document.createTextNode(img.getAttribute("alt"));
            // Create h2 put Text Inside
            let h2 = document.createElement("h2");
            h2.appendChild(imgText);
            popupBox.prepend(h2);
        }


        popupBtn.addEventListener("click",()=> {
            overlay.classList.add("popup-hide");
        })

    });
    
});


document.addEventListener("click", (e) => {
    if (e.target.className == "popup-btn") {
        document.querySelector(".popup-overlay").remove();
    }
})

/* End Our Gallery */



// Start Nav 
let bullets = document.querySelectorAll(".nav-container .bullit");
bullets.forEach((e) => {
    e.addEventListener("click", () => {
        window.open(`#${e.dataset.section}`,"_self")
        
    });
    
})
// End Nav 



// show and hide bullets

let btns = document.querySelectorAll(".option_bullets div");
let optionContainer = document.querySelector(".nav-container");

btns.forEach((button) => {
    button.addEventListener("click",(e)=> {
        localStorage.setItem("value",button.dataset.display);
        if (button.dataset.display === "show") {
            optionContainer.style.display = 'block'
        }else if (button.dataset.display === "hide") {
            optionContainer.style.display = 'none'
        }
        checkvalue(e);
    });
    
});


function checkvalue() {
    if (localStorage.getItem("value") === "hide") {
        document.querySelector(".option_bullets .no").classList.add("active");
        document.querySelector(".option_bullets .yes").classList.remove("active");
    }else if (localStorage.getItem("value") === "show") {

        document.querySelector(".option_bullets .yes").classList.add("active");
        document.querySelector(".option_bullets .no").classList.remove("active");

    }
}

checkvalue()

if (document.querySelector(".option_bullets .no").classList.contains("active")) {
    document.querySelector(".nav-container").classList.add("disabled");
}else {
    document.querySelector(".nav-container").classList.remove("disabled");

}


// Start Reset Button

let resetSpan = document.querySelector(".reset-container span ");

resetSpan.addEventListener("click",(e) => {
    localStorage.clear();
    window.location.reload();
});


// Start Add Toggle Menu 
let toggleMenu = document.querySelector(".landing-page .header-area .links-container .toggle-menu");
let menu = document.querySelector(".header-area .links");
toggleMenu.onclick=function (e) {

    e.stopPropagation();

    menu.classList.toggle("open");
};


// CLose Menu Whene click out side

document.addEventListener("click",(e)=> {
    if (e.target !== toggleMenu) {
        if (menu.classList.contains("open")) {
            menu.classList.remove("open");
        }
    }
});
// End Add Toggle Menu 