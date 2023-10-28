import css from './imageGalleryItem.module.css';
export default function ImageGalleryItem({ images }) {
  return images.map(image => {
    if (!images) {
      return null; // Повернути пустий результат, якщо images === null
    }
    return (
      <li className={css.imageGalleryItem} key={image.id}>
        <img
          className={css.imageGalleryItemImage}
          src={image.webformatURL}
          alt={image.tags}
        />
      </li>
    );
  });
}
