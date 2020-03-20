
document.getElementById('signup').addEventListener('click', () => {
    if (document.getElementById('choice').value === 'Politician') {
        document.getElementById('a').setAttribute('href', '../html/PoliticianPage.html');
    } else {
        document.getElementById('a').setAttribute('href', '../html/SignIn.html');
    }
});
