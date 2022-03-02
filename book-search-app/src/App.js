import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import defaultCover from './assets/images/defaultCover.jpg';
import BookInfo from './components/BookInfo';
import { API_URL } from './components/constants';
import SearchForm from './components/SearchForm';
import { add, fillBooks } from './store/books/booksSlice';
import { fillCurrentBook } from './store/currentBook/currentBookSlice';
import { changeCurrentPage, changeorderBy, changeСategory, resetCurrentPage } from './store/filters/filtersSlice';

function App() {
  const [isHaveBooks, setIsHaveBooks] = useState(false);
  const [totalFound, setTotalFound] = useState('');
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.booksData);
  const request = useSelector((state) => state.request.requestData);
  const currentBook  = useSelector((state) => state.currentBook.currentBookData);
  const category = useSelector((state) => state.filters.category);
  const orderBy = useSelector((state) => state.filters.orderBy);
  const currentPage = useSelector((state) => state.filters.currentPage);

  const makeRequest = useCallback((callback)=> {
    if(!request){
      setIsHaveBooks(false)
      return
    }
    axios(`${API_URL}${request}&orderBy=${orderBy}&maxResults=30&startIndex=${currentPage*30}`)
    .then((response) => {
      callback(response)
      setIsHaveBooks(true)
    })
    .catch((e) => {
      console.log(e);
    })
  },[request, orderBy, currentPage])


  useEffect (()=>{
    makeRequest((response)=>{
     setTotalFound(response.data.totalItems)
     dispatch(fillBooks(response.data.items))
     
     
    })
  },[orderBy, request, category, dispatch, ]);

  useEffect (()=>{
    if(currentPage === 0){
      return
    }
    makeRequest((response)=>
    dispatch(add(response.data.items))
    )
  },[currentPage, dispatch, ]);

 const handleChangeOrder = useCallback((value) => {
  resetCurrentPage();
  dispatch(changeorderBy(value));
  },[dispatch])
  const handleChangeCategory = useCallback((value) => {
    dispatch(resetCurrentPage());
    setIsHaveBooks(false);
    dispatch(fillBooks(''));
    dispatch(changeСategory(value));
  },[dispatch])
  const handleBookClick = useCallback((volumeInfo) => {
    dispatch(fillCurrentBook(volumeInfo));
  },[dispatch])
  const filterByCategory = useCallback((el) => {
    
    if(category === 'all'){
      return el
    }
    const choosenCategory = el.volumeInfo.categories;
    if (el.volumeInfo.categories && choosenCategory.join().toLowerCase().includes(category.toLowerCase())){
      return el
    }
  },[category])

  
  return (
    <div className="App">
      <SearchForm onChangeOrder = {handleChangeOrder} onChangeCategory = {handleChangeCategory} />
      {currentBook  && <BookInfo defaultCover={defaultCover}/>}
      {!currentBook &&
      <>
       {isHaveBooks && <div className='totalFound'>Found {totalFound} results</div>}
       <div className='bookCards'>
        {isHaveBooks && books?.filter(filterByCategory).map(({volumeInfo, etag}) =>
          <div className='bookCard' key = {etag} onClick = {() => handleBookClick(volumeInfo)}>
            <div className='cover'><img src={volumeInfo.imageLinks?.thumbnail? (volumeInfo.imageLinks?.thumbnail) : defaultCover} alt="обложка" width="128px" height="192px"></img></div>
            {volumeInfo.categories && <div className='categories'>{volumeInfo.categories[0]}</div>}
            <div className='title'>{volumeInfo.title}</div>
            <div className='authors'>{volumeInfo.authors?.join(', ')}</div>
          </div>
        )}
      </div>
      {isHaveBooks && <button className='loadMoreButton' onClick={() =>  dispatch(changeCurrentPage())}>Load more</button>}
      </>}
    </div>
  );
}

export default App;
