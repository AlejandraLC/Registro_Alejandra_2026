// Enhanced responsive navigation, backdrop overlay handling, and touch interactions
(function () {
    // Global toggle function
    window.toggleSidebar = function () {
        document.body.classList.toggle('sidebar-expanded');
    };

    // Close sidebar when clicking outside (on backdrop overlay or outside aside)
    document.addEventListener('click', function (e) {
        if (!document.body.classList.contains('sidebar-expanded')) return;
        const aside = document.querySelector('aside');
        const toggleBtn = document.querySelector('.sidebar-toggle');
        if (aside && !aside.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
            document.body.classList.remove('sidebar-expanded');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('sidebar-expanded')) {
            document.body.classList.remove('sidebar-expanded');
        }
    });

    // Touch swipe left to close sidebar on tablets and phones
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function (e) {
        if (e.touches && e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
        if (!document.body.classList.contains('sidebar-expanded')) return;
        if (e.changedTouches && e.changedTouches.length === 1) {
            const diffX = e.changedTouches[0].clientX - touchStartX;
            const diffY = e.changedTouches[0].clientY - touchStartY;
            // Swiped left by at least 45px and mostly horizontal
            if (diffX < -45 && Math.abs(diffX) > Math.abs(diffY)) {
                document.body.classList.remove('sidebar-expanded');
            }
        }
    }, { passive: true });

    // Handle tablet orientation change & resize gracefully
    function handleResizeOrOrientation() {
        if (window.innerWidth > 1368 && !window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
            // Large desktop with mouse: remove overlay lock if active
            document.body.classList.remove('sidebar-expanded');
        }
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    window.addEventListener('orientationchange', function () {
        setTimeout(handleResizeOrOrientation, 150);
    });

    window.addEventListener('resize', function () {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    });
})();
