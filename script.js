
    const slideInfo = [
        {
            imageDesktop:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/688f52518acde0a5bcacfb49_slide-1.png",
            imageMobile:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/688d3df7f5e44c61ac179169_Screenshot%202025-08-01%20at%209.30.58%E2%80%AFAM.png",
            hasCard: true,
            cardTitle: "Nombre campaña",
            cardDescription:
                "Lorem ipsum dolor sit amet consectetur. Faucibus interdum aliquet ultrices enim volutpat et. Lorem ipsum dolor sit amet consectetur.",
            buttonText: "Ver más",
            redirectTo: "https://www.youtube.com/",
        },
        {
            imageDesktop:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/688f5260245ce01af107d62d_slide-2.png",
            imageMobile:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/688d3df7f5e44c61ac179169_Screenshot%202025-08-01%20at%209.30.58%E2%80%AFAM.png",
            hasCard: false,
            cardTitle: "Nombre capaña 2",
            cardDescription:
                "Lorem ipsum dolor sit amet consectetur. Faucibus interdum aliquet ultrices enim volutpat et. Lorem ipsum dolor sit amet consectetur.",
            buttonText: "Ver más",
            redirectTo: "https://www.youtube.com/",
        },
        {
            imageDesktop:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/688f5257f4dab71810807341_slide%20-3%20.png",
            imageMobile:
                "https://cdn.prod.website-files.com/66cca8ed4839f9bf6afd6d0d/688d3df7f5e44c61ac179169_Screenshot%202025-08-01%20at%209.30.58%E2%80%AFAM.png",
            hasCard: true,
            cardTitle: "Nombre campaña 3",
            cardDescription:
                "Lorem ipsum dolor sit amet consectetur. Faucibus interdum aliquet ultrices enim volutpat et. Lorem ipsum dolor sit amet consectetur.",
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
