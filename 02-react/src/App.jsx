import { useRouter } from "./hooks/useRouter.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import HomePage from "./pages/Home.jsx"
import SearchPage from "./pages/Search.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"

function App() {
  const { currentPath } = useRouter()

  let page = <NotFoundPage />
  if (currentPath === "/") {
    page = <HomePage />
  } else if (currentPath === "/search") {
    page = <SearchPage />
  }


  return (
    <>
      <Navbar />
      {page}
      <Footer />
    </>
  )
}

export default App
