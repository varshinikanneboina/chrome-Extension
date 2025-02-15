document.addEventListener("DOMContentLoaded", () => {
    const websiteList = document.getElementById("website-list");

    chrome.runtime.sendMessage({ action: "getData" }, (response) => {
        if (response) {
            websiteList.innerHTML = "";
            const sortedSites = Object.entries(response).sort((a, b) => b[1].timeSpent - a[1].timeSpent);

            sortedSites.forEach(([site, data]) => {
                const siteElement = document.createElement("div");
                siteElement.classList.add("site-item");

                const timeSpent = Math.round(data.timeSpent / 1000 / 60); // Convert to minutes

                siteElement.innerHTML = `
                    <strong>${site}</strong>
                    <p>Time Spent: ${timeSpent} minutes</p>
                `;
                websiteList.appendChild(siteElement);
            });
        } else {
            websiteList.innerHTML = "<p>No data available.</p>";
        }
    });
});