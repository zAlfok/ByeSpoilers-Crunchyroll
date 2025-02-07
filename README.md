# Bye Spoilers - Crunchyroll
Userscript that allows you to relax and avoid any spoilers from thumbnails, titles, etc on Crunchyroll. Inspired on TimeBomb's script (https://greasyfork.org/users/160017).  

<div align="center">
    <picture>
        <img src="assets-images/logo_feature.jpg">
    </picture>
</div>

## 📖 Overview
If you use Crunchyroll and are fed up with episode titles or thumbnails (totally not spoiler-ish *wink wink*) revealing what's going to happen (probably not the most crucial part *wink wink*), or if you're scrolling through the episode list (trusting that no title or thumbnail will spoil a character's death *wink wink*) only to find out someone dies N episodes later, then this script is your new best friend! Let's break down what this script censors and how it works.

## 📷 Screenshots
Note: I am using Dark Reader (enables automatic dark mode on any site) and AdGuard (adblocker) extensions, so you may notice slight differences between the appearance in my screenshots and your actual results.

| Crunchyroll WITHOUT ByeSpoilers | Crunchyroll WITH ByeSpoilers |
|--------------------------------------------|-----------------------------------------|
| ![Imagen 1](assets-images/01_without.jpg) | ![Imagen 2](assets-images/01_with.jpg) |
| ![Imagen 3](assets-images/02_without.jpg) | ![Imagen 4](assets-images/02_with.jpg) |
| ![Imagen 5](assets-images/03_without.jpg) | ![Imagen 6](assets-images/03_with.jpg) |
| ![Imagen 7](assets-images/04_without.jpg) | ![Imagen 8](assets-images/04_with.jpg) |
| ![Imagen 9](assets-images/05_1_without.jpg) | ![Imagen 10](assets-images/05_1_with.jpg) |
| ![Imagen 11](assets-images/05_2_without.jpg) | ![Imagen 12](assets-images/05_2_with.jpg) |

## 📂 Installation
<p>In order to use the script you should install a script-manager like Violentmonkey, Tampermonkey, etc. To do this you can search on the extension store of your browser. For those mentioned on Chrome/Firefox just click the buttons below to go to their store pages:</p>

 <div align="center">   
     
[![Violentmonkey](https://img.shields.io/static/v1?label=Violentmonkey&message=for%20Chrome&color=brightgreen&logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore/detail/violentmonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)   [![Violentmonkey](https://img.shields.io/static/v1?label=Violentmonkey&message=for%20Firefox&color=orange&logo=firefox&logoColor=white)](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
 </div>

 <div align="center">   
     
[![Tampermonkey](https://img.shields.io/static/v1?label=Tampermonkey&message=for%20Chrome&color=brightgreen&logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)   [![Tampermonkey](https://img.shields.io/static/v1?label=Tampermonkey&message=for%20Firefox&color=orange&logo=firefox&logoColor=white)](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
 </div>

<br>
Then you have to install ByeSpoilers Script: <a href="https://github.com/zAlfok/ByeSpoilers-Crunchyroll/raw/master/scripts/byeSpoilers_Crunchyroll.user.js" target="_blank">
  <img src="https://img.shields.io/badge/Install-ByeSpoilers-brightgreen" alt="Install">
</a>
<br><br>
To do that make sure to click "Install + Edit" so you can modify the USER_CONFIG according to your preferences (if you'd like to).
<br><br>
<div align="center">
    <picture>
        <img src="assets-images/install_01.jpg">
    </picture>
</div>
<br>
After that, make sure to mark the checkbox "Allow edits," change the <em>USER_CONFIG</em> settings by toggling true or false for each feature, and then click the "Save" button (or press Ctrl + S) to apply the changes. <b>After each time you save the script, you must refresh Crunchyroll (if it was open)</b> to see the updates.<br><br>
<em>⚠️ NOTICE THAT, AS STATED NEXT TO THE ALLOW EDITS CHECKBOX, ANY CHANGES THAT YOU MAKE WILL BE LOST IF THE SCRIPT IS UPDATED SO YOU'LL HAVE TO SET YOUR PREFERENCES AGAIN.</em>
<br><br>
<div align="center">
    <picture>
        <img src="assets-images/install_02.jpg">
    </picture>
</div>

## 🆕 Skip in-video titles feature
A new feature has been added. The idea is that you won't have to worry even for the titles inside the same video by skipping them automatically. However, it is needed the data about the time intervals of each episode so, right now this feature is kind of useless since there are very few (about 10 by the time I'm writing this). Because of that I'll need your help. <br>
**If you are interested in contributing, please send me an email (find below in Feedback section).**

Instructions to use this feature ***(tested in Violentmonkey and Tampermonkey)***:
Change the default values of _FETCH_INSTEAD_OF_RESOURCE_ and _SKIP_EPISODE_TITLES_ in _USER_CONFIG_ to true (default values: false). Note: The rest of the options can also be customized to adjust the censorship.

<div align="center">
    <picture>
        <img src="assets-images/skip_video_howTo02.png">
    </picture>
</div>
<br>

**ALTERNATIVE:** If using Violentmonkey, you can keep _FETCH_INSTEAD_OF_RESOURCE_: false, but you'll have to "update" the script manually each time you want to see changes of the database (it will indicate that there are no updates since the script probably hasn’t changed, but we do this to update the resource, that is, the database.). *This could be useful for collaborators*.
<div align="center">
    <picture>
        <img src="assets-images/skip_video_howTo.png" width="300">
    </picture>
</div>

## ⭐ Information and features
- <b>What will it protect you from?</b><br> 
Spoilers sneaking up like ninjas in the following pages:
    - /home: Continue Watching Grid, Watchlist Grid (Hover),
    - /watchlist: Grid of Episodes (Hover)
    - /history: Grid of Episodes
    - /series: Last Episode, Grid of Episodes
    - /watch: Info wrapper, Next/Previous Episode, See More Episodes (Side and PopUp)

- <b>How’s this spoiler-shielding sorcery supposed to work?</b><br>
Since spoilers can come from all sorts of places and in all sorts of forms, fortunately, we just have to focus on 6 things: thumbnails, titles (on the site and the tab), descriptions, URL's and tooltips (when you keep your mouse over an element and it displays like a mini-mini-popup). So the script has a initial configuration section in which you can choose the level of censorship. You will be allowed to choose (in _USER_CONFIG_ as explained before) to:
    - Blur episode's thumbnails (default enabled): Notice that not all thumbnails are episode-related so just those have blur.
    - Blur episode's titles (default disabled): Notices that this will blur the entire title element, so you'll not be able to see the episode number either.
    - Blur episode's descriptions (defalut enabled): Just blurs episode-related descriptions...
    - Modify episode's titles (default enabled): It transforms the '((S#) E# - )Episode Title' pattern into '((S#) E# - )[Title Censored]'. In some elements, the season and episode numbers are not part of the title, which is why they are in parentheses. This is applied to page content, tooltips, URLs, and the browser tab. **About the URL censorship, it will modify your history entry on your browser, that means that the censored title will appear there instead of the original one**.
    - *Hide Premium Trial-related stuff (default disabled): This hides the banner (on /watch pages), the nav icon (on the top bar), and the menu button (inside the drop-down menu). Disabled by default since it's not the main purpose of the script, but might be useful to some people.
    - NEW: Skip in-video titles. A new feature in development. If you want to contribute please send me an email (could find below in Feedback section).

- <b>Which languages does it support?</b><br>
Based on Crunchyroll's language list in configuration.

- <b>Does it works 100% of time?</b><br>
Wish to say yes... but actually don't really know. It has worked 99% of the time in my tests, but it's challenging due to the dynamic way Crunchyroll structures their site. If something goes wrong, just give the page a refresh. The script is supposed to blur the entire page when it first loads (cause that's when things are the trickiest, with so much loading at once) until everything that needs to be censored is covered.

- <b>How did it start?</b><br>
I was tired of being spoiled mainly due to titles and began searching for extensions or scripts but had little luck until I found TimeBomb's script, which didn’t work well, probably due to updates on Crunchyroll’s site. So, I decided to create my own based on the latest changes of the site (around July 2024). I’m not a web developer, or even a developer; this is just a hobby, so that's why you might find some bugs as said before. 

## 🧑‍💻 Contributing
As said before, this script may have some bugs. Please report in the issues section them in order to improve the code. The current version doesn’t have comments (except for the config part) since everything was disorganized. I’ll be working on that (if you want to understand the code more than anything).
In general, any kind of contribution is greatly appreciated.

## ✉️ Feedback
If you have any feedback, you can also leave it in the issues section. It doesn't have to be a bug to contribute, as said before help is needed to finish the new skip in-video feature.
email: jose974044@gmail.com

~ An enthusiast trying to do his best ~


