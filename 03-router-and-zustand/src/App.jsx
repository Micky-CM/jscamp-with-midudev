import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"

import { Navbar } from "./components/Navbar.jsx"
import  { Footer } from "./components/Footer.jsx"

const LazyHomePage = lazy(() => import("./pages/Home.jsx"))
const LazySearchPage = lazy(() => import("./pages/Search.jsx"))
const LazyNotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"))
const LazyJobDetail = lazy(() => import("./pages/Detail.jsx"))

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>Cargando...</div>}>
        <Routes>
          <Route path="/" element={ <LazyHomePage /> } />
          <Route path="/search" element={ <LazySearchPage /> } />
          <Route path="/jobs/:jobId" element={ <LazyJobDetail /> } />
          <Route path="*" element={ <LazyNotFoundPage /> } />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
