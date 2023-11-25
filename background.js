/* Published via droidandiosapps@gmail.com in response to

https://stackoverflow.com/questions/47379080/chrome-extension-that-shows-if-page-has-been-visited-before-does-it-exist-if-n
https://www.quora.com/Is-there-a-Chrome-extension-that-shows-you-when-you-last-visited-a-page
https://forums.tomshardware.com/threads/chrome-extension-that-lets-you-know-if-youve-already-visited-webpage-youre-on.3767012/

*/


import { checkKeyExistence, setKey, getKey } from "./addon_endpoint.js"

const hashCode = (str) => {
   let hash = 0;
   for (let i = 0, len = str.length; i < len; i++) {
      const chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
   }
   return hash;
}

const updateIconText = (url, openedTabElseSwitchedToTab) => {
   console.log(`isUpdateCount`, openedTabElseSwitchedToTab, `url`, url);

   if (url.startsWith('https://soundcloud')) {

      (async () => {
         try {
            const mapKey = hashCode(url);
            const result = await checkKeyExistence("http://localhost:3000/checkKey", mapKey);
            console.log(`mapKey`, mapKey, `exist`, result.exists); // Result will be true or false
            if(result.exists && openedTabElseSwitchedToTab) {
               //console.log('love you');
               chrome.action.setBadgeText({ text: 'Seen' });
            } else {
               //console.log('fuck you');
               setKey(mapKey, url);
               chrome.action.setBadgeText({ text: '' });
            }
         } catch (error) {
            console.error(error); // Handle errors here
         }
      })();
   }

   // != soundcloud
   chrome.action.setBadgeText({ text: '' });
};


chrome.action.setBadgeBackgroundColor({ color: '#F00' }, () => {});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
   //console.log(`onUpdated`, changeInfo);
   //setKey('sohaib', 'yyyyyy2')
   //getKey("sohaib");

   if (changeInfo.url) {
      updateIconText(changeInfo.url, true);
   }
});

chrome.tabs.onActivated.addListener((tabId, changeInfo, tab) => {
   //console.log(`onActivated`, tabId);
   //setKey('sohaib', 'yyyyyy1')
   //getKey("sohaib222");

   chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      updateIconText(tabs[0].url, false);
   });
});
