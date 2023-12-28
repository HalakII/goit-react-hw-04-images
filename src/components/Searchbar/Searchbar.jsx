import { useState } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcSearch } from 'react-icons/fc';



export const Searchbar = ({onSubmitForm}) => {
  const [searchQuery, setSearchQuery] = useState('')
 
  const handleChange = evt => {
    setSearchQuery( evt.currentTarget.value.toLowerCase());
  };

 const handleSubmit = evt => {
    evt.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Enter the query word');
      return;
    }
    onSubmitForm(searchQuery);
    setSearchQuery('');
    
  };
  return (
    <header className={css.searchbar}>
   <form className={css.searchForm} onSubmit={handleSubmit}>
  <button type="submit" className={css.searchForm_button}>
  <span className={css.searchForm_button_label}>Search</span>
  <FcSearch size={'2em'} />
  </button>
    
  <input
  className={css.searchForm_input}
  type="text"
  autoComplete="off"
  autoFocus
  placeholder="Search images and photos"
  onChange={handleChange}
  value={searchQuery}
  />
  </form>
  </header>
  )
}


