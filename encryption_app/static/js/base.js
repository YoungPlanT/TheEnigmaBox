var in_development = ['GronsfeldCipher', 'AnotherMethod']

document.addEventListener('DOMContentLoaded', function() {
    const content_area = document.getElementById('algorithm_content_area');
    const methodItems = document.querySelectorAll('.method-item');
    const version = 1;

    function addVersionToUrl(url) {
        return url.includes('?') ? `${url}&v=${version}` : `${url}?v=${version}`;
    }

    async function loadContent(path_html, path_css, path_js) {
        try {
            const htmlUrl = addVersionToUrl(path_html);
            const response = await fetch(htmlUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            content_area.innerHTML = html;

            loadCSS(path_css);
            
            if (path_js) {
                await import(addVersionToUrl(path_js))
                    .then(module => {
                        if (module && module.init) {
                            module.init(); // Вызываем функцию init, если она существует
                        } else {
                            console.warn(`Module ${path_js} does not export an init function`);
                        }
                    })
                    .catch(error => {
                        console.error(`Error importing and initializing ${path_js}:`, error);
                    });
            }
        }
        catch (error) {
            console.error('Error loading content:', error);
            content_area.innerHTML = '<p>Ошибка загрузка страницы</p>'
        }
    }

    function loadContentOrFallback(method) {
        if (!method) {
            loadContent(
                `/static/encryption_app/fallback/placeholder/placeholder.html`,
                `/static/encryption_app/fallback/placeholder/css/style.css`,
                null,
            );
            return;
        }
        if (in_development.includes(method)) {
            loadContent(
                `/static/encryption_app/fallback/on_work/on_work.html`,
                `/static/encryption_app/fallback/on_work/css/style.css`,
                null,
            );
            return;
        }
        loadContent(
            `/static/encryption_app/encryption_page/encryption_page.html`,
            `/static/encryption_app/encryption_page/css/main.css`,
            `/static/encryption_app/encryption_page/js/encryptionPage_main.js`,
        );
    }

    methodItems.forEach(item => {
        item.addEventListener('click', function() {
            const selectedMethod = this.dataset.method;
            loadContentOrFallback(selectedMethod);
        })
    })

    loadContentOrFallback('');

    function loadCSS(url) {
        if (!url) { return; }
        new_url = addVersionToUrl(url);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = addVersionToUrl(url);
        document.head.appendChild(link);
    };
})