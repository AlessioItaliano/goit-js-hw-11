function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
  <div class="picture__box">
    <a class="picture__large" href="${largeImageURL}">
      <img class="picture__smole" src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </a>
      <div class="picture__info-box">
     <p class="picture__info-box-item">
        <b>Likes</b>${likes}
      </p>
     <p class="picture__info-box-item">
        <b>Views</b>${views}
      </p>
      <p class="picture__info-box-item">
        <b>Comments</b>${comments}
     </p>
      <p class="picture__info-box-item">
       <b>Downloads</b>${downloads}
     </p>
  </div>
</div>
`
    )
    .join('');
}

export { createMarkup };
