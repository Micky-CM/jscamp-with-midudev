import Navbar from "./components/Navbar"
import JobsSearchSection from "./components/JobsSearchSection"
import SearchResultsSection from "./components/SearchResultsSection"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <Navbar />
      <main className="jobs">
        <JobsSearchSection />
        <SearchResultsSection />
      </main>
      <Footer />
    </>
  )
}

export default App
