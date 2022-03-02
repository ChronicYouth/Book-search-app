import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import returnIcon from '../assets/icons/return.png';
import { fillCurrentBook } from '../store/currentBook/currentBookSlice';
function BookInfo({defaultCover}) {
  const currentBook  = useSelector((state) => state.currentBook.currentBookData);
  const dispatch = useDispatch();
    

    return (
      <div>
        <div className='bookInfoCard'> 
          <img className='returnButton' alt='returnButton' src={returnIcon} onClick={() => dispatch(fillCurrentBook(''))}/>
          <div><img src={currentBook?.imageLinks?.thumbnail? currentBook?.imageLinks?.thumbnail : defaultCover} alt="обложка" width="216px" height="322px"></img></div>
          <div className='categories'>{currentBook?.categories?.join(', ')}</div>
          <div className='title'>{currentBook?.title}</div>
          <div className='authors'>{currentBook?.authors?.join(', ')}</div>
          <div className='description'>{currentBook?.description}</div>
        </div>
      </div>
    );
}
export default BookInfo;
