import Link from "next/link";

interface PaginationBarProps {
  currentPage: number;
  totalPage: number;
}

export default function PaginationBar({
  currentPage,
  totalPage,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPage, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));
  const numberedpageitems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedpageitems.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`join-item btn ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </Link>
    );
  }
  return (
    <>
      <div className="join hidden sm:block ">{numberedpageitems}</div>
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link href={"?page=" + (currentPage - 1)} className="btn join-item ">
            «
          </Link>
        )}
        <button className="join-item btn pointer-events-none">
          page:{currentPage}
        </button>
        {currentPage < totalPage && (
          <Link href={"?page=" + (currentPage + 1)} className="btn join-item ">
            »
          </Link>
        )}
      </div>
    </>
  );
}
