
document.getElementById('SignIn').addEventListener('click', () => {
    const signin = document.getElementById('SignIn');
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if (u === 'Admin' && p === '123') {
        signin.addEventListener('click', () => {
            window.location.href = 'AdminPage.html';
        });
    } else {
        signin.addEventListener('click', () => {
            window.location.href = 'UserPage.html';
        });
    }
});
