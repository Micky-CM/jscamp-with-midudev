import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"

import { Navbar } from "./components/Navbar.jsx"
import  { Footer } from "./components/Footer.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"

const LazyHomePage = lazy(() => import("./pages/Home.jsx"))
const LazySearchPage = lazy(() => import("./pages/Search.jsx"))
const LazyNotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"))
const LazyJobDetail = lazy(() => import("./pages/Detail.jsx"))
const LazyProfilePage = lazy(() => import("./pages/ProfilePage.jsx"))
const LazyLogin = lazy(() => import("./pages/Login.jsx"))
const LazyRegister = lazy(() => import("./pages/Register.jsx"))

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>Cargando...</div>}>
        <Routes>
          <Route path="/" element={ <LazyHomePage /> } />
          <Route path="/search" element={ <LazySearchPage /> } />
          <Route path="/jobs/:jobId" element={ <LazyJobDetail /> } />
          <Route path="/profile" element={
            <ProtectedRoute redirectTo="/login" >
              <LazyProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={ <LazyLogin /> } />
          <Route path="/register" element={ <LazyRegister /> } />
          <Route path="*" element={ <LazyNotFoundPage /> } />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
