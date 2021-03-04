const images = document.getElementsByTagName('img');
const tab = [
    "img/1.jpg", "img/1.jpg",
    "img/2.jpg", "img/2.jpg",
    "img/3.jpg", "img/3.jpg",
    "img/4.jpg", "img/4.jpg",
    "img/5.jpg", "img/5.jpg",
    "img/6.jpg", "img/6.jpg",
    "img/7.jpg", "img/7.jpg",
    "img/8.jpg", "img/8.jpg",
    "img/9.jpg", "img/9.jpg",
    "img/10.jpg", "img/10.jpg",
    "img/11.jpg", "img/11.jpg",
    "img/12.jpg", "img/12.jpg",
    "img/13.jpg", "img/13.jpg",
    "img/14.jpg", "img/14.jpg"
];


document.body.oncontextmenu = (e) => e.preventDefault();//disable rigth click

randomize(tab);
for (let i = 0; i < tab.length; i++) images[i].src = tab[i];

btn.onclick = () => document.location.reload(); //reload Game

let image1;
let image2;
let tour = 1;
let count = 0;

for (const image of images) {
    image.onclick = () => {

        setTimeout(() => image.classList.remove("hidden"), 200);
        image.classList.add("rotate");

        if (tour == 1) {
            image.classList.add("no-pointer");
            span.classList.remove("slide");
            image1 = image;
            tour++;
        }

        else {
            count++;
            span.textContent = count;
            span.classList.add("slide");


            image.classList.add("no-pointer");
            image2 = image;

            if (image1.src == image2.src) {
                image1.parentElement.classList.add("discover");
                image2.parentElement.classList.add("discover");
                const filtre = [...images].filter(image =>
                    !image.parentElement.classList.contains("discover"));

                if (filtre.length == 0)
                    setTimeout(() => reload.style.display = "block", 1000);
            }

            else {
                for (const image of images) {
                    image.classList.add("no-pointer");
                    image1.parentElement.classList.add("wrong");
                    image2.parentElement.classList.add("wrong");

                    if (!image.parentElement.classList.contains('discover')) {
                        setTimeout(() => {
                            image.classList.add("hidden");
                            image.classList.remove("rotate");
                            image.classList.remove("no-pointer");
                            image1.parentElement.classList.remove("wrong");
                            image2.parentElement.classList.remove("wrong");
                        }, 1500);
                    }
                }
            }

            tour = 1;
        }
    };
}


function randomize(tab) {
    var i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
}

//*************Service Worker ******************/
//Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/paires/sw.js', { scope: '/paires/' })
        .then(function () { console.log('Service Worker for paires Registered'); });
}

/************Permettre le 100vh sur mobile */
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

const metas = document.getElementsByTagName('meta');
metas[1].content = 'width=device-width, height=' + window.innerHeight + ' initial-scale=1.0, maximum-scale=5.0,user-scalable=0';
