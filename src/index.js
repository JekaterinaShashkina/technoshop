import "./index.html";
import "./card.html";
import "./cart.html";
import "./index.scss";

// import Swiper JS
import Swiper, { Thumbs, Scrollbar } from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
// import "swiper/css/pagination";
import "swiper/css/navigation";

import { pagination } from "./modules/pagination";

const paginationWrapper = document.querySelector(".pagination");

const pageURL = new URL(location);
const page = +pageURL.searchParams.get("page") || 1;

try {
  pagination(paginationWrapper, 12, page, 5);
} catch (e) {
  console.warn(e);
  console.warn("It isnt main page");
}
const thumbSwiper = new Swiper(".card__slider-thumb", {
  spaceBetween: 44,
  slidesPerView: 3,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  modules: [Scrollbar],
});
new Swiper(".card__image", {
  spaceBetween: 10,
  slidesPerView: 1,
  thumbs: {
    swiper: thumbSwiper,
    slideThumbActiveClass: "card__thumb-btn_active",
  },
  modules: [Thumbs],
});
new Swiper(".recommended__carousel", {
  spaceBetween: 30,
  slidesPerView: 5,
  slidesPerGroup: 5,
  loop: true,
  loopFillGroupWithBlank: true,

  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
