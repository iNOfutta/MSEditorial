/* eslint-disable no-unused-vars */
import './Catalogue.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../feature/users/services/users';
import { getBooksByFilter } from '../../feature/books/services/books';
import TopNav from '../../components/TopNav/TopNav';
import BookCard from '../../feature/books/components/BookCard/BookCard';

const CataloguePage = () => {
  const userToken = localStorage.getItem('login-token');
  const dispatch = useDispatch();

  const { publisher } = useSelector((state) => state.user.userData);
  const { catalogue } = useSelector((state) => state.catalogue);

  useEffect(() => {
    if (userToken) {
      try {
        dispatch(getUser(userToken));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, []);

  useEffect(() => {
    if (publisher) {
      try {
        dispatch(getBooksByFilter(publisher));
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [publisher]);
  return (
    <div className="catalogue">
      <TopNav />
      <main className="catalogue__main-container">
        <h2>Catálogo</h2>
        <section className="catalogue__books-container">
          <Link to="/book/register" className="catalogue__add-button">
            <FontAwesomeIcon icon={faPlus} />
            Añadir libro
          </Link>
          {catalogue.map((book) => (
            <BookCard
              key={book._id}
              title={book.title}
              cover={book.cover}
              bookId={book._id}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default CataloguePage;
