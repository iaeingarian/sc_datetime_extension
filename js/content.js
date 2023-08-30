const updatedElements = new Set();
const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            updateRelativeTimeElements();
        }
    }
});

const parentElement = document.body;
observer.observe(parentElement, { childList: true, subtree: true });

updateRelativeTimeElements();

function updateRelativeTimeElements() {
    const locale = navigator.language;
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.querySelectorAll('.relativeTime:not([data-updated])').forEach(element => {
        element.textContent = formatDate(element.getAttribute('datetime'), locale, timezone);
        element.setAttribute('data-updated', 'true');
    });
}

function formatDate(isoDateTime, locale, timezone) {
    const date = new Date(isoDateTime);
    return date.toLocaleString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezone
    });
}