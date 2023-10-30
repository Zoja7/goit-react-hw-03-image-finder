import { API_KEY } from './configs/configs';
import axios from 'axios';
import { Component } from 'react';
import { StyledApp } from './StyledApp.styled';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    id: null,
    images: null,
    modalImage: null,
    searchQuery: null,

    isLoading: false,
    error: null,

    currentPage: 1,
    totalPages: 1,

    isOpenModal: false,
    prevQuery: null,
  };

  componentDidUpdate(_, prevState) {
    try {
      if (
        prevState.searchQuery !== this.state.searchQuery ||
        prevState.currentPage !== this.state.currentPage
      ) {
        this.setState({ isLoading: true });
        axios
          .get(
            `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
          )
          .then(({ data }) => {
            if (!data.total) {
              return alert(
                'Sorry, there are no images matching your search query. Please try again!'
              );
            }
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
              totalPages: data.totalHits,
              // totalPages: Math.ceil(data.totalHits / 12),
            }));
          })
          .catch(error => {
            this.setState({ error: error.message });
          })
          .finally(() => {
            this.setState({
              isLoading: false,
            });
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  handelSubmitForm = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return alert(`You are looking for ${searchQuery} now!`);
    }

    this.setState({
      searchQuery: searchQuery.toLowerCase(),
      images: [],
      currentPage: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  openModal = largeImageURL => {
    this.setState({
      isOpenModal: true,
      modalImage: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      images: this.state.images,
    });
  };

  ShownLoadMoreButton() {
    const { currentPage, totalPages, images, searchQuery } = this.state;
    return (
      searchQuery !== null &&
      currentPage < totalPages &&
      images &&
      images !== null &&
      images.length > 0
    );
  }
  render() {
    const { images, searchQuery, modalImage } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handelSubmitForm} />
        {this.state.error !== null && (
          <p className="errorBage">
            Oops, some error occured... Error message: {this.state.error}
          </p>
        )}
        {this.state.isLoading && <Loader />}
        {searchQuery !== null && images && images.length > 0 && (
          <ImageGallery
            images={images}
            searchQuery={searchQuery}
            openModal={this.openModal}
          />
        )}
        {this.ShownLoadMoreButton() && <Button onClick={this.loadMore} />}
        {this.state.isOpenModal && (
          <Modal largeImage={modalImage} closeModal={this.closeModal} />
        )}
      </StyledApp>
    );
  }
}
