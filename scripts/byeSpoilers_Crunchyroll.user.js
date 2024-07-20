// ==UserScript==
// @name           ByeSpoilers Crunchyroll
// @namespace      https://github.com/zAlfok/ByeSpoilers-Crunchyroll
// @match          https://www.crunchyroll.com/*
// @grant          none
// @version        1.0
// @license        GPL-3.0
// @author         Alfok
// @description    Censor episode's titles, thumbnails, descriptions and tooltips on Crunchyroll, inspired on TimeBomb's script (https://greasyfork.org/users/160017)
// @icon           https://raw.githubusercontent.com/zAlfok/ByeSpoilers-Crunchyroll/master/assets-images/logov2.png
// @run-at         document-start
// @homepageURL    https://github.com/zAlfok/ByeSpoilers-Crunchyroll
// @downloadURL    https://github.com/zAlfok/ByeSpoilers-Crunchyroll/raw/master/scripts/byeSpoilers_Crunchyroll.user.js
// @updateURL      https://github.com/zAlfok/ByeSpoilers-Crunchyroll/raw/master/scripts/byeSpoilers_Crunchyroll.user.js
// @supportURL     https://github.com/zAlfok/ByeSpoilers-Crunchyroll/issues
// ==/UserScript==

// ------------------------------------------------------------------------------------------------------------------
// To customize the script, change the USER_CONFIG object below.
// USER CONFIGS BEGIN
const debugEnable = false; // In order to see what's happening in the script, set this to true. It will log debug messages to the console.
const USER_CONFIG = {
    // true: Blur episode thumbnails on the following pages:
    // /home: Continue Watching Grid, Watchlist Grid (Hover), 
    // /watchlist: Grid of Episodes (Hover)
    // /history: Grid of Episodes
    // /series: Last Episode, Grid of Episodes
    // /watch: Next/Previous Episode, See More Episodes (Side and PopUp)
    BLUR_EPISODE_THUMBNAILS: true,

    // true: Blur episodes title on the following pages:
    // /home: Continue Watching Grid, Watchlist Grid (Hover), 
    // /watchlist: Grid of Episodes (Hover)
    // /history: Grid of Episodes
    // /series: Last Episode, Grid of Episodes
    // /watch: Next/Previous Episode, See More Episodes (Side and PopUp)
    BLUR_EPISODE_TITLES: false,

    // true: Modify episodes title to "(S#) E# - [Title Censored]" on the following pages:
    // /home: Continue Watching Grid, Continue Watching Grid (Hover), Watchlist Grid (if modifyActive is true, default is false since it's not necessary)
    // /watchlist: Grid of Episodes (if modifyActive is true, default is false since it's not necessary)
    // /history: Grid of Episodes
    // /series: Grid of Episodes, Grid of Episodes (Hover)
    // /watch: Main Title, Next/Previous Episode, See More Episodes (Side and PopUp)
    MODIFY_INSITE_EPISODE_TITLES: true,

    // true: Modify episodes title to "Anime E# - Watch on Crunchyroll" from the tab of your browser. 
    MODIFY_DOCTITLE_EPISODE_TITLE: true,

    // true: Modify episodes title when hovering over certain elements of the page to "(S#) E# - [Title Censored]":
    // /home: Continue Watching Grid
    // /watchlist: Grid of Episodes (Has to be fixed)
    // /history: Grid of Episodes
    // /series: Last Episode, Grid of Episodes 
    // /watch: Next/Previous Episode, See More Episodes (Side and PopUp)
    MODIFY_TOOLTIPS: true,

    // true: Modify URL (replaces it) if episode URL detected. WARNING: This will modify your browser history.
    MODIFY_URL_EPISODE_TITLE: true,

    // true: Blur episode description on the following pages:
    // /home: Continue Watching Grid (Hover)
    // /series: Grid of Episodes (Hover)
    // /watch: Episode Description
    BLUR_EPISODE_DESCRIPTION: true,

    // true: Removes elements related to premium trial:
    // Menu bar "TRY FREE PREMIUM" Button, Banner under player (/watch)
    HIDE_PREMIUM_TRIAL: false
};
// USER CONFIGS END, DO NOT EDIT ANYTHING BELOW
// -----------------------------------------------------------------------------------------------------------------

let docTitleCensored = false;
let urlCensored = false;
let titleCensored = false;
let cssE = '';

const cssSelectorList = {
    "THUMBNAILS": {
        "EP-IMG_HOME-CONT-WATCH_ANIME-LIST_EP-SEE-MORE-POP": {
            selector: '.card figure',
            blurAmount: 20,
            blurActive: true,
            modifyActive: false
        },
        "EP-IMG_HOME-WATCHLIST-HOVER_LIST-WATCHLIST-HOVER": {//playable-thumbnail--HKMt2 watchlist-card-image__playable-thumbnail--4RQJC
            selector: '[data-t="watch-list-card"] .watchlist-card-image__playable-thumbnail--4RQJC figure',
            blurAmount: 20,
            blurActive: true,
            modifyActive: false
        },
        "EP-IMG_EP-NEXT_EP-PREV_EP-SEE-MORE-SIDE": {
            selector: '[data-t="playable-card-mini"] figure',
            blurAmount: 20,
            blurActive: true,
            modifyActive: false
        },
        "EP-IMG_ANIME-INIT": {
            selector: '.up-next-section figure',
            blurAmount: 20,
            blurActive: true,
            modifyActive: false
        },
        "EP-IMG_LIST-HISTORY": {
            selector: '.erc-my-lists-item a .content-image-figure-wrapper__figure-sizer--SH2-x figure',
            blurAmount: 20,
            blurActive: true,
            modifyActive: false
        }
    },
    "TITLES": {
        "EP-TIT_HOME-CONT-WATCH_ANIME-LIST_EP-SEE-MORE-POP": {
            selector: '.card h4 a',
            blurAmount: 20,
            blurActive: true,
            modifyActive: true
        },
        "EP-TIT_HOME-WATCHLIST_LIST-WATCHLIST": {
            selector: '[data-t="watch-list-card"] h5',
            blurAmount: 6,
            blurActive: true,
            modifyActive: false
        },
        "EP-TIT_EP-NEXT_EP-PREV_EP-SEE-MORE-SIDE": {
            selector: '[data-t="playable-card-mini"] h4 a',
            blurAmount: 10,
            blurActive: true,
            modifyActive: true
        },
        "EP-TIT_LIST-HISTORY": {
            selector: '.erc-my-lists-item h4 a',
            blurAmount: 10,
            blurActive: true,
            modifyActive: true
        },
        "EP-TIT_PLAYER": {
            selector: '.current-media-wrapper h1',
            blurAmount: 20,
            blurActive: true,
            modifyActive: true
        },
        "EP-TIT_HOME-CONT-WATCH-HOVER_ANIME-LIST-HOVER": {
            selector: '.card [data-t="episode-title"]',
            blurAmount: 10,
            blurActive: true,
            modifyActive: true
        }
    },
    "DESCRIPTIONS": {
        "EP-DESCR_PLAYER": {
            selector: '.expandable-section__wrapper--G-ttI p',
            blurAmount: 20,
            blurActive: true,
            modifyActive: false
        },
        "EP-DESCR_HOME-WATCHLIST-HOVER_ANIME-LIST-HOVER": {
            selector: '.card [data-t="description"]',
            blurAmount: 10,
            blurActive: true,
            modifyActive: false
        }
    }
};

function concatStyleCSS() {
    if (USER_CONFIG.BLUR_EPISODE_THUMBNAILS) {
        for (let key in cssSelectorList["THUMBNAILS"]) {
            let item = cssSelectorList["THUMBNAILS"][key];
            if (item.blurActive) {
                // console.log(item.selector);
                cssE = cssE + `${item.selector} { filter: blur(${item.blurAmount}px); }`;
            }
        }
    }
    if (USER_CONFIG.BLUR_EPISODE_TITLES) {
        for (let key in cssSelectorList["TITLES"]) {
            let item = cssSelectorList["TITLES"][key];
            if (item.blurActive) {
                // console.log(item.selector);
                cssE = cssE + `${item.selector} { filter: blur(${item.blurAmount}px); }`;
            }
        }
    }
    if (USER_CONFIG.BLUR_EPISODE_DESCRIPTION) {
        for (let key in cssSelectorList["DESCRIPTIONS"]) {
            let item = cssSelectorList["DESCRIPTIONS"][key];
            if (item.blurActive) {
                // console.log(item.selector);
                cssE = cssE + `${item.selector} { filter: blur(${item.blurAmount}px); }`;
            }
        }
    }
    if (USER_CONFIG.HIDE_PREMIUM_TRIAL) {
        cssE = cssE + '.erc-user-actions > :first-child, .banner-wrapper, .button-wrapper { display: none; }';
        // cssE = cssE + 'vsc-initialized { height: 0%};'; // Debe ser evaluado con logica, no es 0 en todos los casos
    }
}

function getEpisodeTitleFromEpisodeSite() {
    const $episodeTitle = document.querySelector('.erc-current-media-info h1.title, .card h4 a ');
    const $seriesName = document.querySelector('.show-title-link h4, .hero-heading-line h1'); // show-title-link is series name on episode player page, .hero-heading-line is series name on series episode list page
    let episodeTitle = "";
    let episodeNumber = "";
    let seriesName = $seriesName?.textContent ?? "";
    if ($episodeTitle?.textContent) {
        episodeTitle = $episodeTitle.textContent.split(' - ');
        if (episodeTitle.length > 0) {
            episodeNumber = episodeTitle[0];
            episodeTitle = episodeTitle[1];
        } else {
            if (debugEnable) {
                console.warn('[ByeSpoilers - Crunchyroll Script] DEBUG: Unable to censor episode name in document title, received unexpected episode name format:', $episodeTitle.textContent)
            }
        }
    }
    return [episodeNumber, episodeTitle, seriesName];
}

function censorUrl() {
    let [episodeNumber, episodeTitle, seriesName] = getEpisodeTitleFromEpisodeSite();
    // console.log("CENSORURL: episodeNumber: ", episodeNumber, "episodeTitle: ", episodeTitle, "seriesName: ", seriesName);
    // console.log("CENSORURL: entre a censorURL")
    if (isEpisodePage()) {
        // console.log("CENSORURL: Es una pagina de episodio")
        // console.log("CENSORURL: episodeNumber: ", episodeNumber, "episodeTitle: ", episodeTitle, "seriesName: ", seriesName);
        window.history.replaceState(null, '', `censored-${seriesName.replace(/ /g, "_")}-${episodeNumber}`);
        urlCensored = true;
    } else {
        // console.log("CENSORURL: NO es una pagina de episodio")
    }
}

function censorDocTitle() {
    // console.log("CENSORDOCTITLE: entre a censorDocTitle")
    let crunchyLang = document.documentElement.lang
    const episodeRegexList = {
        "ar": /شاهد على كرانشي رول$/,
        "de": /Schau auf Crunchyroll$/,
        "en": /Watch on Crunchyroll$/,
        "es": /Ver en Crunchyroll en español$/,
        "es-es": /Ver en Crunchyroll en castellano$/,
        "fr": /Regardez sur Crunchyroll$/,
        "it": /Guardalo su Crunchyroll$/,
        "pt-br": /Assista na Crunchyroll$/,
        "pt-pt": /Assiste na Crunchyroll$/,
        "ru": /смотреть на Crunchyroll$/,
        "hi": /क्रंचीरोल पर देखें$/
    }
    const episodeRegex = episodeRegexList[crunchyLang];
    const censoredTitle = `[Episode Name Censored] - ${episodeRegexList[crunchyLang].toString().slice(1,-2)}`; //V20240715 - Dynamic episodeRegex

    let [episodeNumber, episodeTitle, seriesName] = getEpisodeTitleFromEpisodeSite();

    let newDocTitle;
    if (document.title !== censoredTitle && episodeRegex.test(document.title)) {
        if (debugEnable) {
            console.log('[ByeSpoilers - Crunchyroll Script] DEBUG: Censoring document.title, original is:', document.title, 'episode name is:', episodeTitle);
        }
        if (!!seriesName) {
            if (episodeNumber !== false) {
                newDocTitle = `${seriesName} ${episodeNumber} - ${episodeRegexList[crunchyLang].toString().slice(1, -2)}`; //V20240715 - Dynamic episodeRegex
            } else {
                newDocTitle = `${seriesName} - ${episodeRegexList[crunchyLang].toString().slice(1, -2)}`; //V20240715 - Dynamic episodeRegex
            }
        } else {
            if (debugEnable) {
                console.warn('[ByeSpoilers - Crunchyroll Script] DEBUG: Unable to include series name in title of censored episode, series name not found on page');
            }
            newDocTitle = `[Censored Episode Name] - ${episodeRegexList[crunchyLang].toString().slice(1,-2)}`; //V20240715 - Dynamic episodeRegex
        }
    }
    if (newDocTitle && newDocTitle !== document.title) {
        document.title = newDocTitle;
        docTitleCensored = true;
    }
}

function censorTooltips() {
    const tooltipTitles = document.querySelectorAll(
        '.card div a[title], ' + // TOOLTIPS_HOME-CONT-WATCH_ANIME-LIST_EP-SEE-MORE-POP
        '[data-t="playable-card-mini"] a[title], ' + //TOOLTIPS_EP-NEXT_EP-PREV_EP-SEE-MORE-SIDE
        '.erc-my-lists-item a[title], ' + //TOOLTIPS_WATCHLIST_HISTORY
        '.erc-series-hero a[title] '  //TOOLTIPS_SERIES
    );
    if (tooltipTitles.length === 0) {
        // console.log("No se encontraron elementos con tooltip");
        return;
    }
    tooltipTitles.forEach(element => {
        const originalTitle = element.getAttribute('title');

        if (originalTitle.includes('[Title Censored]')) {
            // console.log('CENSORTOOLTIPS: Elemento ya censurado: ', originalTitle);
            return;
        }
        parts = originalTitle.split(' - ');
        let newTitle = parts.length > 1 ? parts[0]+" - [Title Censored]" : "[Title Censored]";
        element.setAttribute('title', newTitle);
    });
    // console.log("Censuré todos los elementos tooltip con titulo");
}

function isHomePage() {
    let currentPath = window.location.pathname;
    //console.log("ISHOMEPAGE: current path is: ", currentPath);
    return (currentPath === "/es" || currentPath === "/es/" || currentPath == "/");
}

function isSeriesPage() {
    let currentPath = window.location.pathname;
    // console.log("ISSERIESPAGE: current path is: ", currentPath);
    return currentPath.includes('/series');
}

function isHistoryPage() {
    let currentPath = window.location.pathname;
    // console.log("ISHISTORYPAGE: current path is: ", currentPath);
    return currentPath.includes('/history');
}

function isEpisodePage() {
    let currentPath = window.location.pathname;
    // console.log("ISEPISODEPAGE: current path is: ", currentPath);
    return currentPath.includes('/watch/');
}

function isWatchlistPage() {
    let currentPath = window.location.pathname;
    // console.log("ISWATCHLIST: current path is: ", currentPath);
    return currentPath.includes('/watchlist');
}

function isOtherPage() {
    let currentPath = window.location.pathname;
    // console.log("ISOTHERPAGE: current path is: ", currentPath);
    return !(isHomePage() || isSeriesPage() || isHistoryPage() || isEpisodePage() || isWatchlistPage());
}

function censorTitleGeneric(selector) {
    const elementsWithTitle = document.querySelectorAll(selector);
    if (elementsWithTitle.length === 0) {
        // console.log("No se encontraron elementos");
        return;
    }
    elementsWithTitle.forEach(element => {
        const content = element.textContent;
        if (content.includes("[Title Censored]")) {
            // console.log("El título ya ha sido censurado");
            return; 
        }
        const parts = content.split(" - ");
        let newContent = parts.length > 1 ? parts[0] + " - [Title Censored]" : "[Title Censored]";
        element.textContent = newContent;
    });
    // console.log("Censuré todos los elementos");
    titleCensored = true;
}

function isLogged() {
    if (document.querySelector('.user-menu-account-section')) {
        // console.log('El usuario está logueado');
        return true;
    } else {
        // console.log('El usuario no está logueado');
        return false;
    }
}

// Main code block

try {
    console.log('ByeSpoilers - Crunchyroll script loaded')

    document.documentElement.style.filter = 'blur(2px)';
    // Blur the page while the script is loading

    // Apply cssE style to the page
    try {
        concatStyleCSS();
        var $newStyleE = document.createElement('style');
        var cssNodeE = document.createTextNode(cssE);
        $newStyleE.appendChild(cssNodeE);
        document.head.appendChild($newStyleE);
    } catch (e) {
        if (debugEnable) {
            console.error('[ByeSpoilers - Crunchyroll Script] DEBUG: CSS Error:', e);
        }
    }

    window.addEventListener('load', function () {

        new MutationObserver(() => {
            const homeContinueWatching = document.querySelector('.erc-feed-continue-watching-item');
            const historyListSite = document.querySelector('.erc-history-content')
            let notLogged = !isLogged();
            let notHomeContinueWatchingOnHomePage = isHomePage() && !homeContinueWatching;
            let notHistoryListSiteOnHistoryPage = isHistoryPage() && !historyListSite;
            
            if (notLogged || notHomeContinueWatchingOnHomePage || notHistoryListSiteOnHistoryPage) {
                // console.log("not logged: ", notLogged, "\nnot home continue watching on home page: ", notHomeContinueWatchingOnHomePage, "\nnot history list site on history page: ", notHistoryListSiteOnHistoryPage);
                document.documentElement.style.filter = 'none';
            } else {
                // Verificación si el título debe estar censurado
                let isTitleCensorshipNeeded = isHomePage() || isHistoryPage() || isSeriesPage() || isEpisodePage();
                let isTitleCensoredCorrectly = !isTitleCensorshipNeeded || titleCensored;

                // Verificación si la URL debe estar censurada (solo en la página de episodios)
                let isUrlCensorshipNeeded = isEpisodePage();
                let isUrlCensoredCorrectly = !isUrlCensorshipNeeded || urlCensored;

                // Verificación si el docTitle debe estar censurado (solo en la página de episodios)
                let isDocTitleCensorshipNeeded = isEpisodePage();
                let isDocTitleCensoredCorrectly = !isDocTitleCensorshipNeeded || docTitleCensored;

                // Verificación final
                if (!isTitleCensoredCorrectly || !isUrlCensoredCorrectly || !isDocTitleCensoredCorrectly) {
                    // console.log("Una o más condiciones de censura no se cumplen.");
                    // Aquí el código a ejecutar si alguna condición de censura no se cumple
                    document.documentElement.style.filter = '2px';
                } else {
                    // console.log("Todas las condiciones de censura se cumplen.");
                    // Aquí el código a ejecutar si todas las condiciones de censura se cumplen
                }
            }

            // No funciona a nivel de css <style>, por lo que se hace a nivel de elemento
            const botonWrapper = document.querySelector('.button-wrapper');
            if (USER_CONFIG.HIDE_PREMIUM_TRIAL && botonWrapper) {
                botonWrapper.style.display = 'none';
            }
            const iconWrapper = document.querySelector('.erc-user-actions > :first-child');
            if (USER_CONFIG.HIDE_PREMIUM_TRIAL && iconWrapper) {
                iconWrapper.style.display = 'none';
            }
            const fondo = document.querySelector('.vsc-initialized');
            if (USER_CONFIG.HIDE_PREMIUM_TRIAL && fondo && isEpisodePage()) {
                fondo.style.height = '0%';
            } else {
                fondo.style.height = '100%';
            }

            if  (
                    (isHomePage() && (USER_CONFIG.MODIFY_INSITE_EPISODE_TITLES ? titleCensored : true)) ||
                    (isEpisodePage() && (USER_CONFIG.MODIFY_INSITE_EPISODE_TITLES ? titleCensored : true) && 
                                        (USER_CONFIG.MODIFY_DOCTITLE_EPISODE_TITLE ? docTitleCensored : true) &&
                                        (USER_CONFIG.MODIFY_URL_EPISODE_TITLE ? urlCensored : true)) ||
                    (isSeriesPage() && (USER_CONFIG.MODIFY_INSITE_EPISODE_TITLES ? titleCensored : true)) ||
                    (isHistoryPage() && (USER_CONFIG.MODIFY_INSITE_EPISODE_TITLES ? titleCensored : true)) ||
                    (isWatchlistPage()) ||
                    (isOtherPage())
                ){
                // console.log("Ya censuré todo lo pedido, me voy");
                document.documentElement.style.filter = 'blur(0px)';
            }

            const targetToolTip = document.querySelector('.app-body-wrapper');
            if (USER_CONFIG.MODIFY_TOOLTIPS && targetToolTip) {
                censorTooltips();
            }
            const targetDocTitle = document.querySelector('head > title');
            if (USER_CONFIG.MODIFY_DOCTITLE_EPISODE_TITLE && targetDocTitle) {
                censorDocTitle();
            }
            if (USER_CONFIG.MODIFY_URL_EPISODE_TITLE && targetDocTitle) {
                censorUrl();
            }
            if (USER_CONFIG.MODIFY_INSITE_EPISODE_TITLES) {
                for (let key in cssSelectorList["TITLES"]) {
                    if (cssSelectorList["TITLES"][key]["modifyActive"]) {
                        const selectorString = cssSelectorList["TITLES"][key]["selector"];
                        const targetPlayerTitle = document.querySelector(selectorString);
                        if (USER_CONFIG.MODIFY_INSITE_EPISODE_TITLES && targetPlayerTitle) {
                            censorTitleGeneric(selectorString);
                        }
                    }
                }
            }
        }).observe(document.body, { subtree: true, childList: true });
    });


} catch (e) {
    console.error('[ByeSpoilers - Crunchyroll Script] There was an error loading the script. If this causes noticeable issues, please leave feedback including this error:', e);
    throw e;
}