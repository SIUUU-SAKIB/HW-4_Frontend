import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/FINAL LOGO.png'

const Navbar = () => {
    return (
        <div className='min-w-screen bg-[var(--color-secondary)] py-2 md:py-3 lg:py-4 '>
            <div className='flex items-center justify-between px-6 md:px-12 lg:px-16'>


                <img
                    className="block w-1/2 md:w-2/5 lg:w-1/5 object-cover"
                    src={logo}
                    alt="Logo"
                />






                <ul className='flex flex-col items-center gap-1'>
                    <Link to={'/all-books'}><li className='uppercase font-semibold text-lg font-primary text-[var(--color-primary)] cursor-pointer hover:underline md:text-4xl lg:text-6xl'>all books</li></Link>
                    <li className='uppercase font-semibold text-lg font-primary text-[var(--color-primary)] cursor-pointer transition duration-300 hover:underline md:text-4xl lg:text-6xl'><NavLink to={'/add-book'}>add books</NavLink></li>
                    <li className='uppercase font-semibold text-lg font-primary text-[var(--color-primary)] cursor-pointer transition duration-100 ease-in-out hover:underline md:text-4xl lg:text-6xl'>borrow books</li>

                </ul>
            </div>
        </div>
    )
}

export default Navbar