const contentConfig = {
    '': {
        html: `/static/encryption_app/fallback/placeholder/placeholder.html`,
        css: `/static/encryption_app/fallback/placeholder/css/style.css`,
        js: null,
        count: 0,
    },
    'CaesarCipher': {
        html: `/static/encryption_app/encryption_page/encryption_page.html`,
        css: `/static/encryption_app/encryption_page/css/main.css`,
        js: `/static/encryption_app/encryption_page/js/encryptionPage_main.js`,
        count: 0,
    },
    'GronsfeldCipher': {
        html: `/static/encryption_app/fallback/on_work/on_work.html`,
        css: `/static/encryption_app/fallback/on_work/css/style.css`,
        js: null,
        count: 0,
    },
    'inDevelop': {
        html: `/static/encryption_app/fallback/on_work/on_work.html`,
        css: `/static/encryption_app/fallback/on_work/css/style.css`,
        js: null,
        count: 0,
    },
    'default': {
        html: `/static/encryption_app/fallback/on_work/on_work.html`,
        css: `/static/encryption_app/fallback/on_work/css/style.css`,
        js: null,
        count: 0,
    }
}

class ContentLoader {
    constructor(version) {
        this.version = version;
        this.cache = {};
    }

    addVersionToUrl(url) {
        return url.includes('?') ? `${url}&v=${this.version}` : `${url}?v=${this.version}`;
    }

    async loadContent(path_html, path_css, path_js, count) {
        try {
            const content_area = document.getElementById('algorithm_content_area');

            if (this.cache[path_html]) {
                content_area.innerHTML = this.cache[path_html];
            } else {
                const htmlURL = this.addVersionToUrl(path_html);
                const response = await fetch(htmlURL);

                if (!response.ok){
                    throw new Error(`HTTP error! Status ${response.status}`);
                }

                const html = await response.text();
                content_area.innerHTML = html;
                this.cache[path_html] = html;
            }

            this.loadCSS(path_css);

            if (count === 0) {
                if (path_js) {
                    await this.loadJS(path_js);
                }
            }
        } catch (error) {
            console.error('Error loading content: ', error);
            content_area.innerHTML = '<p>Ошибка загрузка страницы</p>';
        }
    }

    async loadJS(path_js) {
        try {
            await import (this.addVersionToUrl(path_js))
                .then(module => {
                    if(module && module.init) {
                        module.init();
                    } 
                    else {
                        console.warn(`Module ${path_js} does not export an init function`);
                    }
                })
                .catch(error => {
                    console.error(`Eror importing and initializing ${path_js}: `, error);
                })
        } catch (error) {
            console.error('Error loading JavaScript: ', error);
        }
    }

    loadCSS(url) {
        if (!url) { return; }
        const new_url = this.addVersionToUrl(url);

        if (document.querySelector(`link[href="${new_url}"]`)) { return; }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = this.addVersionToUrl(url);
        document.head.appendChild(link);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const methodItems = document.querySelectorAll('.method-item');
    const version = 1;

    const contentLoader = new ContentLoader(version);

    function loadContentOrFallback(method) {
        const config = contentConfig[method] || contentConfig['default'];
        contentLoader.loadContent(config.html, config.css, config.js, config.count);
        
        if (contentConfig[method].count === 0) {
            contentConfig[method].count += 1;
        }
    }

    methodItems.forEach(items => {
        items.addEventListener('click', function() {
            const selectedMethod = this.dataset.method;
            loadContentOrFallback(selectedMethod);
        })
    })

    loadContentOrFallback('');
})