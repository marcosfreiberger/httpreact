import './App.css';

import { useState, useEffect } from 'react';

import { useFetch } from './hooks/useFetch';

import loadingGif from './assets/loading.gif';

const url = 'http://localhost:3000/products'

function App() {
  const [products, setProducts] = useState([]);

  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(url);

  //     const data = await response.json();

  //     setProducts(data);
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    }

    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(product),
    // })

    // const addedProduct = await response.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    httpConfig(product, 'POST');

    setName('');
    setPrice('');
  }

  const renderButton = () => {
    if (loading) {
      console.log(loading);
      return <input type="submit" disabled value='Aguarde' />;
    } else {
      return <input type="submit" value='Adicionar' />
    }
  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading && (
        <div>
          <img
            id='loadingGif'
            src={loadingGif}
            alt='loadingGif'
            className='loadingGifSize'
          />
        </div>
      )}
      {error && <p>{error}</p>}
      <ul>
        {items && items.map(product => (
          <li key={product.id}>
            {product.name} - R$ {product.price}
          </li>
        ))}
      </ul>
      <div className="add-products">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={name} name={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Price:
            <input type="number" value={price} name={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          {renderButton()}
        </form>
      </div>
    </div>
  );
}

export default App;
