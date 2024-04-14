import Image from "next/image";
import Link from "next/link";
import Shlipkart from "@/assets/Shlipkart.png";
import { redirect } from "next/navigation";
import { GetCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
//function to search among products 
async function searchProducts(formdata: FormData) {
  "use server";
  const searchQuery = formdata.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
    const session=await getServerSession(authOptions);
    const cart= await GetCart();
  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image
              src={Shlipkart}
              alt="Shlipkart-logo"
              height={40}
              width={40}
            ></Image>
            Shlipkart
          </Link>
        </div>
        <div className="flex-none gap-2 ">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100px] "
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}
