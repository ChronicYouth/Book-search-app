import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import searchIcon from '../assets/icons/search.png';
import { fillCurrentBook } from '../store/currentBook/currentBookSlice';
import { resetCurrentPage } from '../store/filters/filtersSlice';
import { fillRequest } from '../store/request/requestSlice';

function SearchForm({request, onChangeOrder, onChangeCategory,}) {
  const inputRef = useRef(null);
  const orderRef = useRef(null);
  const categoriesRef = useRef(null);
  const dispatch = useDispatch();
  
  const handleSubmit = useCallback ((event) => {
    event.preventDefault();
    if(request === inputRef.current.value){
      return
    }
      dispatch(resetCurrentPage());
      dispatch(fillRequest(inputRef.current.value));
      dispatch(fillCurrentBook(''));
  },[request, dispatch])

    return (
      <div className='SearchForm'> 
        <h1>Search for books</h1>
        <form className='search'  onSubmit={handleSubmit}>
          <input className='searchField' ref={inputRef}  name="search" placeholder="Искать здесь..." type="search"/>
          <button className='searchButton'><img className='searchIcon' src ={searchIcon} alt='searchButton  '/></button>
        </form> 
        <div className='filtres'> 
          <h4>Sorting by</h4>
          <select defaultValue='relevance' name="select"  ref={orderRef} onChange={()=>onChangeOrder(orderRef.current.value)}> 
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
          <h4>Categories</h4>
          <select defaultValue='all' name="select"  ref={categoriesRef} onChange={()=>onChangeCategory(categoriesRef.current.value)} > 
            <option value="all">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computers</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
          </select>
        </div> 
      </div>
    );
  }
  
  export default SearchForm;