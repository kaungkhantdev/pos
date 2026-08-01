function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('hgi-view');
        toggleIcon.classList.add('hgi-view-off-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('hgi-view-off-slash');
        toggleIcon.classList.add('hgi-view');
    }
}
