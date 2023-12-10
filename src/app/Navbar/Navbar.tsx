import Image from "next/image";
import Link from "next/link";
import Shlipkart from "@/assets/Shlipkart.png";

export default function Navbar(){
    return (
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl normal-case">
                        <Image src={Shlipkart} alt="Shlipkart-logo" height={40} width={40}></Image>
                        Shlipkart
                    </Link>

                </div>
                <div>
                    
                </div>

            </div>

        </div>
    )
}