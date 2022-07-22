import React, { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import fetchImages from '../../servises/Api';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchSearchQuery = async () => {
      setLoading(true);
      try {
        const { hits } = await fetchImages(searchQuery, page);

        if (hits.length === 0) {
          toast.error('Nothing was found for your query');
          return;
        }
        setImages(prevImages => [...prevImages, ...hits]);
      } catch {
        toast.error('An error has occurred, please try again');
      } finally {
        setLoading(false);
      }
    };
    fetchSearchQuery();
  }, [page, searchQuery]);

  const getSearchQuery = query => {
    if (query === searchQuery) {
      toast.error(
        `The search was performed on request ${query}. You may prefer to use the load more button`
      );
      return;
    }
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = activeUrl => setUrl(activeUrl);

  const closeModal = () => setUrl('');

  return (
    <Container>
      <Searchbar onSubmit={getSearchQuery} />
      <ImageGallery
        images={images}
        onImageClick={openModal}
        loadMore={loadMore}
      />
      {loading && <Loader />}
      {url && <Modal activeUrl={url} alt={url} onClose={closeModal} />}
      <ToastContainer />
    </Container>
  );
};
