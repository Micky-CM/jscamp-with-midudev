import { NavLink } from "react-router"
import { useAuthStore } from "../store/authStore.js"
import { Link } from "./Link.jsx"
import { useFavoritesStore } from "../store/favoritesStore.js"

export function Navbar() {
  const { isLoggedIn } = useAuthStore()
  const { countFavorites } = useFavoritesStore()
  const numberOfFavorites = countFavorites()

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
        {
          isLoggedIn && (
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link-active' : ''}
              to="/profile"
            >
              Perfil ❤️ {numberOfFavorites}
            </NavLink>
          )
        }
      </nav>
      <NavbarUserButton />
    </header>
  )
}

const NavbarUserButton = () => {
  const { isLoggedIn, login, logout } = useAuthStore()
  const { clearFavorites } = useFavoritesStore()

  const handleLogout = () => {
    logout()
    clearFavorites()
  }

  return isLoggedIn
    ? <button onClick={handleLogout}>Cerrar sesión</button>
    : <button onClick={login}>Iniciar sesión</button>
}