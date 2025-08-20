import Product from "./Product";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Products({cart, addToCart, increase, decrease }) {
    
    const [products, setProducts] = useState([]);
    useEffect(() => {
        try{
            axios.get("http://localhost:3000/products").then((response) => {
            setProducts(response.data.products);
            })
        } catch(error){
            console.log(error);
        }
    }, []);

    return (
        <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-6">
                {products.map((product)=>{
                    return <Product 
                    key={product.id} 
                    name={product.name} 
                    image={product.image} 
                    weight={product.weight} 
                    price={product.price} 
                    quantity={cart[product.id] ?? 0} 
                    onAdd={() => addToCart(product.id)} 
                    onInc={() => increase(product.id)} 
                    onDec={() => decrease(product.id)} />
                })}
            </div>
        </>
    )
}
