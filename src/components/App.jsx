import { API_KEY, BASE_URL } from './configs/configs';
import axios from 'axios';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

// {
//   "total": 35317,
//     "totalHits": 500,
//       "hits": [
//         {
//           "id": 2295434,

//           "pageURL": "https://pixabay.com/photos/spring-bird-bird-tit-spring-blue-2295434/",
//           "type": "photo",
//           "tags": "spring bird, bird, tit",
//           "previewURL": "https://cdn.pixabay.com/photo/2017/05/08/13/15/spring-bird-2295434_150.jpg",
//           "previewWidth": 150,
//           "previewHeight": 99,

//           "webformatURL": "https://pixabay.com/get/ga34f8ac62f08d43d13b644d29fdf8e69be7d5a3668524d8555584359a7dcc96be6e037265b8a6aa47fb49a7e4de78bc4a0ae940fe9255bbaae2b9bf016a0aea4_640.jpg",

//           "webformatWidth": 640,
//           "webformatHeight": 426,

//           "largeImageURL": "https://pixabay.com/get/g351afe68af7009ad59367f8bac53be30082f89bd140abf70908b6285da679885f576bc8792ebfc7420ba0577e9a2fde589548030a71ea8da3b113c6fd15def83_1280.jpg",

//           "imageWidth": 5363,
//           "imageHeight": 3575,
//           "imageSize": 2938651,
//           "views": 836953,
//           "downloads": 501422,
//           "collections": 2345,
//           "likes": 2261,
//           "comments": 292,
//           "user_id": 334088,
//           "user": "JillWellington",
//           "userImageURL": "https://cdn.pixabay.com/user/2018/06/27/01-23-02-27_250x250.jpg"
//         },
//   }

export class App extends Component {
  state = {
    id: null,
    images: null,
    searchQuery: null,

    isLoading: false,
    error: null,
  };

  fetchImages = async (query, page) => {
    const params = {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 12,
    };
    try {
      const { data } = await axios(BASE_URL, { params });
      this.setState({
        images: data.hits,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  componentDidMount() {
    this.fetchImages();
  }

  handelSubmitForm = searchQuery => {
    this.setState({ searchQuery });
    this.fetchImages(searchQuery, 1);
    if (!searchQuery) {
      this.setState(this.state.images);
    }
  };
  render() {
    const { images, searchQuery } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handelSubmitForm} />
        <div>
          <ul>
            {searchQuery !== null &&
              images.map(image => {
                return (
                  <li key={image.id}>
                    <img
                      src={image.webformatURL}
                      alt={image.tags}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </>
    );
  }
}
