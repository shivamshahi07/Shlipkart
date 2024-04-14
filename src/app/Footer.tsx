import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-neutral p-10 text-neutral-content">
        <div className="footer m-auto max-w-7xl">
          <div>
            <span className="footer-title">Services</span>
            <a className="link-hover link">Branding</a>
            <a className="link-hover link">Design</a>
            <a className="link-hover link">Marketing</a>
            <a className="link-hover link">Advertisement</a>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <a className="link-hover link">About us</a>
            <a className="link-hover link">Contact</a>
            <a className="link-hover link">Jobs</a>
            <a className="link-hover link">Press kit</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link-hover link">Terms of use</a>
            <a className="link-hover link">Privacy policy</a>
            <a className="link-hover link">Cookie policy</a>
          </div>
        </div>
        <div className="flex items-center justify-center mt-12 ">
          Made with 🤍 by <Link href={"https://github.com/shivamshahi07"} className="hover:underline hover:text-blue-500 ml-1 "> Shivam Shahi</Link>
        </div>
      </footer>
    );
  }