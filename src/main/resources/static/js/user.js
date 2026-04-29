function selectUser(row) {
    document.querySelectorAll('tbody tr').forEach(r => r.classList.remove('bg-orange-50'));
    row.classList.add('bg-orange-50');
}

// User Create JS
function togglePwd(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'hgi-stroke hgi-eye-off text-sm';
    } else {
        input.type = 'password';
        icon.className = 'hgi-stroke hgi-eye text-sm';
    }
}

function previewAvatar(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const preview = document.getElementById('avatar-preview');
        preview.innerHTML = `<img src="${ev.target.result}" class="w-full h-full object-cover rounded-full"/>`;
    };
    reader.readAsDataURL(file);
}

function clearAvatar() {
    document.getElementById('avatar-preview').innerHTML =
        `<span id="avatar-initials" class="text-2xl font-bold text-orange-400">?</span>`;
}

// Update initials from name input
document.querySelector('input[placeholder="e.g. Ahmad Karim"]').addEventListener('input', function() {
    const parts = this.value.trim().split(' ').filter(Boolean);
    const initials = parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0] ? parts[0][0].toUpperCase() : '?';
    const el = document.getElementById('avatar-initials');
    if (el) el.textContent = initials;
});

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
