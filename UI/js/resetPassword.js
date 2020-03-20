document.getElementById('SignIn').addEventListener('click', () => {
    const path = document.getElementsByTagName('a');
    if (document.getElementById('password1').value !== document.getElementById('password2').value) {
        alert('non matching password');
        path.setAttribute('href', '../html/resetPassword.html');
    } else {
        document.getElementById('a').setAttribute('href', '../html/SignIn.html');
    }
});
