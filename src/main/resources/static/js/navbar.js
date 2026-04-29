document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-tab').forEach(function(link) {
        var href = link.getAttribute('href');
        var path = window.location.pathname;
        var isActive = (href === '/' && path === '/') || (href !== '/' && path.startsWith(href));
        if (isActive) {
            link.classList.remove('bg-transparent', 'text-gray-500', 'hover:bg-gray-100');
            link.classList.add('bg-orange-500', 'text-white', 'hover:bg-orange-600');
        }
    });
});