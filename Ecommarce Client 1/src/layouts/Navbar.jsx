import LoginNavber from '../components/Navber/LoginNavber'
import LogoutNavber from '../components/Navber/LogoutNavber'

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem("access");
  return (
    <>
      { isLoggedIn ?( <LoginNavber /> ):(<LogoutNavber />) }
    </>
  )
}
