import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.imageGallery} alt="gallery of images">
      {' '}
      <ImageGalleryItem images={images} openModal={openModal} />
    </ul>
  );
}
// <ul>
//   {searchQuery !== null &&
//     images.map(image => {
//       return (
//         <li key={image.id}>
//           <img
//             src={image.webformatURL}
//             alt={image.tags}
//             style={{ width: '100px', height: 'auto' }}
//           />
//         </li>
//       );
//     })}
// </ul>;
