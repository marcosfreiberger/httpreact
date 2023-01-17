import './App.css';

import { useState, useEffect } from 'react';

const url = 'http://localhost:3000/products'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);

      const data = await response.json();

      setProducts(data);
    };

    fetchData();
  }, []);


  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - R$ {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
