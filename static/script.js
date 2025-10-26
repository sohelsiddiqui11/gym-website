
window.addEventListener('DOMContentLoaded', () => {

    
    const preloader = document.getElementById('preloader');
    
   
    window.addEventListener('load', () => {
        if (preloader) {
            
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500); 
        }
    });

    
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
           
            if (preloader && link.hostname === window.location.hostname) {
                
                preloader.classList.remove('hidden');
                
            }
        });
    });
    
    
    window.addEventListener('pageshow', (event) => {
        if (preloader && event.persisted) { 
             preloader.classList.add('hidden');
        }
    });


    
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }


    const mobileMenuButton = document.getElementById('mobile-menu-button'); 
    const mobileMenu = document.getElementById('mobile-menu'); 

 
    if (mobileMenuButton && mobileMenu) {
      
        mobileMenuButton.addEventListener('click', () => {
            

            mobileMenu.classList.toggle('mobile-menu-hidden'); 
            mobileMenu.classList.toggle('mobile-menu-visible');

            
             if (mobileMenu.classList.contains('mobile-menu-visible')) {
                 mobileMenuButton.innerHTML = '✕'; 
             } else {
                 mobileMenuButton.innerHTML = '☰'; 
             }
        });
    }

});

