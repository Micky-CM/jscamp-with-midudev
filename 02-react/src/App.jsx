import Navbar from "./components/Navbar.jsx"
import JobsSearchSection from "./components/JobsSearchSection.jsx"
import jobsData from '../data.json'
import SearchResultsSection from "./components/SearchResultsSection.jsx"
import Footer from "./components/Footer.jsx"

function App() {
  return (
    <>
      <Navbar />
      <main className="jobs">
        <JobsSearchSection />
        <SearchResultsSection jobs={jobsData} />
      </main>
      <Footer />
    </>
  )
}

export default App
