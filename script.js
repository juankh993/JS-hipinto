
    const slideInfo = [
        {
            imageDesktop:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/688f52518acde0a5bcacfb49_slide-1.png",
            imageMobile:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/691f412bbbc200da3c62b194_2880px%20Wide%20x%201454px%20High_750px%20Wide%20x%201032px.webp",
            hasCard: true,
            cardTitle: "Soy Leopardo y punto.",
            cardDescription:
                "Destapa una Hipinto bien fría y acompáñanos a conocer todo eso que hacemos los leopardos para alentar a nuestro equipo del alma.",
            buttonText: "Ver más",
            redirectTo: "https://www.youtube.com/",
        },
        {
            imageDesktop:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/688f5260245ce01af107d62d_slide-2.png",
            imageMobile:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/691f412bf378d8f3e8a22ac4_2880px%20Wide%20x%201454px%20High_T2%20750px%20Wide%20x%201032px.webp",
            hasCard: false,
            cardTitle: "La verdad y punto.",
            cardDescription:
                "En los Santanderes vamos a descubrir qué es mito y qué es verdad: \n ¿Será que la comida rápida de aquí es la mejor del mundo? \n ¿La tarántara y la piña van juntas o separadas? \n ¿Y todo sabe mejor con una Hipinto?",
            buttonText: "Ver más",
            redirectTo: "https://www.youtube.com/",
        },
        {
            imageDesktop:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/691f412b95d28c3c0559a42a_2880px%20Wide%20x%201454px%20High_BannerT3%202880px%20Wide%20x%201454px%20High.webp",
            imageMobile:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/691f412a7720cf36ca3c4785_2880px%20Wide%20x%201454px%20High_T3%20750px%20Wide%20x%201032px.webp",
            hasCard: true,
            cardTitle: "Así somos y punto.",
            cardDescription:
                "En los Santanderes vamos a descubrir por qué su gente habla como habla: una mezcla de tradición, cultura y, sobre todo, gastronomía. Y entenderemos cómo Hipinto se ha vuelto parte de esa identidad.",
            buttonText: "Ver más",
            redirectTo: "https://www.youtube.com/",
        },
    ];

    const templateSlide = (campaign, index) => {
        const slide = /*html*/ `
    <article class="slideBanner-slide" data-slide-index="${index}">
      <div class="slideBannerCard">
        <picture class="slideBannerCard-image">
          <source media="(max-width: 768px)" srcset="${campaign.imageMobile}">
          <img
            class="image-cover"
            src="${campaign.imageDesktop}"
            alt="imagen de la campaña ${campaign.cardTitle}"
            loading="lazy"
          />
        </picture>
        
        ${campaign.hasCard
                ? `
          <div class="slideBannerCard-content">
            <div class="slideBannerCard-info">
              <h3 class="slideBannerCard-title">${campaign.cardTitle}</h3>
              <p class="slideBannerCard-description">${campaign.cardDescription
                }</p>
            </div>
            
            ${campaign.buttonText && campaign.redirectTo
                    ? `
              <div class="slideBannerCard-actions">
                <a 
                  href="${campaign.redirectTo}" 
                  class="slideBannerCard-button primary-button" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                >
                  ${campaign.buttonText}
                </a>
              </div>
            `
                    : ""
                }
          </div>
        `
                : ""
            }
      </div>
    </article>
  `;

        return slide;
    };

    document.addEventListener("DOMContentLoaded", function () {
        const swiperslideBanners = document.querySelector(
            "#main-banner-section .swiper-main-home"
        );

        const swiperParams = {
            fadeEffect: { crossFade: true },
            virtualTranslate: true,
            slidersPerView: 1,
            effect: "fade",
            centeredSlides: true,
            pagination: {
                el: "#main-banner-section .main-banner-controls--pagination",
            },
            navigation: {
                nextEl: "#main-banner-section .swiper-button-next",
                prevEl: "#main-banner-section .swiper-button-prev",
            },
            virtual: {
                slides: (() => {
                    let slides = [];
                    slideInfo.forEach((campaign, index) => {
                        slides.push(templateSlide(campaign, index));
                    });
                    return slides;
                })(),
            },
            on: {
                init: function () {
                    checkControlsVisibility(this);
                },
                resize: function () {
                    checkControlsVisibility(this);
                },
            },
        };

        Object.assign(swiperslideBanners, swiperParams);
        swiperslideBanners.initialize();

        function checkControlsVisibility(swiperInstance) {
            const totalSlides = swiperInstance.virtual.slides.length;
            const windowWidth = window.innerWidth;
            const controlsContainer = document.querySelector(
                "#main-banner-section .main-banner-controls"
            );

            if (windowWidth <= 768) {
                controlsContainer.style.display = "flex";
            }
        }
    });
