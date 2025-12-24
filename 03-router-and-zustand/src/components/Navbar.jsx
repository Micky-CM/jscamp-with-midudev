import { NavLink } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import { Link } from "./Link.jsx"

export function Navbar() {
  return (
    <header>
      <Link href="/">
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        DevJobs
      </Link>

      <nav>
        <a href="#">Buscar</a>
        <NavLink
          className={({ isActive }) => isActive ? 'nav-link-active' : ''}
          to="/search">
            Empleos
        </NavLink>
        <a href="#">Empresas</a>
        <a href="#">Salarios</a>
      </nav>
      <NavbarUserButton />
    </header>
  )
}

const NavbarUserButton = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext)

  return isLoggedIn
    ? <button onClick={logout}>Cerrar sesión</button>
    : <button onClick={login}>Iniciar sesión</button>
}