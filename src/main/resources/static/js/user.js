function selectUser(row) {
    document.querySelectorAll('tbody tr').forEach(r => r.classList.remove('bg-orange-50'));
    row.classList.add('bg-orange-50');
}