const petCards = document.querySelectorAll('.pet');

petCards.forEach(item => item.addEventListener('click', showPetInfo));

function showPetInfo() {
    const petInfo = this.querySelector('.pet_info');
    const petImage = this.querySelector('.pet_image');
    const petName = this.querySelector('.pet_name');

    petInfo.classList.toggle('h-hidden');
    petImage.classList.toggle('m-expanded');
    petName.classList.toggle('m-expanded');
    this.classList.toggle('m-expanded');

    hideOtherPets(this);
}

function hideOtherPets(currentPet) {
    petCards.forEach((petCard) =>  {
        if (petCard !== currentPet) {
            if (petCard.classList.contains('m-expanded')) {
                const petInfo = petCard.querySelector('.pet_info');
                const petImage = petCard.querySelector('.pet_image');
                const petName = petCard.querySelector('.pet_name');

                petCard.classList.remove('m-expanded');
                petInfo.classList.add('h-hidden');
                petImage.classList.remove('m-expanded');
                petName.classList.remove('m-expanded');
            }
        }
    })
}