
function loadMetaData() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value;

    const baseUrl = new URL(url).origin;

    console.log('Base URL:', baseUrl);

    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            console.group('MetaViewer Data');

            // Open Graph-URL
            const ogUrl = doc?.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? "no og:url found";
            console.log('Open Graph-URL:', ogUrl);

            // Open Graph-Site-Name
            const ogSiteName = doc?.querySelector('meta[property="og:site_name"]')?.getAttribute('content') ?? "no og:site name found";
            console.log('Open Graph-Site-Name:', ogSiteName);

            // Open Graph-Title
            const ogTitle = doc?.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? "no og:title found";
            console.log('Open Graph-Titel:', ogTitle);

            // Open Graph-Description
            const ogDescription = doc?.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? "no og:description found";
            console.log('Open Graph-Beschreibung:', ogDescription);

            // Open Graph-Image
            const ogImage = doc?.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? "no og:image found";
            const ogImageUrlSlices = ogImage?.split("/") ?? ["no og:image found"];
            const ogImageName = ogImageUrlSlices[ogImageUrlSlices.length - 1];
            console.log('Open Graph-Bild:', ogImage);


            // Title
            const title = doc?.querySelector('title')?.textContent ?? "no title found";
            console.log('Titel:', title);

            // Meta-Description
            const description = doc?.querySelector('meta[name="description"]')?.getAttribute('content') ?? "no description found";
            console.log('Meta-Beschreibung:', description);

            // Meta-Keywords
            const keywords = doc?.querySelector('meta[name="keywords"]')?.getAttribute('content') ?? "no keywords found";
            console.log('Meta-Keywords:', keywords);

            // Author
            const author = doc?.querySelector('meta[name="author"]')?.getAttribute('content') ?? "no author found";
            console.log('Autor:', author);

            console.groupEnd();

            // Result-Set
            document.getElementById("result").innerHTML = `
            <h2 id="result-title">Fetched Data:</h2>
            <div class="flex flex-between"><b>Autor:</b> <div class="flex gap-md"><span id="author" class="copyable">${author}</span><b class="pointer" onclick="copyText('${author}')">📋</b></div></div>

            <div class="flex flex-between"><b>Titel:</b> <div class="flex gap-md"><span id="title" class="copyable">${title}</span><b class="pointer" onclick="copyText('${title}')">📋</b></div></div>

            <div class="flex flex-between"><b>Meta-Keywords:</b> <div class="flex gap-md"><span id="keywords" class="copyable">${keywords}</span><b class="pointer" onclick="copyText('${keywords}')">📋</b></div></div>

            <div class="flex flex-between"><b>Meta-Beschreibung:</b> <div class="flex gap-md"><span id="description" class="copyable">${description}</span><b class="pointer" onclick="copyText('${description}')">📋</b></div></div>

            <div class="card">
                <img class="card-icon" src="${baseUrl}${ogImage}" alt="${ogImageName}">
                <div class="card-body">
                    <h3 class="card-title">${ogSiteName}/<a href="${ogUrl}">${ogTitle}</a></h3>
                    <div><b>Open Graph-Beschreibung:</b> <br> 
                        <span id="ogDescription" class="copyable">${ogDescription}</span>
                        <b class="pointer" onclick="copyText('${ogDescription}')">📋</b>
                    </div>
                </div>
            </div>
            `;

            // Show-Result
            const result = document.getElementById('result');
            result.style.setProperty('--result-display', 'block');

            // Copy-Event-Listener
            const spanElements = document.querySelectorAll('.copyable');
            spanElements.forEach(span => {
                span.addEventListener('click', copyText);
            });
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der URL:', error);
        });
}

function copyText(copy) {
    let text = typeof copy === "string" ? copy : this.innerText;

    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied:', text);
        })
        .catch(error => {
            console.error('Error copying text:', error);
        });
}