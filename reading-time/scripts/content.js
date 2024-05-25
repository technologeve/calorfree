const article = document.querySelector("article");

// may return null if selector doesn't match
if (article){
    const text = article.textContent;
    const wordMatchRegExp =/[^\s]+/g; // regular expression
    const words = text.matchAll(wordMatchRegExp);
    // matchAll returns iterator, now converting to array
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    // use same styling as the published info in article's header
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`;
    
    // support for API ref docs
    const heading = article.querySelector("h1");
    
    // support for article docs with date
    const date = article.querySelector("time")?.parentNode;
    
    (date ?? heading).insertAdjacentElement("afterend", badge);
    
}