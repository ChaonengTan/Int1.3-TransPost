import logo from '../static/images/logo.png'
import './styles/navbar.css'
export default function Navbar() {
    return(
        <div className='navbar'>
            <div className='navLeft'>
                <a href="/"><img src={logo} alt='' />TransPost</a>
            </div>
            <div className='navRight'>
                login goes here
            </div>
        </div>
    )
}