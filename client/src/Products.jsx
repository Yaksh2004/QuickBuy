import Product from "./Product";
import { productsData } from "./productsData";

export default function Products({cart, addToCart, increase, decrease }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-6">
                {productsData.map((product)=>{
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
