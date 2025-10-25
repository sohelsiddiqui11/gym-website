// Yeh function tab chalta hai jab poora page load ho jaata hai
window.addEventListener('DOMContentLoaded', () => {

    // == Pre-loader Logic ==
    const preloader = document.getElementById('preloader');
    
    // Page load hone ke baad preloader ko hide karo (thoda delay ke saath taaki dikhe)
    window.addEventListener('load', () => {
        if (preloader) {
            // Hum thoda delay (e.g., 500ms) de sakte hain hide karne se pehle
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500); // 500 milliseconds = 0.5 seconds
        }
    });

    // Sabhi internal links ko pakdo (jo # se shuru nahi hote)
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Agar link external nahi hai aur usi domain par hai
            if (preloader && link.hostname === window.location.hostname) {
                // Preloader ko dikhao
                preloader.classList.remove('hidden');
                // Chhota sa delay de sakte hain taaki user loader dekh sake page badalne se pehle
                // Lekin yeh user experience ko slow kar sakta hai, isliye abhi comment kar raha hoon
                // setTimeout(() => {
                //     window.location.href = link.href; // Manually navigate after delay
                // }, 300); 
                // e.preventDefault(); // Default navigation ko roko agar delay use kar rahe ho
            }
        });
    });
    
    // Browser ke back/forward button ke liye bhi preloader ko hide karna
    window.addEventListener('pageshow', (event) => {
        if (preloader && event.persisted) { // Agar page cache se load hua hai
             preloader.classList.add('hidden');
        }
    });


    // == Header Scroll Logic ==
    const header = document.getElementById('main-header');
    if (header) { // Check karo ki header hai ya nahi
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

});

