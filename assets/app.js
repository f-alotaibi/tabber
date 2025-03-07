function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL('/_favicon/'));
    url.searchParams.set('pageUrl', u);
    url.searchParams.set('size', '64');
    return url.toString()
}

document.addEventListener("DOMContentLoaded", () => {
    chrome.topSites.get((sites) => {
        const topSites = document.getElementById("top-sites");
        topSites.innerHTML = ``
        sites.forEach(site => {
            topSites.innerHTML += `<a href="${site.url}" class="p-2 flex gap-2 flex-col items-center">
                <div class="p-4 bg-item-light-background hover:bg-item-light-background-hover dark:bg-item-dark-background dark:hover:bg-item-dark-background-hover rounded-xl">
                    <img src="${faviconURL(site.url)}" class="w-[32px] h-[32px]" alt="Favicon for ${site.url}"/>
                </div>
                <p class="font-bold text-xs font-poppins truncate max-w-[80px]">${site.title || site.url}</p>
            </a>`
        });
    });
    
    runClockTask()
});


const clock = document.getElementById("clock")
const date = document.getElementById("date")
const dateOptions = { weekday: "long", month: "short", day: "numeric" };
var clockTime = clock.innerText
var dateTime = date.innerText
function runClockTask() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    if (clockTime != `${h}:${("0" + m).slice(-2)}`) {
        clockTime = `${h}:${("0" + m).slice(-2)}`
        clock.innerText = clockTime
    }
    if (dateTime != today.toLocaleDateString("en-US", dateOptions)) {
        dateTime = today.toLocaleDateString("en-US", dateOptions)
        date.innerText = dateTime
    }
    setInterval(runClockTask, 50)
}