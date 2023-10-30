import css from './imageGalleryItem.module.css';
export default function ImageGalleryItem({ images, openModal }) {
  return images.map(image => {
    if (!images) {
      return null;
    }
    return (
      <li className={css.imageGalleryItem} key={image.id}>
        <img
          className={css.imageGalleryItemImage}
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => openModal(image.largeImageURL)}
        />
      </li>
    );
  });
}
