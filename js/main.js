const petCards = document.querySelectorAll('.pet');

petCards.forEach(item => item.addEventListener('click', showPetInfo));

function showPetInfo() {
    this.classList.toggle('m-expanded');
    const petInfo = this.querySelector('.pet_info');
    const petImage = this.querySelector('.pet_image');
    petInfo.classList.toggle('h-hidden');
    petImage.classList.toggle('m-expanded');
}