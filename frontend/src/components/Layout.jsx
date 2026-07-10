import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import MobileDock from "./MobileDock";
import BackToTop from "./BackToTop";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return (
    <div className="app-shell">
      <div className="bg-blobs" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
      </div>
      <Navbar />
      <ScrollProgress />
      <main id="main-content" className="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MobileDock />
      <BackToTop />
    </div>
  );
}
