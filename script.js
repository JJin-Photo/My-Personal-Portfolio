document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    const themeToggle = document.getElementById('themeToggle');

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    function applyFilter(filter) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const targetButton = Array.from(filterButtons).find(btn => btn.getAttribute('data-filter') === filter);
        if (targetButton) {
            targetButton.classList.add('active');
        }
        
        workItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            applyFilter(filter);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        applyFilter(categoryParam);
    }

    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', smoothScroll);
        }
    });

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalCounter = document.getElementById('modalCounter');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalThumbnails = document.getElementById('modalThumbnails');

    let currentImages = [];
    let currentIndex = 0;
    let currentDescription = '';

    workItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.querySelector('.work-category').textContent;
            const title = item.querySelector('.work-title').textContent;
            const imagesData = item.getAttribute('data-images');
            const description = item.getAttribute('data-description') || '';
            
            currentImages = imagesData ? JSON.parse(imagesData) : [item.querySelector('.work-image img').src];
            currentIndex = 0;
            currentDescription = description;
            
            modalCategory.textContent = category;
            modalTitle.textContent = title;
            updateModal();
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function updateModal() {
        if (currentImages.length > 0) {
            modalImage.src = currentImages[currentIndex];
            modalCounter.textContent = `${currentIndex + 1}/${currentImages.length}`;
            
            if (modalDescription) {
                modalDescription.textContent = currentDescription;
                modalDescription.style.display = currentDescription ? 'block' : 'none';
            }
            
            modalPrev.style.display = currentImages.length > 1 ? 'flex' : 'none';
            modalNext.style.display = currentImages.length > 1 ? 'flex' : 'none';
            modalCounter.style.display = currentImages.length > 1 ? 'block' : 'none';
            
            modalThumbnails.innerHTML = '';
            if (currentImages.length > 1) {
                currentImages.forEach((img, index) => {
                    const thumbnail = document.createElement('img');
                    thumbnail.src = img;
                    thumbnail.className = `modal-thumbnail ${index === currentIndex ? 'active' : ''}`;
                    thumbnail.addEventListener('click', () => {
                        currentIndex = index;
                        updateModal();
                    });
                    modalThumbnails.appendChild(thumbnail);
                });
            }
        }
    }

    function prevImage() {
        if (currentImages.length > 1) {
            currentIndex = currentIndex === 0 ? currentImages.length - 1 : currentIndex - 1;
            updateModal();
        }
    }

    function nextImage() {
        if (currentImages.length > 1) {
            currentIndex = currentIndex === currentImages.length - 1 ? 0 : currentIndex + 1;
            updateModal();
        }
    }

    modalPrev.addEventListener('click', prevImage);
    modalNext.addEventListener('click', nextImage);

    document.addEventListener('keydown', (e) => {
        if (modalOverlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});