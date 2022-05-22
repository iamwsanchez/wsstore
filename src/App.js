import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App(){
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            baseURL: 'https://fakestoreapi.com',
            url: '/products',
          })
            .then(({ data }) => {
              setData(data)
            })
            .catch(err => console.dir(err))
            .finally(() => setLoading(false))
    }, [])

    return (  
      <section className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt='logo'/>
        <h1>Fake Shop</h1>
        </header>
        {loading && "Loading..."}
        {!!data && data.length > 0 ? data.map((product) => {
            return(
              <article key={product.id}>
                <h2>title: {product.title}</h2>
                <p>id: {product.id}</p>
                <p>description: {product.description}</p>
                <p>price: {product.price}</p>
                <p>category: {product.category}</p>
                <img src={product.image} className="thumbnail" alt={product.description}/>
              </article>
            )   
          }):(<p>API did not provided any product, try again.</p>)
        }
      </section>
    )
}
export default App;
