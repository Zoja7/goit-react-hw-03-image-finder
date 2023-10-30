import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.imageGallery}>
      {' '}
      <ImageGalleryItem images={images} openModal={openModal} />
    </ul>
  );
}
