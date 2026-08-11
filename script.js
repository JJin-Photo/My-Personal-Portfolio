document.addEventListener('DOMContentLoaded', () => {
    const works = Array.isArray(window.PORTFOLIO_WORKS) ? window.PORTFOLIO_WORKS : [];
    const page = document.body.dataset.page;
    const grid = document.getElementById('worksGrid');
    const filterContainer = document.getElementById('categoryFilter');
    const modal = document.getElementById('modalOverlay');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalCounter = document.getElementById('modalCounter');
    const modalThumbnails = document.getElementById('modalThumbnails');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalClose = document.getElementById('modalClose');
    const videoButton = document.getElementById('modalVideoBtn');
    const themeToggle = document.getElementById('themeToggle');
    const versionButton = document.getElementById('versionButton');
    const changelogOverlay = document.getElementById('changelogOverlay');
    const changelogClose = document.getElementById('changelogClose');
    const changelogList = document.getElementById('changelogList');
    const siteVersion = window.SITE_VERSION;
    const configuredCategories = Array.isArray(window.PORTFOLIO_CATEGORIES) ? window.PORTFOLIO_CATEGORIES : [];
    const categoryNames = configuredCategories.reduce((names, category) => ({ ...names, [category.id]: category.label }), {});
    let activeFilter = new URLSearchParams(window.location.search).get('category') || 'all';
    let activeWork = null;
    let activeIndex = 0;
    let lastFocusedElement = null;

    const isDirectImagePath = (path) => /^(assets\/|视频封面\/)/.test(path) || /\.(avif|png|svg)$/i.test(path);

    const pathFor = (path, size, extension = 'jpg') => {
        if (!path || isDirectImagePath(path)) return path;
        return `assets/images/${size}/${path.replace(/\.[^/.]+$/i, `.${extension}`)}`;
    };

    const setImageSource = (image, path, size = 'medium', extension = 'jpg') => {
        image.src = pathFor(path, size, extension);
        image.dataset.fallback = pathFor(path, size, 'jpg');
        image.classList.add('is-loading');
    };

    const createResponsiveImage = (path, alt, sizes) => {
        const picture = document.createElement('picture');
        const image = document.createElement('img');
        image.loading = 'lazy';
        image.decoding = 'async';
        image.alt = alt;
        image.sizes = sizes;
        if (isDirectImagePath(path)) {
            image.src = path;
            image.dataset.fallback = path;
        } else {
            const webp = document.createElement('source');
            webp.type = 'image/webp';
            webp.srcset = `${pathFor(path, 'thumbnail', 'webp')} 640w, ${pathFor(path, 'medium', 'webp')} 1600w`;
            webp.sizes = sizes;
            image.srcset = `${pathFor(path, 'thumbnail')} 640w, ${pathFor(path, 'medium')} 1600w`;
            setImageSource(image, path, 'thumbnail');
            picture.append(webp);
        }
        picture.append(image);
        return picture;
    };

    const updateThemeToggle = (theme) => {
        if (!themeToggle) return;
        const isDark = theme === 'dark';
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', isDark ? '切换浅色主题' : '切换深色主题');
        themeToggle.setAttribute('aria-pressed', String(isDark));
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') document.documentElement.dataset.theme = 'dark';
    updateThemeToggle(savedTheme);
    themeToggle?.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem('theme', nextTheme);
        updateThemeToggle(nextTheme);
    });

    function renderChangelog() {
        if (!versionButton || !changelogList || !siteVersion) return;
        const versionText = `v${siteVersion.version}`;
        const isNew = localStorage.getItem('lastViewedVersion') !== siteVersion.version;
        versionButton.textContent = isNew ? `${versionText} NEW` : versionText;
        versionButton.setAttribute('aria-label', `查看网站更新日志，当前版本 ${versionText}`);
        const fragment = document.createDocumentFragment();
        (siteVersion.changelog || []).forEach((release) => {
            const section = document.createElement('section');
            section.className = 'changelog-release';
            const title = document.createElement('h3');
            title.textContent = release.version.startsWith('v') || release.version === 'Earlier versions' ? release.version : `v${release.version}`;
            if (release.date) {
                const date = document.createElement('time');
                date.dateTime = release.date;
                date.textContent = release.date;
                title.append(' ', date);
            }
            const list = document.createElement('ul');
            (release.changes || []).forEach((change) => {
                const item = document.createElement('li');
                item.textContent = change;
                list.append(item);
            });
            section.append(title, list);
            fragment.append(section);
        });
        changelogList.replaceChildren(fragment);
    }

    function openChangelog() {
        if (!changelogOverlay || !versionButton || !siteVersion) return;
        localStorage.setItem('lastViewedVersion', siteVersion.version);
        renderChangelog();
        changelogOverlay.hidden = false;
        requestAnimationFrame(() => changelogOverlay.classList.add('active'));
        document.body.classList.add('changelog-open');
        changelogClose?.focus();
    }

    function closeChangelog() {
        if (!changelogOverlay) return;
        changelogOverlay.classList.remove('active');
        changelogOverlay.hidden = true;
        document.body.classList.remove('changelog-open');
        versionButton?.focus();
    }

    renderChangelog();

    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': works.map((work) => ({
            '@type': work.videoLink ? 'CreativeWork' : 'Photograph',
            name: work.title,
            description: work.description,
            image: work.cover,
            creator: { '@type': 'Person', name: '计代源', alternateName: 'JJin' },
            ...(work.videoLink ? { url: work.videoLink } : {})
        }))
    };
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify(structuredData);
    document.head.append(schemaScript);

    function createCard(work) {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'work-item';
        card.dataset.workId = work.id;
        card.setAttribute('aria-label', `查看作品：${work.title}`);
        const visual = document.createElement('span');
        visual.className = 'work-image';
        visual.append(createResponsiveImage(work.cover, work.coverAlt || `${work.title}摄影作品`, '(max-width: 600px) calc(100vw - 60px), (max-width: 1200px) calc(50vw - 70px), 25vw'));
        if (work.videoLink) {
            const icon = document.createElement('span');
            icon.className = 'play-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = '▶';
            visual.append(icon);
        } else if (work.images.length > 1) {
            const count = document.createElement('span');
            count.className = 'image-count';
            count.textContent = String(work.images.length);
            visual.append(count);
        }
        const info = document.createElement('span');
        info.className = 'work-info';
        const category = document.createElement('span');
        category.className = 'work-category';
        category.textContent = work.categoryLabel;
        const title = document.createElement('span');
        title.className = 'work-title';
        title.textContent = work.title;
        info.append(category, title);
        card.append(visual, info);
        return card;
    }

    function renderFilters() {
        if (!filterContainer) return;
        const configuredIds = configuredCategories.map((category) => category.id);
        const dynamicIds = works.map((work) => work.category).filter((category) => !configuredIds.includes(category));
        const categories = [...configuredIds, ...new Set(dynamicIds)];
        const filters = ['all', ...categories];
        if (!filters.includes(activeFilter)) activeFilter = 'all';
        const fragment = document.createDocumentFragment();
        filters.forEach((filter) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'filter-btn';
            button.dataset.filter = filter;
            button.textContent = filter === 'all' ? '全部' : categoryNames[filter] || filter;
            button.setAttribute('aria-pressed', String(filter === activeFilter));
            if (filter === activeFilter) button.classList.add('active');
            fragment.append(button);
        });
        filterContainer.replaceChildren(fragment);
    }

    function renderWorks() {
        if (!grid) return;
        const shownWorks = page === 'home' ? works.filter((work) => work.selected) : works.filter((work) => activeFilter === 'all' || work.category === activeFilter);
        if (shownWorks.length) {
            grid.classList.remove('is-empty');
            grid.replaceChildren(...shownWorks.map(createCard));
            return;
        }
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        const message = document.createElement('p');
        message.textContent = '该分类的作品正在整理中。';
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'empty-state-btn';
        button.dataset.action = 'view-all';
        button.textContent = '查看全部作品';
        emptyState.append(message, button);
        grid.classList.add('is-empty');
        grid.replaceChildren(emptyState);
    }

    function applyFilter(filter) {
        activeFilter = filter;
        const url = new URL(window.location.href);
        if (filter === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', filter);
        window.history.replaceState({}, '', url);
        renderFilters();
        renderWorks();
    }

    function imageAlt(work, index) {
        return index === 0 ? work.coverAlt : `${work.title}摄影作品，第 ${index + 1} 张`;
    }

    function showModalImage() {
        if (!activeWork) return;
        const imagePath = activeWork.videoLink ? activeWork.cover : activeWork.images[activeIndex];
        const count = activeWork.videoLink ? 1 : activeWork.images.length;
        modalImage.alt = imageAlt(activeWork, activeIndex);
        modalImage.srcset = isDirectImagePath(imagePath) ? '' : `${pathFor(imagePath, 'medium', 'webp')} 1600w, ${pathFor(imagePath, 'large', 'webp')} 2560w`;
        modalImage.sizes = '(max-width: 768px) 94vw, 80vw';
        setImageSource(modalImage, imagePath, 'medium', 'webp');
        modalCounter.textContent = `${activeIndex + 1}/${count}`;
        modalCounter.hidden = count <= 1;
        modalPrev.hidden = count <= 1;
        modalNext.hidden = count <= 1;
        renderThumbnails();
    }

    function renderThumbnails() {
        if (!activeWork) return;
        const images = activeWork.videoLink ? [] : activeWork.images;
        const fragment = document.createDocumentFragment();
        images.forEach((path, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `modal-thumbnail ${index === activeIndex ? 'active' : ''}`;
            button.setAttribute('aria-label', `查看第 ${index + 1} 张图片`);
            button.setAttribute('aria-current', String(index === activeIndex));
            const image = document.createElement('img');
            image.loading = 'lazy'; image.decoding = 'async'; image.alt = '';
            setImageSource(image, path, 'thumbnail');
            button.append(image); fragment.append(button);
        });
        modalThumbnails.replaceChildren(fragment);
    }

    function openModal(work) {
        activeWork = work;
        activeIndex = 0;
        lastFocusedElement = document.activeElement;
        modalCategory.textContent = work.categoryLabel;
        modalTitle.textContent = work.title;
        modalDescription.textContent = work.description || '';
        videoButton.hidden = !work.videoLink;
        if (work.videoLink) { videoButton.href = work.videoLink; videoButton.target = '_blank'; }
        showModalImage();
        modal.hidden = false;
        requestAnimationFrame(() => modal.classList.add('active'));
        document.body.classList.add('modal-open');
        modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        modalImage.removeAttribute('srcset'); modalImage.src = '';
        activeWork = null;
        lastFocusedElement?.focus();
    }

    function moveImage(direction) {
        if (!activeWork || activeWork.images.length < 2) return;
        activeIndex = (activeIndex + direction + activeWork.images.length) % activeWork.images.length;
        showModalImage();
    }

    grid?.addEventListener('click', (event) => {
        if (event.target.closest('[data-action="view-all"]')) {
            applyFilter('all');
            return;
        }
        const card = event.target.closest('[data-work-id]');
        const work = works.find((item) => item.id === card?.dataset.workId);
        if (work) openModal(work);
    });
    filterContainer?.addEventListener('click', (event) => {
        const filter = event.target.closest('[data-filter]')?.dataset.filter;
        if (filter) applyFilter(filter);
    });
    modalThumbnails?.addEventListener('click', (event) => {
        const button = event.target.closest('.modal-thumbnail');
        if (!button) return;
        activeIndex = [...modalThumbnails.children].indexOf(button);
        showModalImage();
    });
    modalClose?.addEventListener('click', closeModal);
    modalPrev?.addEventListener('click', () => moveImage(-1));
    modalNext?.addEventListener('click', () => moveImage(1));
    modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
    versionButton?.addEventListener('click', openChangelog);
    changelogClose?.addEventListener('click', closeChangelog);
    changelogOverlay?.addEventListener('click', (event) => { if (event.target === changelogOverlay) closeChangelog(); });
    modalImage?.addEventListener('load', () => modalImage.classList.remove('is-loading'));
    document.addEventListener('load', (event) => {
        if (!(event.target instanceof HTMLImageElement)) return;
        event.target.classList.remove('is-loading');
    }, true);
    document.addEventListener('error', (event) => {
        const image = event.target;
        if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied) return;
        image.dataset.fallbackApplied = 'true';
        image.removeAttribute('srcset');
        if (image.dataset.fallback) image.src = image.dataset.fallback;
        else image.hidden = true;
    }, true);
    document.addEventListener('keydown', (event) => {
        if (changelogOverlay && !changelogOverlay.hidden) {
            if (event.key === 'Escape') closeChangelog();
            if (event.key === 'Tab') {
                const focusable = [...changelogOverlay.querySelectorAll('button:not([hidden])')].filter((item) => !item.disabled);
                const first = focusable[0]; const last = focusable.at(-1);
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }
            return;
        }
        if (modal.hidden) return;
        if (event.key === 'Escape') closeModal();
        if (event.key === 'ArrowLeft') moveImage(-1);
        if (event.key === 'ArrowRight') moveImage(1);
        if (event.key === 'Tab') {
            const focusable = [...modal.querySelectorAll('button:not([hidden]), a:not([hidden])')].filter((item) => !item.disabled);
            const first = focusable[0]; const last = focusable.at(-1);
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });

    renderFilters();
    renderWorks();
});
