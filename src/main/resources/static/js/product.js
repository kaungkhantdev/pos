function switchTab(tab) {
    const isProducts = tab === 'products';

    document.getElementById('panel-products').classList.toggle('hidden', !isProducts);
    document.getElementById('panel-products').classList.toggle('flex', isProducts);
    document.getElementById('panel-categories').classList.toggle('hidden', isProducts);
    document.getElementById('panel-categories').classList.toggle('flex', !isProducts);

    // Products tab
    document.getElementById('tab-products').className = `flex flex-col items-center gap-1.5 px-4 pb-3 pt-1 border-b-2 relative ${isProducts ? 'border-gray-900' : 'border-transparent'}`;
    document.getElementById('tab-products-icon').className = `w-10 h-10 rounded-full flex items-center justify-center ${isProducts ? 'bg-orange-100' : 'bg-gray-100'}`;
    document.getElementById('tab-products-icon').querySelector('i').className = `hgi-stroke hgi-package text-lg ${isProducts ? 'text-orange-500' : 'text-gray-400'}`;
    document.getElementById('tab-products-label').className = `text-xs whitespace-nowrap ${isProducts ? 'font-bold text-gray-900' : 'font-normal text-gray-400'}`;

    // Categories tab
    document.getElementById('tab-categories').className = `flex flex-col items-center gap-1.5 px-4 pb-3 pt-1 border-b-2 relative ${!isProducts ? 'border-gray-900' : 'border-transparent'}`;
    document.getElementById('tab-categories-icon').className = `w-10 h-10 rounded-full flex items-center justify-center ${!isProducts ? 'bg-orange-100' : 'bg-gray-100'}`;
    document.getElementById('tab-categories-icon').querySelector('i').className = `hgi-stroke hgi-grid-view text-lg ${!isProducts ? 'text-orange-500' : 'text-gray-400'}`;
    document.getElementById('tab-categories-label').className = `text-xs whitespace-nowrap ${!isProducts ? 'font-bold text-gray-900' : 'font-normal text-gray-400'}`;
}

// Product Add and Edit JS
function previewImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        document.getElementById('preview-img').src = ev.target.result;
        document.getElementById('preview-img').classList.remove('hidden');
        document.getElementById('upload-placeholder').classList.add('hidden');
        document.getElementById('clear-img-btn').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function clearImage() {
    document.getElementById('img-input').value = '';
    document.getElementById('preview-img').src = '';
    document.getElementById('preview-img').classList.add('hidden');
    document.getElementById('upload-placeholder').classList.remove('hidden');
    document.getElementById('clear-img-btn').classList.add('hidden');
}

// Radio styling
document.querySelectorAll('input[name="status"]').forEach(radio => {
    radio.addEventListener('change', () => {
        document.querySelectorAll('input[name="status"]').forEach(r => {
            const label = r.closest('label');
            if (r.checked) {
                label.classList.add('border-orange-400', 'bg-orange-50');
                label.classList.remove('border-gray-100');
            } else {
                label.classList.remove('border-orange-400', 'bg-orange-50');
                label.classList.add('border-gray-100');
            }
        });
    });
});
