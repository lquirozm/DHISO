import Swiper from 'swiper';
import 'swiper/css';
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';


document.addEventListener("DOMContentLoaded", () => {
  // Configurar Swiper
  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Autoplay], // definir los módulos a usar
    loop: true,            // definir si los slides estarán en bucle
    slidesPerView: "auto",      // agregar número de slides para la pantalla
    spaceBetween: 20,      // separación entre slides en px
    autoplay: {
        delay: 3000,
        disableOnInteraction: true, 
    },

    breakpoints: {
    // Cuando la pantalla es >= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 30
         },
    // Cuando la pantalla es >= 1024px
        1024: {
            slidesPerView: 3,
            spaceBetween: 40
        }
     },
    navigation: {          // definir botones next y prev para el módulo Navigation
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    }
  });
  // Configurar e inicializar Photoswipe
  const lightboxes = new Set();
  
  document.querySelectorAll('a[data-gallery]').forEach((el) => {
    const galleryId = el.getAttribute('data-gallery');
    if (!lightboxes.has(galleryId)) {
      const lightbox = new PhotoSwipeLightbox({
        gallery: `#${galleryId}`,
        children: 'a',
        pswpModule: () => import('photoswipe')
      });
      lightbox.init();
      lightboxes.add(galleryId);
    }

    // Al hacer clic en la imagen del slide, abre el álbum
    el.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(`#${galleryId} a`).click();
    });
  });
});