const ACTIVE = ['bg-orange-500', 'text-white', 'hover:bg-orange-600'];

function activateBtn(selector, activeEl, inactive) {
    document.querySelectorAll(selector).forEach(b => {
        b.classList.remove(...ACTIVE);
        b.classList.add(...inactive);
    });
    activeEl.classList.remove(...inactive);
    activeEl.classList.add(...ACTIVE);
}

function setRange(range, btn) {
    const today = new Date();
    const fmt = d => d.toISOString().split('T')[0];
    let from = new Date(today), to = new Date(today);
    if (range === 'week') {
        from.setDate(today.getDate() - today.getDay());
        to = new Date(from); to.setDate(from.getDate() + 6);
    } else if (range === 'month') {
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }
    document.getElementById('dateFrom').value = fmt(from);
    document.getElementById('dateTo').value = fmt(to);
    activateBtn('.quick-range', btn, ['bg-transparent', 'text-gray-500', 'hover:bg-gray-100']);
}

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateFrom').value = today;
    document.getElementById('dateTo').value = today;
});

document.querySelectorAll('.report-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        const reportType = btn.dataset.report;
        document.querySelectorAll('.report-filter').forEach(b => {
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
        document.querySelectorAll('.report-section').forEach(s => {
            s.classList.toggle('hidden', s.dataset.report !== reportType);
        });
    });
});