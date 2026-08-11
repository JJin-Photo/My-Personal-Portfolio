document.addEventListener('DOMContentLoaded', () => {
    const works = Array.isArray(window.PORTFOLIO_WORKS) ? window.PORTFOLIO_WORKS : [];
    const aboutData = window.PORTFOLIO_ABOUT && typeof window.PORTFOLIO_ABOUT === 'object' ? window.PORTFOLIO_ABOUT : null;
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
    const modalIndex = document.getElementById('modalIndex');
    const modalYear = document.getElementById('modalYear');
    const modalType = document.getElementById('modalType');
    const videoSlot = document.getElementById('modalVideoSlot');
    const comparisonSection = document.getElementById('comparisonSection');
    const comparisonStage = document.getElementById('comparisonStage');
    const comparisonBefore = document.getElementById('comparisonBefore');
    const comparisonAfter = document.getElementById('comparisonAfter');
    const comparisonRange = document.getElementById('comparisonRange');
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
    let comparisonRequestId = 0;

    const isDirectImagePath = (path) => /^(assets\/|视频封面\/)/.test(path) || /\.(avif|png|svg)$/i.test(path);

    const orientationFor = (work) => {
        const orientation = work?.orientation;
        return ['landscape', 'portrait', 'square', 'cinematic'].includes(orientation) ? orientation : 'landscape';
    };

    const isPortraitWork = (work) => orientationFor(work) === 'portrait';

    const videoUrlFor = (work) => {
        if (work?.category !== 'colorgrading' || work.type !== 'video') return '';
        return typeof work.video === 'string' ? work.video.trim() : '';
    };

    const projectTypeFor = (work) => ({
        photography: '摄影',
        stills: '剧照',
        polaroid: '宝丽来',
        film: '胶片',
        colorgrading: '调色'
    })[work?.category] || work?.categoryLabel || '创作项目';

    const comparisonFor = (work) => {
        if (work?.category !== 'colorgrading') return null;
        const before = work.beforeAfter?.before;
        const after = work.beforeAfter?.after;
        return typeof before === 'string' && before && typeof after === 'string' && after ? { before, after } : null;
    };

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

    function createPortraitPicture(portrait) {
        if (!portrait?.src) return null;
        const picture = document.createElement('picture');
        if (portrait.webp) {
            const source = document.createElement('source');
            source.type = 'image/webp';
            source.srcset = portrait.webp;
            picture.append(source);
        }
        const image = document.createElement('img');
        image.src = portrait.src;
        image.alt = portrait.alt || '';
        image.width = 640;
        image.height = 800;
        image.decoding = 'async';
        image.fetchPriority = 'high';
        picture.append(image);
        return picture;
    }

    function renderAboutData() {
        if (!aboutData) return;
        document.querySelectorAll('[data-about-field]').forEach((element) => {
            const value = aboutData[element.dataset.aboutField];
            if (typeof value === 'string') element.textContent = value;
        });

        ['heroProfilePortrait', 'aboutPortrait'].forEach((id) => {
            const target = document.getElementById(id);
            const portrait = createPortraitPicture(aboutData.portrait);
            if (target && portrait) target.replaceChildren(portrait);
        });

        const aboutRole = document.getElementById('aboutRole');
        if (aboutRole && typeof aboutData.role === 'string') {
            const [primaryRole, secondaryRole] = aboutData.role.split(/\s*\/\s*/);
            aboutRole.replaceChildren(document.createTextNode(primaryRole || ''));
            if (secondaryRole) {
                const separator = document.createElement('span');
                separator.textContent = '/';
                aboutRole.append(' ', separator, ` ${secondaryRole}`);
            }
        }

        const createTimelineEntry = (item) => {
            const entry = document.createElement('article');
            entry.className = 'about-entry';
            const period = document.createElement('time');
            period.className = 'about-entry-period';
            period.textContent = item.period || '';
            const content = document.createElement('div');
            content.className = 'about-entry-content';
            const title = document.createElement('h3');
            title.textContent = item.organization || '';
            const role = document.createElement('p');
            role.className = 'about-entry-role';
            role.textContent = item.role || '';
            content.append(title, role);
            if (item.description) {
                const description = document.createElement('p');
                description.className = 'about-entry-description';
                description.textContent = item.description;
                content.append(description);
            }
            if (Array.isArray(item.details) && item.details.length) {
                const list = document.createElement('ul');
                list.className = 'about-entry-details';
                item.details.forEach((detail) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = detail;
                    list.append(listItem);
                });
                content.append(list);
            }
            entry.append(period, content);
            return entry;
        };

        const renderTimeline = (id, entries) => {
            const container = document.getElementById(id);
            if (container && Array.isArray(entries)) container.replaceChildren(...entries.map(createTimelineEntry));
        };

        renderTimeline('aboutExperience', aboutData.experience);
        renderTimeline('aboutEducation', aboutData.education);

        const renderProjectRows = (id, entries, isStills = false) => {
            const container = document.getElementById(id);
            if (!container || !Array.isArray(entries)) return;
            container.replaceChildren(...entries.map((item) => {
                const row = document.createElement('article');
                row.className = 'about-project-row';
                const year = document.createElement('time');
                year.textContent = item.year || '';
                const heading = document.createElement('div');
                const title = document.createElement('h3');
                title.textContent = isStills ? item.title : item.name;
                heading.append(title);
                if (isStills && item.context) {
                    const context = document.createElement('p');
                    context.textContent = item.context;
                    heading.append(context);
                }
                const role = document.createElement('p');
                role.className = 'about-project-role';
                role.textContent = isStills ? item.note || '剧照' : item.role;
                row.append(year, heading, role);
                return row;
            }));
        };

        renderProjectRows('aboutProjects', aboutData.projects);
        renderProjectRows('aboutStills', aboutData.stillsExperience, true);

        const skills = document.getElementById('aboutSkills');
        if (skills && Array.isArray(aboutData.skills)) {
            const skillEntries = aboutData.skills.map((skill) => {
                const entry = document.createElement('div');
                entry.className = 'about-skill';
                const title = document.createElement('h3');
                title.textContent = skill.title;
                const summary = document.createElement('p');
                summary.className = 'about-skill-summary';
                summary.textContent = skill.summary;
                const details = document.createElement('p');
                details.className = 'about-skill-details';
                details.textContent = (skill.details || []).join(' · ');
                entry.append(title, summary, details);
                return entry;
            });
            if (Array.isArray(aboutData.tools)) {
                const tools = document.createElement('div');
                tools.className = 'about-skill about-skill-tools';
                const title = document.createElement('h3');
                title.textContent = '常用软件';
                const list = document.createElement('ul');
                list.className = 'tools-list';
                aboutData.tools.forEach((tool) => {
                    const item = document.createElement('li');
                    item.textContent = tool;
                    list.append(item);
                });
                tools.append(title, list);
                skillEntries.push(tools);
            }
            skills.replaceChildren(...skillEntries);
        }

        const credentials = document.getElementById('aboutCredentials');
        if (credentials) {
            const groups = [
                { title: '资质', items: aboutData.credentials || [], featuredIndex: 0 },
                { title: '荣誉与身份', items: aboutData.honors || [], featuredIndex: -1 }
            ].map((group) => {
                const section = document.createElement('div');
                section.className = 'about-credential-group';
                const title = document.createElement('h3');
                title.textContent = group.title;
                const list = document.createElement('ul');
                group.items.forEach((value, index) => {
                    const item = document.createElement('li');
                    item.textContent = value;
                    if (index === group.featuredIndex) item.className = 'is-featured';
                    list.append(item);
                });
                section.append(title, list);
                return section;
            });
            credentials.replaceChildren(...groups);
        }

        const contact = document.getElementById('aboutContact');
        if (contact && aboutData.contact) {
            const fields = [];
            if (aboutData.contact.email) {
                const email = document.createElement('a');
                email.href = `mailto:${aboutData.contact.email}`;
                email.textContent = aboutData.contact.email;
                fields.push(email);
            }
            if (aboutData.contact.phone) {
                const phone = document.createElement('a');
                phone.href = `tel:${aboutData.contact.phone}`;
                phone.textContent = aboutData.contact.phoneLabel || aboutData.contact.phone;
                fields.push(phone);
            }
            if (aboutData.contact.wechat) {
                const wechat = document.createElement('span');
                wechat.textContent = `微信：${aboutData.contact.wechat}`;
                fields.push(wechat);
            }
            if (aboutData.contact.location) {
                const location = document.createElement('span');
                location.textContent = `常驻：${aboutData.contact.location}`;
                fields.push(location);
            }
            contact.replaceChildren(...fields);
        }
    }

    renderAboutData();

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
        versionButton.textContent = isNew ? `${versionText} 新` : versionText;
        versionButton.setAttribute('aria-label', `查看网站更新日志，当前版本 ${versionText}`);
        const fragment = document.createDocumentFragment();
        (siteVersion.changelog || []).forEach((release) => {
            const section = document.createElement('section');
            section.className = 'changelog-release';
            const title = document.createElement('h3');
            title.textContent = release.version.startsWith('v') || release.version === '早期版本' ? release.version : `v${release.version}`;
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

    const personSchema = {
        '@type': 'Person',
        '@id': 'https://jjin-photo.github.io/My-Personal-Portfolio/#person',
        name: aboutData?.name || '计代源',
        alternateName: 'JJin',
        jobTitle: aboutData?.role || '摄影师 / 调色师',
        email: aboutData?.contact?.email ? `mailto:${aboutData.contact.email}` : undefined,
        address: aboutData?.contact?.location ? { '@type': 'PostalAddress', addressLocality: aboutData.contact.location } : undefined,
        url: 'https://jjin-photo.github.io/My-Personal-Portfolio/about.html'
    };
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [personSchema, ...works.map((work) => ({
            '@type': videoUrlFor(work) ? 'CreativeWork' : 'Photograph',
            name: work.title,
            description: work.description,
            image: work.cover,
            creator: { '@id': personSchema['@id'] },
            ...(videoUrlFor(work) ? { url: videoUrlFor(work) } : {})
        }))]
    };
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify(structuredData);
    document.head.append(schemaScript);

    function createCard(work, layoutClass = '') {
        const card = document.createElement('button');
        card.type = 'button';
        const orientation = orientationFor(work);
        card.className = `work-item orientation-${orientation}${layoutClass ? ` ${layoutClass}` : ''}`;
        card.dataset.workId = work.id;
        card.dataset.category = work.category;
        card.setAttribute('aria-label', `查看作品：${work.title}`);
        const visual = document.createElement('span');
        visual.className = `work-image ratio-${orientation}`;
        const desktopSize = layoutClass.includes('is-span-4') ? '32vw' : layoutClass.includes('is-span-6') ? '48vw' : '76vw';
        visual.append(createResponsiveImage(work.cover, work.coverAlt || `${work.title}摄影作品`, `(max-width: 700px) calc(100vw - 40px), (max-width: 1024px) calc(50vw - 42px), ${desktopSize}`));
        const overlay = document.createElement('span');
        overlay.className = 'work-overlay';
        const overlayTitle = document.createElement('span');
        overlayTitle.className = 'work-overlay-title';
        overlayTitle.textContent = work.title;
        const overlayMeta = document.createElement('span');
        overlayMeta.className = 'work-overlay-meta';
        overlayMeta.textContent = `${projectTypeFor(work)}${work.date ? ` / ${work.date}` : ''}`;
        overlay.append(overlayTitle, overlayMeta);
        visual.append(overlay);
        if (videoUrlFor(work)) {
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
        category.textContent = `${work.categoryLabel}${work.date ? ` / ${work.date}` : ''}`;
        const title = document.createElement('span');
        title.className = 'work-title';
        title.textContent = work.title;
        info.append(title, category);
        card.append(visual, info);
        return card;
    }

    function createEditorialRows(shownWorks) {
        const rows = [];
        let index = 0;
        let pairRowsSinceFeature = 0;
        let featureCount = 0;

        const addFeature = (work) => {
            const row = document.createElement('div');
            row.className = `editorial-row editorial-row--feature${featureCount % 2 ? ' is-offset' : ''}${isPortraitWork(work) ? ' is-portrait' : ''}`;
            row.append(createCard(work, 'is-feature'));
            rows.push(row);
            featureCount += 1;
            pairRowsSinceFeature = 0;
        };

        const addPair = (first, second) => {
            const row = document.createElement('div');
            row.className = 'editorial-row editorial-row--pair';
            const isMixed = isPortraitWork(first) !== isPortraitWork(second);
            const firstSpan = isMixed ? (isPortraitWork(first) ? 4 : 8) : 6;
            const secondSpan = isMixed ? (isPortraitWork(second) ? 4 : 8) : 6;
            row.append(createCard(first, `is-span-${firstSpan}`), createCard(second, `is-span-${secondSpan}`));
            rows.push(row);
            pairRowsSinceFeature += 1;
        };

        while (index < shownWorks.length) {
            const current = shownWorks[index];
            const isLast = index === shownWorks.length - 1;
            if (index === 0 || isLast || (pairRowsSinceFeature >= 3 && !isPortraitWork(current))) {
                addFeature(current);
                index += 1;
                continue;
            }
            addPair(current, shownWorks[index + 1]);
            index += 2;
        }
        return rows;
    }

    function updatePageMode() {
        document.body.classList.toggle('colorgrading-view', page === 'works' && activeFilter === 'colorgrading');
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
        updatePageMode();
        if (!grid) return;
        const shownWorks = page === 'home' ? works.filter((work) => work.selected) : works.filter((work) => activeFilter === 'all' || work.category === activeFilter);
        if (shownWorks.length) {
            grid.classList.remove('is-empty');
            grid.replaceChildren(...createEditorialRows(shownWorks));
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
        if (!activeWork || !modalImage) return;
        const hasVideo = Boolean(videoUrlFor(activeWork));
        const imagePath = hasVideo ? activeWork.cover : activeWork.images[activeIndex];
        const count = hasVideo ? 1 : activeWork.images.length;
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

    function updateComparison(value) {
        if (!comparisonStage) return;
        comparisonStage.style.setProperty('--split', `${value}%`);
    }

    const preloadImage = (source) => new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = source;
    });

    async function renderComparison(work) {
        if (!comparisonSection || !comparisonBefore || !comparisonAfter || !comparisonRange) return;
        const requestId = ++comparisonRequestId;
        const comparison = comparisonFor(work);
        comparisonSection.hidden = true;
        comparisonBefore.removeAttribute('src');
        comparisonAfter.removeAttribute('src');
        if (!comparison) return;
        const beforeSource = pathFor(comparison.before, 'large');
        const afterSource = pathFor(comparison.after, 'large');
        try {
            await Promise.all([preloadImage(beforeSource), preloadImage(afterSource)]);
        } catch {
            return;
        }
        if (requestId !== comparisonRequestId || activeWork !== work) return;
        comparisonRange.value = '50';
        updateComparison(50);
        setImageSource(comparisonBefore, comparison.before, 'large');
        setImageSource(comparisonAfter, comparison.after, 'large');
        comparisonSection.hidden = false;
    }

    function renderThumbnails() {
        if (!activeWork) return;
        const images = videoUrlFor(activeWork) ? [] : activeWork.images;
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
        if (!modal || !modalImage || !modalClose) return;
        activeWork = work;
        activeIndex = 0;
        lastFocusedElement = document.activeElement;
        modalCategory.textContent = work.categoryLabel;
        modalTitle.textContent = work.title;
        modalDescription.textContent = work.description || '';
        if (modalIndex) modalIndex.textContent = String(works.indexOf(work) + 1).padStart(2, '0');
        if (modalYear) modalYear.textContent = work.date || '—';
        if (modalType) modalType.textContent = projectTypeFor(work);
        modal.classList.toggle('is-colorgrading', work.category === 'colorgrading');
        const videoUrl = videoUrlFor(work);
        videoSlot?.replaceChildren();
        if (videoSlot && videoUrl) {
            const link = document.createElement('a');
            link.id = 'modalVideoBtn';
            link.className = 'modal-video-btn';
            link.href = videoUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = '观看视频 →';
            videoSlot.append(link);
        }
        renderComparison(work);
        showModalImage();
        modal.hidden = false;
        requestAnimationFrame(() => modal.classList.add('active'));
        document.body.classList.add('modal-open');
        modalClose.focus();
    }

    function closeModal() {
        if (!modal || !modalImage) return;
        modal.classList.remove('active');
        modal.classList.remove('is-colorgrading');
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        modalImage.removeAttribute('srcset');
        modalImage.removeAttribute('src');
        comparisonBefore?.removeAttribute('src');
        comparisonAfter?.removeAttribute('src');
        comparisonRequestId += 1;
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
    comparisonRange?.addEventListener('input', (event) => updateComparison(event.target.value));
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
        if (!modal || modal.hidden) return;
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
