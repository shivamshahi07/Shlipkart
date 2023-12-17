import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  searchParams: { page: string };
}
export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentpage = parseInt(page);
  const Pagesize = 6;
  const HeroItemCount = 1;
  const totalitemcount = await prisma.product.count();
  const totalpages = Math.ceil((totalitemcount - HeroItemCount) / Pagesize);
  const product = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentpage - 1) * Pagesize + (currentpage === 1 ? 0 : HeroItemCount),
    take: Pagesize + (currentpage === 1 ? HeroItemCount : 0),
  });

  return (
    <div className="flex flex-col items-center ">
      {currentpage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={product[0].imageUrl}
              alt={product[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{product[0].name}</h1>
              <p className="py-6">{product[0].description}</p>
              <Link
                href={"/products/" + product[0].id}
                className="btn-primary btn"
              >
                Check it out
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentpage === 1 ? product.slice(1) : product).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {totalpages > 1 && (
        <PaginationBar currentPage={currentpage} totalPage={totalpages} />
      )}
    </div>
  );
}
