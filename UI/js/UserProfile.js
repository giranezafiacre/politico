const inputFile = document.getElementById('input-file');
const profilePicture = document.querySelector('.profile-image');
profilePicture.addEventListener('click', () => {
    inputFile.click();
});
inputFile.addEventListener('change', () => {
    const { files } = inputFile;
    if (inputFile.value) {
        profilePicture.setAttribute('src', `../images/${files[0].name}`);
    }
});
