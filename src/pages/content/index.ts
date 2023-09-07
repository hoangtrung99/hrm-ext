function searchElementInIframes(
  documentContext: typeof document,
  elementId: string
): HTMLElement | null {
  const element = documentContext.getElementById(elementId) as HTMLElement;
  if (element) {
    return element;
  }

  const iframes = documentContext.querySelectorAll("iframe");
  for (const iframe of iframes) {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    const result = searchElementInIframes(doc as Document, elementId);
    if (result) {
      return result;
    }
  }

  return null;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "getTimeSheetElements") {
    const sheetNameEl = searchElementInIframes(document, "sheet-name");
    const timeSheetEl = searchElementInIframes(document, "time-sheet");
    const executeEl = searchElementInIframes(document, "dialog-execute-button");

    sendResponse({ sheetNameEl, timeSheetEl, executeEl });
  }
});

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
