import { GetCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";

export const metadata ={
    title:"Your Cart - Shlipkart "

}
export default async function cartpage(){
    const cart= await GetCart();
    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold ">Shopping Cart </h1>
            {cart?.items.map(cartItem=>(
                <CartEntry cartitem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>


            ))}
            {!cart?.items.length&& <p>Your cart is Empty </p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold ">
                    Total:{formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">Checkout </button>
            </div>
        </div>
    )
}