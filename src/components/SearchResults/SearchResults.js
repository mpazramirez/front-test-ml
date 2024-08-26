import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home/Home';
import './SearchResults.scss';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('search');


const formatCLP = (amount) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(amount);
};

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items?q=${query}`);
        setCategories(response.data.categories);
        setResults(response.data.items);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchResults();
  }, [query]);

  const handleItemClick = (id) => {
    navigate(`/items/${id}`);
  };
 
  const breadcrumb = categories.join(' > ');

  return (
    <><Home />
    <div className='main'>
        <div className='content'>
        <div className='categories'>{breadcrumb} </div>
          {results.map(item => (
            <div className='item-content' key={item.id} onClick={() => handleItemClick(item.id)} >
              <div><img src={item.picture} alt={item.title} className='image_search'/></div>
              <div>
                <p className='title'>{formatCLP(item.price.amount)}</p>
                <h3 className='subtitle'>{item.title}</h3>
                {item.free_shipping}
            </div>
            </div>
          ))}
        </div>
  </div></>
  );
};

export default SearchResults;
