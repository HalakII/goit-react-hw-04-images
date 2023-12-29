import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../Api/apiService';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';



export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState('');
  const [randomId, setRandomId] = useState(null);
   

  
  useEffect(()=>{
    if(searchQuery === '' || randomId ===null){
      return;
    }
    async function addGallery () {

        try {
          setShowLoader(true);
  
          const {hits, totalHits} = await fetchImages(searchQuery, page);
          if (hits.length === 0) {
            toast.error(
              'Sorry, there are no images matching your search query.'
            );
            return;
          }
         
          const newTotalPages = Math.ceil(totalHits / 12);
          
          setImages((prevState) => [...prevState, ...hits], setTotalPages (newTotalPages),
   );
  
    if (page === newTotalPages) {
      toast.success('Sorry, there are no more images matching your search query.');
    }
        } catch (error) { 
          toast.error(
            `Sorry, ${error.message} 😭.`
          );
          return;
        } finally {
          setShowLoader(false);
        }
    }
    addGallery ()
  },[searchQuery, page, randomId])
  

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (largeImageURL) => {
    setShowModal( true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const handleSearchFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
     setPage (1);
     setImages ([]); 
     setRandomId (Math.random());
  };
  const loadMoreClick = () => {
    setPage(prevState => prevState + 1 );
  };
  
  return (
    <div className={css.app}>
        <Searchbar onSubmitForm={handleSearchFormSubmit} />
         <ImageGallery images={images} onModalClick={openModal} />
        {showModal && (
          <Modal largeImageURL={largeImageURL} onCloseModal={closeModal} />
        )}
        {images.length > 0 && totalPages !== page && !showLoader && <Button onLoadMoreClick={loadMoreClick} />}
        {showLoader && <Loader />}
        <ToastContainer autoClose={3000} />
      </div>
  )
}


