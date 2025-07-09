import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import store from './Redux/store.ts'
import MainLayout from './layout/MainLayout.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home/HomePage.tsx'
import AllBooks from './components/AllBooks.tsx'
import BookDetails from './pages/BookDetails.tsx'
import AddBook from './pages/AddBook.tsx'
import EditBook from './pages/EditBook.tsx'
import BorrowBookForm from './pages/BorrowBookForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/all-books' element={<AllBooks />
            } />
            <Route path='/book/:id' element={<BookDetails/>}/>
            <Route path='/add-book' element={<AddBook/>}/>
            <Route path='/edit-book/:id' element={<EditBook/>}/>
            <Route path='/borrow-book/:id' element={<BorrowBookForm/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
