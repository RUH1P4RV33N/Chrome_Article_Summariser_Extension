// Log when content script loads
console.log("content.js injected into page");

function getArticleText() {
  const article = document.querySelector("article");
  if (article) return article.innerText;

  const paragraphs = Array.from(document.querySelectorAll("p"));
  return paragraphs.map((p) => p.innerText).join("\n");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("📨 Message received in content script:", request);
  
  if (request.type === "GET_ARTICLE_TEXT") {
    const text = getArticleText();
    console.log("📤 Sending response with text length:", text.length);
    sendResponse({ text: text });
  }

  return true;
});