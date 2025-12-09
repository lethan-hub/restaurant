var xhr = new XMLHttpRequest();
var url = './health_article.json';
xhr.open('GET', url, true);
xhr.responseType = 'json';

// --- The fix is applying an event handler for when the data loads ---
xhr.onload = function() {
    // Check if the request was successful (HTTP status 200)
    if (xhr.status === 200) {
        // 1. Get the articles array from the response object
        var articles = xhr.response.articles;
        var articlesDiv = document.getElementById('articles');

        // Check if articles and articlesDiv exist before proceeding
        if (articles && articlesDiv) {
            
            // 2. Loop through the articles and create the HTML elements
            articles.forEach(function(article) {
                var articleDiv = document.createElement('div');
                articleDiv.classList.add('article');

                var title = document.createElement('h2');
                title.textContent = article.title;

                var description = document.createElement('p');
                description.textContent = article.description;

                var waysHeader = document.createElement('h3');
                waysHeader.textContent = 'Ways to Achieve:';

                var waysList = document.createElement('ul');
                article.ways_to_achieve.forEach(function(way) {
                    var listItem = document.createElement('li');
                    listItem.textContent = way;
                    waysList.appendChild(listItem);
                });

                var benefitsHeader = document.createElement('h3');
                benefitsHeader.textContent = 'Benefits:';

                var benefitsList = document.createElement('ul');
                article.benefits.forEach(function(benefit) {
                    var listItem = document.createElement('li');
                    listItem.textContent = benefit;
                    benefitsList.appendChild(listItem);
                });

                // 3. Append all elements to the main articleDiv
                articleDiv.appendChild(title);
                articleDiv.appendChild(description);
                articleDiv.appendChild(waysHeader);
                articleDiv.appendChild(waysList);
                articleDiv.appendChild(benefitsHeader);
                articleDiv.appendChild(benefitsList);

                // 4. Append the completed articleDiv to the main container
                articlesDiv.appendChild(articleDiv);

                // --- Removed redundant and incorrect code block below ---
                /*
                var articleDiv = document.createElement('div');
                articleDiv.classList.add('article');
                articleDiv.appendChild(title);
                */
            });
        } else {
            console.error("Could not find the 'articles' container element or the 'articles' data.");
        }
    } else {
        console.error('Request failed. Status: ' + xhr.status);
    }
};

// --- The request to send MUST be after setting up the listener ---
xhr.send();