import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkup } from './js/markup';
import { apiServicePixabay } from './js/api';

const searchForm = document.querySelector('.search-form');
const searchFormInput = document.querySelector('.search-form__input');
const galeryOfPictures = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const apiService = new apiServicePixabay();
const lightboxGallery = new SimpleLightbox('.gallery a');

loadMoreBtn.classList.add('is-hidden');

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(evt) {
  evt.preventDefault();
  clearGallery();
  apiService.resetPageNumber();
  loadMoreBtn.classList.add('is-hidden');

  apiService.searchQuery = searchFormInput.value.trim();

  if (apiService.searchQuery === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  try {
    const { hits, totalHits } = await apiService.getPictures();

    if (hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);

    const markup = createMarkup(hits);
    updateMarkup(markup);
    loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
    clearGallery();
  }
}
loadMoreBtn.addEventListener('click', onMoreAddingBtn);

async function onMoreAddingBtn(evt) {
  evt.preventDefault();
  apiService.incrementPage();

  if (!apiService.endOfImages) {
    loadMoreBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  try {
    const { hits } = await apiService.getPictures();
    const markup = createMarkup(hits);
    galeryOfPictures.insertAdjacentHTML('beforeend', markup);
    lightboxGallery.refresh();
  } catch (error) {
    console.log(error);
    clearGallery();
  }
}

function updateMarkup(markup) {
  galeryOfPictures.insertAdjacentHTML('beforeend', markup);
  lightboxGallery.refresh();
  normalScroll();
}

function clearGallery() {
  galeryOfPictures.innerHTML = '';
}

function normalScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
