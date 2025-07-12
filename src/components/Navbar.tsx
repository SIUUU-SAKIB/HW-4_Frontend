import { NavLink } from 'react-router-dom'
import logo from '../assets/FINAL LOGO.png'

const Navbar: React.FC  = () => {
  return (
    <header className='w-full bg-[var(--color-secondary)] shadow-sm'>
      <nav className='max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex flex-col md:flex-row items-center justify-between gap-4'>
        
        {/* Logo */}
        <NavLink to="/" className="shrink-0">
          <img
            src={logo}
            alt="Library Logo"
            className="h-10 md:h-12 object-contain"
          />
        </NavLink>

        {/* Nav Links */}
        <ul className='flex flex-col md:flex-row items-center gap-3 md:gap-6 text-sm md:text-base font-semibold font-primary'>
            <NavLink
            to="/"
            className={({ isActive }) =>
              `uppercase tracking-wide transition hover:text-[var(--color-accent)] ${
                isActive ? 'text-[var(--color-primary)] underline' : 'text-black'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-books"
            className={({ isActive }) =>
              `uppercase tracking-wide transition hover:text-[var(--color-accent)] ${
                isActive ? 'text-[var(--color-primary)] underline' : 'text-black'
              }`
            }
          >
            All Books
          </NavLink>

          <NavLink
            to="/add-book"
            className={({ isActive }) =>
              `uppercase tracking-wide transition hover:text-[var(--color-accent)] ${
                isActive ? 'text-[var(--color-primary)] underline' : 'text-black'
              }`
            }
          >
            Add Book
          </NavLink>

          <NavLink
            to="/borrowed-summary"
            className={({ isActive }) =>
              `uppercase tracking-wide transition hover:text-[var(--color-accent)] ${
                isActive ? 'text-[var(--color-primary)] underline' : 'text-black'
              }`
            }
          >
            Borrowed Books
          </NavLink>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
