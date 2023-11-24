/* Published via droidandiosapps@gmail.com in response to

https://stackoverflow.com/questions/47379080/chrome-extension-that-shows-if-page-has-been-visited-before-does-it-exist-if-n
https://www.quora.com/Is-there-a-Chrome-extension-that-shows-you-when-you-last-visited-a-page
https://forums.tomshardware.com/threads/chrome-extension-that-lets-you-know-if-youve-already-visited-webpage-youre-on.3767012/

*/


const hashCode = (str) => {

   let hash = 0;

   for (let i = 0, len = str.length; i < len; i++) {

      const chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer

   }

   return hash;

}

// openedTabElseSwitchedToTab: true/false
// true: if the url (aka: tab) opened before, or the user switch to another tab
// has url that open before
const updateIconText = (url, openedTabElseSwitchedToTab) => {

   console.log(`isUpdateCount`, openedTabElseSwitchedToTab, `url`, url);

   let hasNotVisitedBefore = true;

   if (url.startsWith('https://soundcloud')) {

      // data base mainpulation...
      chrome.storage.sync.get('urlsVisited', data => { // get acess to array called "data", contain all info of all visited websites

         //console.log(`data.urlsVisited`, data.urlsVisited);

         const urlsVisited = new Map(data?.urlsVisited && Object.keys(data.urlsVisited).length > 0 ? data.urlsVisited : null);

         //console.log(`urlsVisited`, urlsVisited);

         const mapKey = hashCode(url);

         // console.log(`mapKey`, mapKey);

         const numPreviousVisits = urlsVisited.get(mapKey) || 0;

         // console.log(`numPreviousVisits`, numPreviousVisits);

         // return: true/false
         hasNotVisitedBefore = (openedTabElseSwitchedToTab && numPreviousVisits === 0) || (!openedTabElseSwitchedToTab && numPreviousVisits <= 1);

         chrome.action.setBadgeText({ text: `${ hasNotVisitedBefore ? '' : 'Seen'}` });

         if (openedTabElseSwitchedToTab) {

            urlsVisited.set(mapKey, numPreviousVisits + 1);

            // update database
            chrome.storage.sync.set({urlsVisited: [...urlsVisited]}, () => {});
         }
      });
   }
   chrome.action.setBadgeText({ text: `${ hasNotVisitedBefore ? '' : 'Seen'}` });
};


chrome.action.setBadgeBackgroundColor({ color: '#F00' }, () => {});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

   //console.log(`onUpdated`, changeInfo);

   if (changeInfo.url) {
      updateIconText(changeInfo.url, true);
   }
});

chrome.tabs.onActivated.addListener((tabId, changeInfo, tab) => {

   //console.log(`onActivated`, tabId);

   chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      updateIconText(tabs[0].url, false);
   });
});
