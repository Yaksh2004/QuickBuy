import Product from "./Product";
export default function Products({products, cart, addToCart, increase, decrease }) {

    const getQty = (pid) => {
        const match = cart.find(
        (i) => (i.productId?._id || i.productId) === pid
        );
        return match?.quantity ?? 0;
    };
   
    return (
        <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-6">
                {products.map((product)=>{
                    return <Product 
                    key={product._id}
                    name={product.name} 
                    image={product.image} 
                    weight={product.weight} 
                    price={product.price} 
                    quantity={getQty(product._id)}
                    onAdd={() => addToCart(product._id)} 
                    onInc={() => increase(product._id)} 
                    onDec={() => decrease(product._id)} />
                })}
            </div>
        </>
    )
}
