import logo from '../static/images/logo.png'
import './styles/navbar.css'
export default function Navbar() {
    const username = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).username : false
    return(
        <div className='navbar'>
            <div className='navLeft'>
                <a href="/"><img src={logo} alt=''/>TransPost</a>
            </div>
            <div className='navRight'>
                {username && username}
            </div>
        </div>
    )
}