

const Footer: React.FC  = () => {
  return (
    <footer className="bg-gray-900 max-w-screen flex flex-col items-center justify-center text-gray-300 py-10 px-6 md:px-16">
      <div className="flex items-center max-w-screen-2xl mx-auto  flex-col md:flex-row justify-evenly gap-8">
        <div className="md:w-3/3">
          <h2 className="text-3xl font-serif text-yellow-400 mb-3">Book Heaven</h2>
          <p className="text-gray-400 leading-relaxed">
            Your trusted digital library. Explore, borrow, and manage your books effortlessly with us.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:w-3/3 grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="/all-books" className="hover:text-yellow-400 transition-colors">All Books</a></li>
              <li><a href="/add-book" className="hover:text-yellow-400 transition-colors">Add Book</a></li>
              <li><a href="/borrow" className="hover:text-yellow-400 transition-colors">Borrow Books</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@libraryapp.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Library St, Booktown</li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="md:w-1/3 flex flex-col items-start space-y-4">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Follow Us</h3>
          <div className="flex space-x-6 text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-yellow-400 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.326v21.348c0 .732.593 1.326 1.325 1.326h11.495v-9.294h-3.13v-3.622h3.13v-2.672c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.466.099 2.796.143v3.24h-1.918c-1.505 0-1.797.715-1.797 1.763v2.314h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.594 1.324-1.326V1.326c0-.733-.594-1.326-1.324-1.326z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-yellow-400 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557a9.825 9.825 0 0 1-2.828.775 4.933 4.933 0 0 0 2.165-2.724c-.95.563-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.373 4.482c-4.083-.205-7.702-2.159-10.126-5.134a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.215 2.188 4.099a4.904 4.904 0 0 1-2.228-.616c-.054 2.385 1.675 4.623 4.146 5.117a4.936 4.936 0 0 1-2.224.084c.63 1.964 2.445 3.393 4.6 3.435A9.869 9.869 0 0 1 0 19.54a13.933 13.933 0 0 0 7.548 2.212c9.057 0 14.009-7.514 14.009-14.02 0-.213-.004-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-yellow-400 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm8.5 1.5a4.25 4.25 0 0 1 4.25 4.25v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5a4.25 4.25 0 0 1-4.25-4.25v-8.5a4.25 4.25 0 0 1 4.25-4.25h8.5zm-4.25 3a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zm0 1.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5zm4.75-.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm select-none">
        &copy; {new Date().getFullYear()} LibraryApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
