//mock matchMedia
export function setupWindowMatchMedia(matches){
  window.matchMedia = () => {
    return {
      matches: matches
    }
  }  
}

let localStorage = {}
export function setupLocalStorage() {
  window.localStorage = {
    setItem(key, value) {
        return Object.assign(localStorage, {[key]: value});
    },
    getItem(key) {
        return localStorage[key];
    },
    clear() {
        localStorage = {};
    }    
  }
}