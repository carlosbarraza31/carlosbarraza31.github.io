const petCards = document.querySelectorAll('.pet');
const galleryBtns = document.querySelectorAll('.gallery_button');
const refreshElements = document.querySelectorAll('[data-js-refresh]');
const contactBtn = document.querySelector('[data-js-contact-button]');
const contactSidebar = document.querySelector('.contact_sidebar');
const overlay = document.querySelector('.overlay');
const sidebarClose = document.querySelector('.close_icon_svg');
const mainBody = document.querySelector('.b-main');
const petGrid = document.querySelector('.b-main_pet_grid');
const upIndicators = document.querySelector('.up_indicators');
const downIndicators = document.querySelector('.scroll_down');
const sections = document.querySelectorAll('.section');
const pageButtons = document.querySelectorAll('.m-link');
const pages = document.querySelectorAll('.b-page');

petCards.forEach(item => item.addEventListener('click', showPetInfo));
galleryBtns.forEach(item => item.addEventListener('click', showPetGallery));
refreshElements.forEach(item => item.addEventListener('click', refreshHomepage));
contactBtn.addEventListener('click', toggleContactInfo);
upIndicators.addEventListener('click', this.focusSection.bind(this, parseInt(upIndicators.dataset.jsScrollTo)));
downIndicators.addEventListener('click', this.focusSection.bind(this, parseInt(downIndicators.dataset.jsScrollTo)));
pageButtons.forEach(item => item.addEventListener('click', changePage));

function showPetInfo() {
    const petInfo = this.querySelector('.pet_info');
    const petImage = this.querySelector('.pet_image');
    const petName = this.querySelector('.pet_name');

    petInfo.classList.toggle('h-hidden');
    petImage.classList.toggle('m-expanded');
    petName.classList.toggle('m-expanded');
    this.classList.toggle('m-expanded');
    upIndicators.classList.toggle('m-active');

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
    const closeIcon = petGallery.querySelector('.close_icon');
    const dragIcon = petGallery.querySelector('.drag_icon');
    let touchStart;

    petGallery.showModal();
    openModal(event, petGallery);

    galleryImages.forEach((gallery) => {
        if (gallery.dataset.jsPet === event.currentTarget.dataset.jsPet) {
            gallery.classList.remove('h-hidden');
        } else {
            gallery.classList.add('h-hidden');
        }
    })

    dragIcon.addEventListener('touchstart', function(event) {
        touchStart = event.touches[0].clientY;
        petGallery.style.transition = "none";
    });

    dragIcon.addEventListener('touchmove', function(event) {
        modalMove(event, petGallery);
    });

    dragIcon.addEventListener('touchend', function(event) {
        snapModal(touchStart, petGallery);
    });

    closeBtn.addEventListener('click', () => {
        petGallery.close();
    })

    closeIcon.addEventListener('click', () => {
        petGallery.close();
    })
}

function openModal(event, petGallery) {
    const galleryTitle = petGallery.querySelector('.gallery_title');
    galleryTitle.innerText = event.currentTarget.dataset.jsPet;
}

function modalMove(event, petGallery) {
    event.preventDefault();
    const currentY = event.touches[0].clientY;
    petGallery.style.maxHeight = (((window.innerHeight - currentY) / window.innerHeight) * 100) + 'vh';
}

function snapModal(touchStart, petGallery) {
    petGallery.style.transition = "all 0.4s ease-in-out";
    petGallery.style.maxHeight = (((window.innerHeight - touchStart) / window.innerHeight) * 100) + 'vh';
}

function refreshHomepage() {
    window.location.reload();
}

function toggleContactInfo() {
    contactSidebar.classList.toggle('m-expanded');
    overlay.classList.add('m-active');
    overlay.addEventListener('click', hideSidebar);
    sidebarClose.addEventListener('click', hideSidebar);
}

function hideSidebar() {
    overlay.classList.remove('m-active');
    contactSidebar.classList.remove('m-expanded');
}

function isElementVisible(el) {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function focusSection(sectionIndex) {
    sections[sectionIndex].scrollIntoView({ behavior: "smooth"});
}

function changePage(event) {
    pages.forEach((page) => {
        if (page.dataset.jsPageName === event.currentTarget.dataset.jsToPage) {
            page.classList.remove('h-invisible');
        } else {
            page.classList.add('h-invisible');
        }
    });
}

window.onload = function () {
    mainBody.onscroll = function () {
        if (isElementVisible(petGrid)) {
            upIndicators.classList.add('m-active');
        } else {
            upIndicators.classList.remove('m-active');
        }
    };
};
