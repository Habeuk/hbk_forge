/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@stephane888/wbu-atomique/scss/organisme/sections/theme_builder/utilitaires/mega-menu/mega-menu-drupal.js":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/@stephane888/wbu-atomique/scss/organisme/sections/theme_builder/utilitaires/mega-menu/mega-menu-drupal.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mega_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mega-menu */ "./node_modules/@stephane888/wbu-atomique/scss/organisme/sections/theme_builder/utilitaires/mega-menu/mega-menu.js");
/**
 *  Permet d'initialiser le fonctionnement sur drupal.
 */

(function (Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      if (once("HbkMegaMenu", ".hbk-mega-menu", context).length > 0) {
        const HBK = new _mega_menu__WEBPACK_IMPORTED_MODULE_0__["default"]();
        HBK.toggleSubMenu();
        HBK.addIconClose();
        HBK.clickToOpenMobileMenu();
        HBK.openModelsearch();
        HBK.listernerScroll();
      }
    },
  };
  //
})(Drupal);


/***/ }),

/***/ "./node_modules/@stephane888/wbu-atomique/scss/organisme/sections/theme_builder/utilitaires/mega-menu/mega-menu.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/@stephane888/wbu-atomique/scss/organisme/sections/theme_builder/utilitaires/mega-menu/mega-menu.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 *  Mega-menu fichier de base.
 */
class HbkMegaMenu {
  constructor() {
    //
    this.timerScroll;
  }
  /**
   * Ajoute les icones svg, à tous les elements qui possedent de
   * sous menus + un ecouter de click.
   */
  addIconSvgOnItem() {
    const items = document.querySelectorAll(".hbk-mega-menu .item");
    items.forEach((item) => {
      const submenu = item.querySelector(".hbk-mega-menu--items__sub");
      const MegaMenu = item.querySelector(".hbk-mega-menu--block");
      if (submenu || MegaMenu) {
        item.appendChild(this.generateIconSvg());
        const svgElement = item.querySelector(".js-open-close");
        this.addEventListenerToSvg(svgElement);
      }
    });
  }

  /**
   * Permet d'afficher un sous menu au click.
   */
  toggleSubMenu() {
    this.addIconSvgOnItem();
  }

  /**
   *
   * @param {*} svgElement( <svg> )
   */
  addEventListenerToSvg(svgElement) {
    const container = document.querySelector(".hbk-mega-menu");
    const element = svgElement.parentElement;
    svgElement.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const OpenMenu = element.classList.contains("open");

      if (OpenMenu) element.classList.remove("open");
      else element.classList.add("open");
      if (!OpenMenu) container.classList.add("has-open-item");
      else container.classList.remove("has-open-item");
    });
  }

  CloseAllItems(MainMenu) {
    return new Promise((resolv) => {
      const items = MainMenu.querySelectorAll(".item");
      items.forEach((item) => {
        item.classList.remove("open");
      });
      setTimeout(() => {
        resolv(true);
      }, 150);
    });
  }

  /**
   * Svg icon open close.
   * @returns
   */
  generateIconSvg() {
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //
    iconSvg.setAttribute("viewBox", "0 0 100 80");
    iconSvg.setAttribute("height", "20px");
    iconSvg.setAttribute("width", "20px");
    iconSvg.setAttribute("xml:space", "preserve");
    iconSvg.classList.add("svg-arrow");
    iconSvg.classList.add("js-open-close");
    //
    iconPath.setAttribute(
      "d",
      "M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
    );
    iconSvg.appendChild(iconPath);
    return iconSvg;
  }

  /**
   * --
   * @returns
   */
  generateIconClose() {
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    //
    iconSvg.setAttribute("viewBox", "0 0 14 14");
    iconSvg.setAttribute("height", "14px");
    iconSvg.setAttribute("width", "14px");
    iconSvg.setAttribute("focusable", false);
    iconSvg.classList.add("svg-close");
    iconSvg.classList.add("js-close");
    //
    iconPath.setAttribute("d", "M13 13L1 1M13 1L1 13");
    iconPath.setAttribute("stroke", "currentColor");
    iconPath.setAttribute("stroke-width", "1.1");
    iconPath.setAttribute("fill", "none");
    iconSvg.appendChild(iconPath);
    return iconSvg;
  }

  /**
   * --
   */
  openCloseMobileMenu(menu) {
    const body = document.querySelector("body");
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      body.classList.remove("hbk-mega-menu-open");
    } else {
      menu.classList.add("open");
      body.classList.add("hbk-mega-menu-open");
    }
  }

  /**
   * --
   */
  burgerSvgAnim(burger) {
    // const burger = document.querySelector(".hbk-mega-menu .burger__button");
    const stat = burger.classList.toggle("opened");
    burger.setAttribute("aria-expanded", stat);
  }

  /**
   * Ajoute l'icone de fermeture. (afficher generalement sur mobile)
   */
  addIconClose() {
    const MainMenus = document.querySelectorAll(".hbk-mega-menu");
    MainMenus.forEach((MainMenu) => {
      const menu = MainMenu.querySelector(".hbk-mega-menu--items");
      const burger = MainMenu.querySelector(".burger__button");
      menu.appendChild(this.generateIconClose());
      const covertDk = document.createElement("div");
      covertDk.setAttribute("class", "overlay-descktop overlay");
      menu.appendChild(covertDk);
      menu.querySelector(".overlay-descktop").addEventListener("click", () => {
        this.CloseAllItems(MainMenu);
      });
      menu.querySelector(".js-close").addEventListener("click", () => {
        this.openCloseMobileMenu(menu);
        this.burgerSvgAnim(burger);
      });
      //
      const div = document.createElement("div");
      div.setAttribute("class", "overlay overlay-mobile");
      MainMenu.appendChild(div);
      MainMenu.querySelector(".overlay-mobile").addEventListener("click", () => {
        this.openCloseMobileMenu(menu);
        this.burgerSvgAnim(burger);
      });
    });
  }
  /**
   * From burger
   */
  clickToOpenMobileMenu() {
    const MainMenus = document.querySelectorAll(".hbk-mega-menu");
    MainMenus.forEach((MainMenu) => {
      const menu = MainMenu.querySelector(".hbk-mega-menu--items");
      const burger = MainMenu.querySelector(".burger__button");
      burger.addEventListener("click", () => {
        this.openCloseMobileMenu(menu);
        this.burgerSvgAnim(burger);
      });
    });
  }

  /**
   * open formulaire
   */
  openModelsearch() {
    const body = document.querySelector("body");
    const MainMenus = document.querySelectorAll(".hbk-mega-menu");
    const openClose = (MainMenu) => {
      body.classList.toggle("hbk-mega-menu-open");
      MainMenu.classList.toggle("open-search");
    };
    if (MainMenus)
      MainMenus.forEach((MainMenu) => {
        // Add cover
        const div = document.createElement("div");
        div.setAttribute("class", "overlay overlay-search");
        div.appendChild(this.generateIconClose());
        MainMenu.appendChild(div);
        // add listener to close.
        const iconClose = MainMenu.querySelector(".overlay-search .js-close");
        if (iconClose)
          iconClose.addEventListener("click", () => {
            openClose(MainMenu);
          });
        //
        const iconSearch = MainMenu.querySelector(".hbk--icon-search");
        if (iconSearch)
          iconSearch.addEventListener("click", () => {
            openClose(MainMenu);
            // add focus in input.
            const inputSearch = MainMenu.querySelector(".blm-key-search");
            if (inputSearch) {
              inputSearch.focus();
            }
          });
      });
  }

  listernerScroll() {
    var derniere_position_de_scroll_connue = 0;
    var newPosition = 0;
    const MainMenus = document.querySelectorAll(".hbk-mega-menu");

    function faireQuelqueChose(directionDown) {
      MainMenus.forEach((MainMenu) => {
        const containerMenu = MainMenu.parentElement;
        // L'option static doit etre activée
        const actifStatic = containerMenu.classList.contains("menu-static");
        if (actifStatic) {
          //On prend le parent du menu, car la position de se dernier ne varie pas.
          const position = containerMenu.parentElement.getBoundingClientRect();
          const height = containerMenu.offsetHeight;
          const ht = containerMenu.getAttribute("data-fixed-top") ? parseInt(containerMenu.getAttribute("data-fixed-top")) + height : height;
          if (position.top <= -ht) {
            containerMenu.classList.add(["fixed-menu"]);
          } else containerMenu.classList.remove("fixed-menu");
          if (directionDown) {
            containerMenu.classList.add("up");
            containerMenu.classList.remove("down");
          } else {
            containerMenu.classList.add("down");
            containerMenu.classList.remove("up");
          }
        }
      });
    }
    window.addEventListener("scroll", function (e) {
      newPosition = window.scrollY;
      if (this.timerScroll) clearTimeout(this.timerScroll);
      this.timerScroll = setTimeout(() => {
        let directionDown = true;
        if (newPosition < derniere_position_de_scroll_connue) directionDown = false;
        faireQuelqueChose(directionDown);
        derniere_position_de_scroll_connue = newPosition;
      }, 50);
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HbkMegaMenu);


/***/ }),

/***/ "./src/scss/menu-style.scss":
/*!**********************************!*\
  !*** ./src/scss/menu-style.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/js/menu-style.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stephane888_wbu_atomique_scss_organisme_sections_theme_builder_utilitaires_mega_menu_mega_menu_drupal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stephane888/wbu-atomique/scss/organisme/sections/theme_builder/utilitaires/mega-menu/mega-menu-drupal.js */ "./node_modules/@stephane888/wbu-atomique/scss/organisme/sections/theme_builder/utilitaires/mega-menu/mega-menu-drupal.js");
/* harmony import */ var _scss_menu_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/menu-style.scss */ "./src/scss/menu-style.scss");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9tZW51LXN0eWxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrREFBVztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2xCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsR0FBRztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7O0FDN1AzQjs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTm1IIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3Rhbi1jb21waWxlci8uL25vZGVfbW9kdWxlcy9Ac3RlcGhhbmU4ODgvd2J1LWF0b21pcXVlL3Njc3Mvb3JnYW5pc21lL3NlY3Rpb25zL3RoZW1lX2J1aWxkZXIvdXRpbGl0YWlyZXMvbWVnYS1tZW51L21lZ2EtbWVudS1kcnVwYWwuanMiLCJ3ZWJwYWNrOi8vc3Rhbi1jb21waWxlci8uL25vZGVfbW9kdWxlcy9Ac3RlcGhhbmU4ODgvd2J1LWF0b21pcXVlL3Njc3Mvb3JnYW5pc21lL3NlY3Rpb25zL3RoZW1lX2J1aWxkZXIvdXRpbGl0YWlyZXMvbWVnYS1tZW51L21lZ2EtbWVudS5qcyIsIndlYnBhY2s6Ly9zdGFuLWNvbXBpbGVyLy4vc3JjL3Njc3MvbWVudS1zdHlsZS5zY3NzIiwid2VicGFjazovL3N0YW4tY29tcGlsZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3Rhbi1jb21waWxlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3Rhbi1jb21waWxlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N0YW4tY29tcGlsZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdGFuLWNvbXBpbGVyLy4vc3JjL2pzL21lbnUtc3R5bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAgUGVybWV0IGQnaW5pdGlhbGlzZXIgbGUgZm9uY3Rpb25uZW1lbnQgc3VyIGRydXBhbC5cbiAqL1xuaW1wb3J0IEhia01lZ2FNZW51IGZyb20gXCIuL21lZ2EtbWVudVwiO1xuKGZ1bmN0aW9uIChEcnVwYWwpIHtcbiAgRHJ1cGFsLmJlaGF2aW9ycy5teU1vZHVsZUJlaGF2aW9yID0ge1xuICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICBpZiAob25jZShcIkhia01lZ2FNZW51XCIsIFwiLmhiay1tZWdhLW1lbnVcIiwgY29udGV4dCkubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBIQksgPSBuZXcgSGJrTWVnYU1lbnUoKTtcbiAgICAgICAgSEJLLnRvZ2dsZVN1Yk1lbnUoKTtcbiAgICAgICAgSEJLLmFkZEljb25DbG9zZSgpO1xuICAgICAgICBIQksuY2xpY2tUb09wZW5Nb2JpbGVNZW51KCk7XG4gICAgICAgIEhCSy5vcGVuTW9kZWxzZWFyY2goKTtcbiAgICAgICAgSEJLLmxpc3Rlcm5lclNjcm9sbCgpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG4gIC8vXG59KShEcnVwYWwpO1xuIiwiLyoqXG4gKiAgTWVnYS1tZW51IGZpY2hpZXIgZGUgYmFzZS5cbiAqL1xuY2xhc3MgSGJrTWVnYU1lbnUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvL1xuICAgIHRoaXMudGltZXJTY3JvbGw7XG4gIH1cbiAgLyoqXG4gICAqIEFqb3V0ZSBsZXMgaWNvbmVzIHN2Zywgw6AgdG91cyBsZXMgZWxlbWVudHMgcXVpIHBvc3NlZGVudCBkZVxuICAgKiBzb3VzIG1lbnVzICsgdW4gZWNvdXRlciBkZSBjbGljay5cbiAgICovXG4gIGFkZEljb25TdmdPbkl0ZW0oKSB7XG4gICAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhiay1tZWdhLW1lbnUgLml0ZW1cIik7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3Qgc3VibWVudSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi5oYmstbWVnYS1tZW51LS1pdGVtc19fc3ViXCIpO1xuICAgICAgY29uc3QgTWVnYU1lbnUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIuaGJrLW1lZ2EtbWVudS0tYmxvY2tcIik7XG4gICAgICBpZiAoc3VibWVudSB8fCBNZWdhTWVudSkge1xuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKHRoaXMuZ2VuZXJhdGVJY29uU3ZnKCkpO1xuICAgICAgICBjb25zdCBzdmdFbGVtZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKFwiLmpzLW9wZW4tY2xvc2VcIik7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lclRvU3ZnKHN2Z0VsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcm1ldCBkJ2FmZmljaGVyIHVuIHNvdXMgbWVudSBhdSBjbGljay5cbiAgICovXG4gIHRvZ2dsZVN1Yk1lbnUoKSB7XG4gICAgdGhpcy5hZGRJY29uU3ZnT25JdGVtKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBzdmdFbGVtZW50KCA8c3ZnPiApXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyVG9Tdmcoc3ZnRWxlbWVudCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGJrLW1lZ2EtbWVudVwiKTtcbiAgICBjb25zdCBlbGVtZW50ID0gc3ZnRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIHN2Z0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgT3Blbk1lbnUgPSBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm9wZW5cIik7XG5cbiAgICAgIGlmIChPcGVuTWVudSkgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcbiAgICAgIGVsc2UgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcbiAgICAgIGlmICghT3Blbk1lbnUpIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGFzLW9wZW4taXRlbVwiKTtcbiAgICAgIGVsc2UgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoYXMtb3Blbi1pdGVtXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgQ2xvc2VBbGxJdGVtcyhNYWluTWVudSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2KSA9PiB7XG4gICAgICBjb25zdCBpdGVtcyA9IE1haW5NZW51LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaXRlbVwiKTtcbiAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcbiAgICAgIH0pO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc29sdih0cnVlKTtcbiAgICAgIH0sIDE1MCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3ZnIGljb24gb3BlbiBjbG9zZS5cbiAgICogQHJldHVybnNcbiAgICovXG4gIGdlbmVyYXRlSWNvblN2ZygpIHtcbiAgICBjb25zdCBpY29uU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gICAgY29uc3QgaWNvblBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XG4gICAgLy9cbiAgICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgXCIwIDAgMTAwIDgwXCIpO1xuICAgIGljb25Tdmcuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMjBweFwiKTtcbiAgICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMjBweFwiKTtcbiAgICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcInhtbDpzcGFjZVwiLCBcInByZXNlcnZlXCIpO1xuICAgIGljb25TdmcuY2xhc3NMaXN0LmFkZChcInN2Zy1hcnJvd1wiKTtcbiAgICBpY29uU3ZnLmNsYXNzTGlzdC5hZGQoXCJqcy1vcGVuLWNsb3NlXCIpO1xuICAgIC8vXG4gICAgaWNvblBhdGguc2V0QXR0cmlidXRlKFxuICAgICAgXCJkXCIsXG4gICAgICBcIk0gOTAgMjQuMjUgYyAwIC0wLjg5NiAtMC4zNDIgLTEuNzkyIC0xLjAyNSAtMi40NzUgYyAtMS4zNjYgLTEuMzY3IC0zLjU4MyAtMS4zNjcgLTQuOTQ5IDAgTCA0NSA2MC44IEwgNS45NzUgMjEuNzc1IGMgLTEuMzY3IC0xLjM2NyAtMy41ODMgLTEuMzY3IC00Ljk1IDAgYyAtMS4zNjYgMS4zNjcgLTEuMzY2IDMuNTgzIDAgNC45NSBsIDQxLjUgNDEuNSBjIDEuMzY2IDEuMzY3IDMuNTgzIDEuMzY3IDQuOTQ5IDAgbCA0MS41IC00MS41IEMgODkuNjU4IDI2LjA0MiA5MCAyNS4xNDYgOTAgMjQuMjUgelwiXG4gICAgKTtcbiAgICBpY29uU3ZnLmFwcGVuZENoaWxkKGljb25QYXRoKTtcbiAgICByZXR1cm4gaWNvblN2ZztcbiAgfVxuXG4gIC8qKlxuICAgKiAtLVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgZ2VuZXJhdGVJY29uQ2xvc2UoKSB7XG4gICAgY29uc3QgaWNvblN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICAgIGNvbnN0IGljb25QYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJwYXRoXCIpO1xuICAgIC8vXG4gICAgaWNvblN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIFwiMCAwIDE0IDE0XCIpO1xuICAgIGljb25Tdmcuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIFwiMTRweFwiKTtcbiAgICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMTRweFwiKTtcbiAgICBpY29uU3ZnLnNldEF0dHJpYnV0ZShcImZvY3VzYWJsZVwiLCBmYWxzZSk7XG4gICAgaWNvblN2Zy5jbGFzc0xpc3QuYWRkKFwic3ZnLWNsb3NlXCIpO1xuICAgIGljb25TdmcuY2xhc3NMaXN0LmFkZChcImpzLWNsb3NlXCIpO1xuICAgIC8vXG4gICAgaWNvblBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBcIk0xMyAxM0wxIDFNMTMgMUwxIDEzXCIpO1xuICAgIGljb25QYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZVwiLCBcImN1cnJlbnRDb2xvclwiKTtcbiAgICBpY29uUGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2Utd2lkdGhcIiwgXCIxLjFcIik7XG4gICAgaWNvblBhdGguc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcIm5vbmVcIik7XG4gICAgaWNvblN2Zy5hcHBlbmRDaGlsZChpY29uUGF0aCk7XG4gICAgcmV0dXJuIGljb25Tdmc7XG4gIH1cblxuICAvKipcbiAgICogLS1cbiAgICovXG4gIG9wZW5DbG9zZU1vYmlsZU1lbnUobWVudSkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICBpZiAobWVudS5jbGFzc0xpc3QuY29udGFpbnMoXCJvcGVuXCIpKSB7XG4gICAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xuICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiaGJrLW1lZ2EtbWVudS1vcGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZW51LmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xuICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKFwiaGJrLW1lZ2EtbWVudS1vcGVuXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAtLVxuICAgKi9cbiAgYnVyZ2VyU3ZnQW5pbShidXJnZXIpIHtcbiAgICAvLyBjb25zdCBidXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhiay1tZWdhLW1lbnUgLmJ1cmdlcl9fYnV0dG9uXCIpO1xuICAgIGNvbnN0IHN0YXQgPSBidXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5lZFwiKTtcbiAgICBidXJnZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBzdGF0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBam91dGUgbCdpY29uZSBkZSBmZXJtZXR1cmUuIChhZmZpY2hlciBnZW5lcmFsZW1lbnQgc3VyIG1vYmlsZSlcbiAgICovXG4gIGFkZEljb25DbG9zZSgpIHtcbiAgICBjb25zdCBNYWluTWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhiay1tZWdhLW1lbnVcIik7XG4gICAgTWFpbk1lbnVzLmZvckVhY2goKE1haW5NZW51KSA9PiB7XG4gICAgICBjb25zdCBtZW51ID0gTWFpbk1lbnUucXVlcnlTZWxlY3RvcihcIi5oYmstbWVnYS1tZW51LS1pdGVtc1wiKTtcbiAgICAgIGNvbnN0IGJ1cmdlciA9IE1haW5NZW51LnF1ZXJ5U2VsZWN0b3IoXCIuYnVyZ2VyX19idXR0b25cIik7XG4gICAgICBtZW51LmFwcGVuZENoaWxkKHRoaXMuZ2VuZXJhdGVJY29uQ2xvc2UoKSk7XG4gICAgICBjb25zdCBjb3ZlcnREayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb3ZlcnREay5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm92ZXJsYXktZGVzY2t0b3Agb3ZlcmxheVwiKTtcbiAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoY292ZXJ0RGspO1xuICAgICAgbWVudS5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXktZGVzY2t0b3BcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5DbG9zZUFsbEl0ZW1zKE1haW5NZW51KTtcbiAgICAgIH0pO1xuICAgICAgbWVudS5xdWVyeVNlbGVjdG9yKFwiLmpzLWNsb3NlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlbkNsb3NlTW9iaWxlTWVudShtZW51KTtcbiAgICAgICAgdGhpcy5idXJnZXJTdmdBbmltKGJ1cmdlcik7XG4gICAgICB9KTtcbiAgICAgIC8vXG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwib3ZlcmxheSBvdmVybGF5LW1vYmlsZVwiKTtcbiAgICAgIE1haW5NZW51LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICBNYWluTWVudS5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXktbW9iaWxlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlbkNsb3NlTW9iaWxlTWVudShtZW51KTtcbiAgICAgICAgdGhpcy5idXJnZXJTdmdBbmltKGJ1cmdlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogRnJvbSBidXJnZXJcbiAgICovXG4gIGNsaWNrVG9PcGVuTW9iaWxlTWVudSgpIHtcbiAgICBjb25zdCBNYWluTWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhiay1tZWdhLW1lbnVcIik7XG4gICAgTWFpbk1lbnVzLmZvckVhY2goKE1haW5NZW51KSA9PiB7XG4gICAgICBjb25zdCBtZW51ID0gTWFpbk1lbnUucXVlcnlTZWxlY3RvcihcIi5oYmstbWVnYS1tZW51LS1pdGVtc1wiKTtcbiAgICAgIGNvbnN0IGJ1cmdlciA9IE1haW5NZW51LnF1ZXJ5U2VsZWN0b3IoXCIuYnVyZ2VyX19idXR0b25cIik7XG4gICAgICBidXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuQ2xvc2VNb2JpbGVNZW51KG1lbnUpO1xuICAgICAgICB0aGlzLmJ1cmdlclN2Z0FuaW0oYnVyZ2VyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG9wZW4gZm9ybXVsYWlyZVxuICAgKi9cbiAgb3Blbk1vZGVsc2VhcmNoKCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICBjb25zdCBNYWluTWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhiay1tZWdhLW1lbnVcIik7XG4gICAgY29uc3Qgb3BlbkNsb3NlID0gKE1haW5NZW51KSA9PiB7XG4gICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJoYmstbWVnYS1tZW51LW9wZW5cIik7XG4gICAgICBNYWluTWVudS5jbGFzc0xpc3QudG9nZ2xlKFwib3Blbi1zZWFyY2hcIik7XG4gICAgfTtcbiAgICBpZiAoTWFpbk1lbnVzKVxuICAgICAgTWFpbk1lbnVzLmZvckVhY2goKE1haW5NZW51KSA9PiB7XG4gICAgICAgIC8vIEFkZCBjb3ZlclxuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJvdmVybGF5IG92ZXJsYXktc2VhcmNoXCIpO1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGhpcy5nZW5lcmF0ZUljb25DbG9zZSgpKTtcbiAgICAgICAgTWFpbk1lbnUuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgLy8gYWRkIGxpc3RlbmVyIHRvIGNsb3NlLlxuICAgICAgICBjb25zdCBpY29uQ2xvc2UgPSBNYWluTWVudS5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXktc2VhcmNoIC5qcy1jbG9zZVwiKTtcbiAgICAgICAgaWYgKGljb25DbG9zZSlcbiAgICAgICAgICBpY29uQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIG9wZW5DbG9zZShNYWluTWVudSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IGljb25TZWFyY2ggPSBNYWluTWVudS5xdWVyeVNlbGVjdG9yKFwiLmhiay0taWNvbi1zZWFyY2hcIik7XG4gICAgICAgIGlmIChpY29uU2VhcmNoKVxuICAgICAgICAgIGljb25TZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIG9wZW5DbG9zZShNYWluTWVudSk7XG4gICAgICAgICAgICAvLyBhZGQgZm9jdXMgaW4gaW5wdXQuXG4gICAgICAgICAgICBjb25zdCBpbnB1dFNlYXJjaCA9IE1haW5NZW51LnF1ZXJ5U2VsZWN0b3IoXCIuYmxtLWtleS1zZWFyY2hcIik7XG4gICAgICAgICAgICBpZiAoaW5wdXRTZWFyY2gpIHtcbiAgICAgICAgICAgICAgaW5wdXRTZWFyY2guZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbGlzdGVybmVyU2Nyb2xsKCkge1xuICAgIHZhciBkZXJuaWVyZV9wb3NpdGlvbl9kZV9zY3JvbGxfY29ubnVlID0gMDtcbiAgICB2YXIgbmV3UG9zaXRpb24gPSAwO1xuICAgIGNvbnN0IE1haW5NZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaGJrLW1lZ2EtbWVudVwiKTtcblxuICAgIGZ1bmN0aW9uIGZhaXJlUXVlbHF1ZUNob3NlKGRpcmVjdGlvbkRvd24pIHtcbiAgICAgIE1haW5NZW51cy5mb3JFYWNoKChNYWluTWVudSkgPT4ge1xuICAgICAgICBjb25zdCBjb250YWluZXJNZW51ID0gTWFpbk1lbnUucGFyZW50RWxlbWVudDtcbiAgICAgICAgLy8gTCdvcHRpb24gc3RhdGljIGRvaXQgZXRyZSBhY3RpdsOpZVxuICAgICAgICBjb25zdCBhY3RpZlN0YXRpYyA9IGNvbnRhaW5lck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWVudS1zdGF0aWNcIik7XG4gICAgICAgIGlmIChhY3RpZlN0YXRpYykge1xuICAgICAgICAgIC8vT24gcHJlbmQgbGUgcGFyZW50IGR1IG1lbnUsIGNhciBsYSBwb3NpdGlvbiBkZSBzZSBkZXJuaWVyIG5lIHZhcmllIHBhcy5cbiAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGNvbnRhaW5lck1lbnUucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBjb25zdCBoZWlnaHQgPSBjb250YWluZXJNZW51Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICBjb25zdCBodCA9IGNvbnRhaW5lck1lbnUuZ2V0QXR0cmlidXRlKFwiZGF0YS1maXhlZC10b3BcIikgPyBwYXJzZUludChjb250YWluZXJNZW51LmdldEF0dHJpYnV0ZShcImRhdGEtZml4ZWQtdG9wXCIpKSArIGhlaWdodCA6IGhlaWdodDtcbiAgICAgICAgICBpZiAocG9zaXRpb24udG9wIDw9IC1odCkge1xuICAgICAgICAgICAgY29udGFpbmVyTWVudS5jbGFzc0xpc3QuYWRkKFtcImZpeGVkLW1lbnVcIl0pO1xuICAgICAgICAgIH0gZWxzZSBjb250YWluZXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJmaXhlZC1tZW51XCIpO1xuICAgICAgICAgIGlmIChkaXJlY3Rpb25Eb3duKSB7XG4gICAgICAgICAgICBjb250YWluZXJNZW51LmNsYXNzTGlzdC5hZGQoXCJ1cFwiKTtcbiAgICAgICAgICAgIGNvbnRhaW5lck1lbnUuY2xhc3NMaXN0LnJlbW92ZShcImRvd25cIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lck1lbnUuY2xhc3NMaXN0LmFkZChcImRvd25cIik7XG4gICAgICAgICAgICBjb250YWluZXJNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJ1cFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgbmV3UG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgIGlmICh0aGlzLnRpbWVyU2Nyb2xsKSBjbGVhclRpbWVvdXQodGhpcy50aW1lclNjcm9sbCk7XG4gICAgICB0aGlzLnRpbWVyU2Nyb2xsID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGxldCBkaXJlY3Rpb25Eb3duID0gdHJ1ZTtcbiAgICAgICAgaWYgKG5ld1Bvc2l0aW9uIDwgZGVybmllcmVfcG9zaXRpb25fZGVfc2Nyb2xsX2Nvbm51ZSkgZGlyZWN0aW9uRG93biA9IGZhbHNlO1xuICAgICAgICBmYWlyZVF1ZWxxdWVDaG9zZShkaXJlY3Rpb25Eb3duKTtcbiAgICAgICAgZGVybmllcmVfcG9zaXRpb25fZGVfc2Nyb2xsX2Nvbm51ZSA9IG5ld1Bvc2l0aW9uO1xuICAgICAgfSwgNTApO1xuICAgIH0pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBIYmtNZWdhTWVudTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS9zY3NzL29yZ2FuaXNtZS9zZWN0aW9ucy90aGVtZV9idWlsZGVyL3V0aWxpdGFpcmVzL21lZ2EtbWVudS9tZWdhLW1lbnUtZHJ1cGFsLmpzXCI7XG5pbXBvcnQgXCIuLi9zY3NzL21lbnUtc3R5bGUuc2Nzc1wiO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9