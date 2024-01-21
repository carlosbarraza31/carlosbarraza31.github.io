const petCards = document.querySelectorAll('.pet');
const galleryBtns = document.querySelectorAll('.gallery_button');

petCards.forEach(item => item.addEventListener('click', showPetInfo));
galleryBtns.forEach(item => item.addEventListener('click', showPetGallery));

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

function showPetGallery(event) {
    const petGallery = document.querySelector('.pet_gallery');
    const closeBtn = petGallery.querySelector('.gallery_close');
    const galleryImages = petGallery.querySelectorAll('.gallery_images');

    petGallery.showModal();
    openModal(event, petGallery);

    galleryImages.forEach((gallery) => {
        if (gallery.dataset.jsPet === event.currentTarget.dataset.jsPet) {
            gallery.classList.remove('h-hidden');
        } else {
            gallery.classList.add('h-hidden');
        }
    })

    closeBtn.addEventListener('click', () => {
        petGallery.close();
    })
}

function openModal(event, petGallery) {
    const galleryTitle = petGallery.querySelector('.gallery_title');
    galleryTitle.innerText = event.currentTarget.dataset.jsPet;
}