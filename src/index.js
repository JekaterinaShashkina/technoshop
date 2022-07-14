import "./index.html";
import "./card.html";
import "./cart.html";
import "./index.scss";

// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { startPagination } from "./modules/pagination";
import { getGoods, getGoodsItem } from "./modules/goodsService";
import { renderGoods } from "./modules/renderGoods";
import { renderItem } from "./modules/renderItem";
import { filter } from "./modules/filter";
import { cartControl } from "./modules/cartControl";
import { serviceCounter } from "./modules/counterControl";

try {
  const goodsList = document.querySelector(".goods__list");
  if (goodsList) {
    const paginationWrapper = document.querySelector(".pagination");

    filter(goodsList, paginationWrapper);

    goodsList.innerHTML = `
  <div class="goods__preload"> 
  <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M218.51 37.491L198.4 57.6012C182.114 41.3139 160.685 31.1773 137.763 28.9184C114.842 26.6596 91.8462 32.4184 72.6946 45.2135C53.5429 58.0087 39.4203 77.0485 32.733 99.0889C26.0457 121.129 27.2075 144.807 36.0203 166.086C44.8332 187.366 60.752 204.932 81.0642 215.791C101.376 226.65 124.825 230.13 147.416 225.638C170.006 221.146 190.34 208.96 204.953 191.157C219.566 173.353 227.554 151.034 227.556 128.001H256C256 157.615 245.731 186.312 226.945 209.203C208.158 232.094 182.015 247.763 152.971 253.541C123.926 259.318 93.777 254.845 67.6604 240.885C41.5437 226.925 21.0755 204.342 9.74309 176.983C-1.58929 149.623 -3.0846 119.181 5.51193 90.8427C14.1085 62.5045 32.265 38.0237 56.8878 21.5716C81.5106 5.11941 111.076 -2.28618 140.547 0.616635C170.018 3.51945 197.57 16.5511 218.51 37.491V37.491Z" fill="black"/>
  </svg>
  </div>
  `;

    getGoods().then(({ goods, pages, page }) => {
      renderGoods(goodsList, goods);
      startPagination(paginationWrapper, pages, page);
      cartControl({
        wrapper: goodsList,
        classAdd: "goods-item__tocart",
        classDelete: "goods-item__tocart_remove",
      });
    });
  }
} catch (e) {
  console.warn(e);
}

try {
  const card = document.querySelector(".card");
  if (card) {
    const pageURL = new URL(location);
    const id = +pageURL.searchParams.get("id");
    const preload = document.createElement("div");
    preload.className = "card__preload";
    preload.innerHTML = `
      <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M218.51 37.491L198.4 57.6012C182.114 41.3139 160.685 31.1773 137.763 28.9184C114.842 26.6596 91.8462 32.4184 72.6946 45.2135C53.5429 58.0087 39.4203 77.0485 32.733 99.0889C26.0457 121.129 27.2075 144.807 36.0203 166.086C44.8332 187.366 60.752 204.932 81.0642 215.791C101.376 226.65 124.825 230.13 147.416 225.638C170.006 221.146 190.34 208.96 204.953 191.157C219.566 173.353 227.554 151.034 227.556 128.001H256C256 157.615 245.731 186.312 226.945 209.203C208.158 232.094 182.015 247.763 152.971 253.541C123.926 259.318 93.777 254.845 67.6604 240.885C41.5437 226.925 21.0755 204.342 9.74309 176.983C-1.58929 149.623 -3.0846 119.181 5.51193 90.8427C14.1085 62.5045 32.265 38.0237 56.8878 21.5716C81.5106 5.11941 111.076 -2.28618 140.547 0.616635C170.018 3.51945 197.57 16.5511 218.51 37.491V37.491Z" fill="black"/>
      </svg>
    `;
    card.append(preload);

    serviceCounter({
      selectorWrapper: ".card__count",
      selectorNumber: ".card__number",
      selectorDec: ".card__btn-dec",
      selectorInc: ".card__btn-inc",
    });

    getGoodsItem(id)
      .then((item) => {
        renderItem(item);
        cartControl({
          classAdd: "card__add-cart",
          classCount: "card__number",
        });
        preload.remove();
        return item.category;
      })
      .then((category) => {
        return getGoods({ category });
      })
      .then((data) => {
        //console.log(data);
        renderGoods({ data, goods });
      });
  }
} catch (e) {
  console.warn(e);
}

new Swiper(".recommended__carousel", {
  spaceBetween: 30,
  slidesPerView: 5,
  slidesPerGroup: 5,
  autoHeight: true,
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
