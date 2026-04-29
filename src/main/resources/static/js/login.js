function togglePassword() {
    const input = document.getElementById('password');
    const icon = document.getElementById('eyeIcon');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'hgi-stroke hgi-view-off text-base';
    } else {
        input.type = 'password';
        icon.className = 'hgi-stroke hgi-view text-base';
    }
}