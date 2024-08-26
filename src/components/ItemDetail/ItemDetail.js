import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home/Home';
import './ItemDetail.scss'

const ItemDetail = () => {
  const [result, setResults] = useState({});
  const [precio, setPrecio] = useState('');
  const [category, setCategory] = useState([]);
  const { id } = useParams();

  const formatCLP = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/${id}`);
        setResults(response.data.item);
        setPrecio(response.data.item.price.amount);
        setCategory(response.data.item.category)
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    
    fetchResults();
  }, [id]);


  const breadcrumb = category.join(' > ');

  return (
    <><Home />
    <div>
      <div className='main'>
      <div className='content'>
      <div className='categories'>{breadcrumb} </div>
          <div className='item-content' key={result.id}>
            <div>
              <img className='image' src={result.picture} alt={result.title} width="90" height="90" />
            </div>
            <div className='text-content'>
              <div className='small-content'>              
                <div className='ui-search-item__subtitle '>{result.condition} - {result.sold_quantity} vendidos </div> 
              </div>
              <h2 className='ui-search-item__title'>{result.title}</h2>
              <h1 className='price'>{formatCLP(precio)}</h1>
              <button className="blue-button">
                Comprar
              </button>
            </div>
          </div>
          <div className='description-content'>
            <h2 className='ui-search-item__title'> Descripción del Producto</h2>
            <div className='description'>{result.description}</div>
            </div>
          </div>
        </div>
    </div></>
  );
};

export default ItemDetail;
