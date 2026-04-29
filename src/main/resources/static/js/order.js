document.querySelectorAll('.order-filter').forEach(filter => {
    filter.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const filterValue = btn.dataset.filter;
        document.querySelectorAll('.order-filter').forEach(b => {
            b.classList.remove('border-gray-900');
            b.classList.add('border-transparent');
            b.querySelector('.cat-icon-bg').classList.replace('bg-orange-100', 'bg-gray-100');
            b.querySelector('.cat-icon').classList.replace('text-orange-500', 'text-gray-400');
            b.querySelector('.cat-label').classList.remove('font-bold', 'text-gray-900');
            b.querySelector('.cat-label').classList.add('font-normal', 'text-gray-400');
        });
        btn.classList.replace('border-transparent', 'border-gray-900');
        btn.querySelector('.cat-icon-bg').classList.replace('bg-gray-100', 'bg-orange-100');
        btn.querySelector('.cat-icon').classList.replace('text-gray-400', 'text-orange-500');
        btn.querySelector('.cat-label').classList.remove('font-normal', 'text-gray-400');
        btn.querySelector('.cat-label').classList.add('font-bold', 'text-gray-900');
        document.querySelectorAll('.order-item').forEach(item => {
            item.style.display = filterValue === 'all' || item.dataset.status === filterValue ? '' : 'none';
        });
    });
});
