import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36015581-346d0b697f8b5461911613245';

export class apiServicePixabay {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.totalPages = 0;
  }

  async getPictures() {
    const SERCH_PARAMS = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.per_page,
    });

    const URL = `${BASE_URL}?${SERCH_PARAMS}`;

    const { data } = await axios.get(URL);
    console.log(data);
    return data;
  }

  incrementPage() {
    return (this.page += 1);
  }

  resetPageNumber() {
    return (this.page = 1);
  }

  setTotal(total) {
    return (this.totalPages = total);
  }

  resetTotalPage() {
    return (this.totalPages = 0);
  }

  endOfImages() {
    return this.page === Math.ceil(this.totalPages / this.per_page);
  }
}
