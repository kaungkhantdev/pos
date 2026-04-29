// Countdown timer (segmented display)
function startCountdown(durationSecs) {
    const elH = document.getElementById('cd-h');
    const elM = document.getElementById('cd-m');
    const elS = document.getElementById('cd-s');
    if (!elH || !elM || !elS) return;
    let remaining = durationSecs;
    const tick = () => {
        if (remaining <= 0) {
            elH.textContent = '00'; elM.textContent = '00'; elS.textContent = '00';
            return;
        }
        elH.textContent = String(Math.floor(remaining / 3600)).padStart(2, '0');
        elM.textContent = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
        elS.textContent = String(remaining % 60).padStart(2, '0');
        remaining--;
        setTimeout(tick, 1000);
    };
    tick();
}
startCountdown(12 * 3600 + 10 * 60 + 9);

// Pagination state
const PAGE_SIZE = 8;
let currentPage = 1;
let activeCat = 'all';

function getFilteredItems() {
    return Array.from(document.querySelectorAll('.product-item')).filter(card =>
        (activeCat === 'all' || card.dataset.cat === activeCat) &&
        card.dataset.filtered !== 'hide'
    );
}

function renderPage(page) {
    currentPage = page;
    const items = getFilteredItems();
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    currentPage = Math.min(currentPage, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    // Hide all, show only current page items
    document.querySelectorAll('.product-item').forEach(card => card.style.display = 'none');
    items.forEach((card, i) => {
        card.style.display = (i >= start && i < end) ? '' : 'none';
    });

    // Update info
    const from = items.length === 0 ? 0 : start + 1;
    const to = Math.min(end, items.length);
    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) pageInfo.textContent =
        items.length === 0 ? 'No items' : `Showing ${from}–${to} of ${items.length} items`;

    // Render page buttons
    const bar = document.getElementById('pageButtons');
    if (!bar) return;

    // Prev button
    const prev = document.createElement('button');
    prev.className = 'join-item btn btn-xs h-8 min-h-0 border-gray-200 bg-white text-gray-500 hover:bg-gray-100' + (currentPage === 1 ? ' btn-disabled opacity-40' : '');
    prev.innerHTML = '<i class="hgi-stroke hgi-arrow-left-01 text-xs"></i>';
    prev.onclick = () => { if (currentPage > 1) renderPage(currentPage - 1); };
    bar.appendChild(prev);

    // Page number buttons (show up to 5 around current)
    const range = 2;
    for (let p = 1; p <= totalPages; p++) {
        if (p === 1 || p === totalPages || (p >= currentPage - range && p <= currentPage + range)) {
            const btn = document.createElement('button');
            btn.className = 'join-item btn btn-xs h-8 min-h-0 border-gray-200 ' +
                (p === currentPage ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' : 'bg-white text-gray-600 hover:bg-gray-100');
            btn.textContent = p;
            btn.onclick = ((_p) => () => renderPage(_p))(p);
            bar.appendChild(btn);
        } else if (
            (p === currentPage - range - 1 && p > 1) ||
            (p === currentPage + range + 1 && p < totalPages)
        ) {
            const dots = document.createElement('button');
            dots.className = 'join-item btn btn-xs h-8 min-h-0 border-gray-200 bg-white text-gray-400 btn-disabled';
            dots.textContent = '…';
            bar.appendChild(dots);
        }
    }

    // Next button
    const next = document.createElement('button');
    next.className = 'join-item btn btn-xs h-8 min-h-0 border-gray-200 bg-white text-gray-500 hover:bg-gray-100' + (currentPage === totalPages ? ' btn-disabled opacity-40' : '');
    next.innerHTML = '<i class="hgi-stroke hgi-arrow-right-01 text-xs"></i>';
    next.onclick = () => { if (currentPage < totalPages) renderPage(currentPage + 1); };
    bar.appendChild(next);

    // Hide bar if only 1 page
    const paginationBar = document.getElementById('paginationBar');
    if (paginationBar) paginationBar.style.display = totalPages <= 1 ? 'none' : '';
}

// Category filter
function filterCat(btn, cat) {
    document.querySelectorAll('.category-btn').forEach(b => {
        b.classList.remove('border-gray-900');
        b.classList.add('border-transparent');
        b.querySelector('.cat-icon-bg').classList.remove('bg-orange-100');
        b.querySelector('.cat-icon-bg').classList.add('bg-gray-100');
        b.querySelector('.cat-icon').classList.remove('text-orange-500');
        b.querySelector('.cat-icon').classList.add('text-gray-400');
        b.querySelector('.cat-label').classList.remove('font-bold', 'text-gray-900');
        b.querySelector('.cat-label').classList.add('font-normal', 'text-gray-400');
    });
    btn.classList.remove('border-transparent');
    btn.classList.add('border-gray-900');
    btn.querySelector('.cat-icon-bg').classList.remove('bg-gray-100');
    btn.querySelector('.cat-icon-bg').classList.add('bg-orange-100');
    btn.querySelector('.cat-icon').classList.remove('text-gray-400');
    btn.querySelector('.cat-icon').classList.add('text-orange-500');
    btn.querySelector('.cat-label').classList.remove('font-normal', 'text-gray-400');
    btn.querySelector('.cat-label').classList.add('font-bold', 'text-gray-900');

    activeCat = cat;
    renderPage(1);
}

// Init
renderPage(1);

// ── Filter / Sort ──────────────────────────────────────────────
let filterOpen = false;
let activeSort  = 'default';
let maxPrice    = 20;
let inStockOnly = false;

function toggleFilter() {
    filterOpen = !filterOpen;
    const panel = document.getElementById('filterPanel');
    const wrap  = document.getElementById('filterIconWrap');
    const icon  = document.getElementById('filterIcon');
    panel.classList.toggle('hidden', !filterOpen);
    wrap.classList.toggle('bg-orange-100', filterOpen);
    wrap.classList.toggle('bg-gray-100',  !filterOpen);
    icon.classList.toggle('text-orange-500', filterOpen);
    icon.classList.toggle('text-gray-400',   !filterOpen);
}

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (filterOpen && !document.getElementById('filterContainer').contains(e.target)) {
        filterOpen = false;
        document.getElementById('filterPanel').classList.add('hidden');
        document.getElementById('filterIconWrap').classList.replace('bg-orange-100','bg-gray-100');
        document.getElementById('filterIcon').classList.replace('text-orange-500','text-gray-400');
    }
});

function setSort(btn, sort) {
    activeSort = sort;
    document.querySelectorAll('.sort-btn').forEach(b => {
        b.classList.remove('bg-orange-500','text-white');
        b.classList.add('bg-white','text-gray-600');
    });
    btn.classList.add('bg-orange-500','text-white');
    btn.classList.remove('bg-white','text-gray-600');
}

function updatePrice(val) {
    maxPrice = parseFloat(val);
    document.getElementById('priceLabel').textContent = '$' + parseFloat(val).toFixed(2);
}

function applyFilters() {
    inStockOnly = document.getElementById('inStockOnly').checked;
    const items = Array.from(document.querySelectorAll('.product-item'));

    // Show/hide by price & stock
    items.forEach(card => {
        const price = parseFloat(card.querySelector('.font-bold.text-gray-900')?.textContent.replace('$','')) || 0;
        const availText = card.querySelector('.badge')?.textContent || '';
        const qty = parseInt(availText.replace(/\D/g,'')) || 0;
        const priceOk = price <= maxPrice;
        const stockOk = !inStockOnly || qty >= 10;
        card.dataset.filtered = (priceOk && stockOk) ? 'show' : 'hide';
    });

    // Sort visible items in DOM
    const grid = document.getElementById('productGrid');
    const visible = items.filter(c => c.dataset.filtered !== 'hide');
    const hidden  = items.filter(c => c.dataset.filtered === 'hide');

    if (activeSort === 'name') {
        visible.sort((a, b) => {
            const na = a.querySelector('p.font-semibold')?.textContent.trim() || '';
            const nb = b.querySelector('p.font-semibold')?.textContent.trim() || '';
            return na.localeCompare(nb);
        });
    } else if (activeSort === 'price-asc' || activeSort === 'price-desc') {
        visible.sort((a, b) => {
            const pa = parseFloat(a.querySelector('.font-bold.text-gray-900')?.textContent.replace('$','')) || 0;
            const pb = parseFloat(b.querySelector('.font-bold.text-gray-900')?.textContent.replace('$','')) || 0;
            return activeSort === 'price-asc' ? pa - pb : pb - pa;
        });
    }

    [...visible, ...hidden].forEach(c => grid.appendChild(c));

    // Update badge visibility
    const isFiltered = activeSort !== 'default' || maxPrice < 20 || inStockOnly;
    document.getElementById('filterBadge').classList.toggle('hidden', !isFiltered);

    // Re-paginate respecting filtered items
    activeCat = activeCat; // keep category
    renderPage(1);
}

function resetFilters() {
    activeSort = 'default';
    maxPrice = 20;
    document.getElementById('priceRange').value = 20;
    document.getElementById('priceLabel').textContent = '$20.00';
    document.getElementById('inStockOnly').checked = false;
    document.querySelectorAll('.sort-btn').forEach(b => {
        b.classList.remove('bg-orange-500','text-white');
        b.classList.add('bg-white','text-gray-600');
    });
    document.querySelector('.sort-btn[data-sort="default"]').classList.add('bg-orange-500','text-white');
    document.querySelectorAll('.product-item').forEach(c => delete c.dataset.filtered);
    document.getElementById('filterBadge').classList.add('hidden');
    renderPage(1);
}

// Add to order helper
function addToOrder(name, price, btn) {
    const qtyHtml = `
        <div class="flex items-center gap-1">
            <button class="btn btn-xs btn-circle bg-gray-100 border-0 text-gray-700 hover:bg-gray-200">
                <i class="hgi-stroke hgi-minus-sign text-xs"></i>
            </button>
            <span class="text-sm font-semibold w-5 text-center">1</span>
            <button class="btn btn-xs btn-circle bg-gray-900 border-0 text-white hover:bg-gray-700">
                <i class="hgi-stroke hgi-plus-sign text-xs"></i>
            </button>
        </div>`;
    btn.closest('.flex.items-center.justify-between').lastElementChild.outerHTML = qtyHtml;
}