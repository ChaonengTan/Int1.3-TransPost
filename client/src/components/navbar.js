import logo from '../static/images/logo.png'
import './styles/navbar.css'
export default function Navbar() {
    const username = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).username : false
    const loggedIn = () => {
        return(
            <div className='loggedIn'>
                <p>{username}</p>
                <button onClick={() => {
                    sessionStorage.removeItem('user')
                    window.location.reload(false)
                }}>Logout</button>
            </div>
        )
    }
    return(
        <div className='navbar'>
            <div className='navLeft'>
                <a href="/"><img src={logo} alt=''/>TransPost</a>
            </div>
            <div className='navRight'>
                {username && loggedIn()}
            </div>
        </div>
    )
}