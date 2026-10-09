import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Favorites from './pages/Favorites'
import Info from './pages/Info'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='catalog' element={<Catalog />} />
				<Route path='product/:id' element={<ProductPage />} />
				<Route path='cart' element={<Cart />} />
				<Route path='checkout' element={<Checkout />} />
				<Route path='favorites' element={<Favorites />} />
				<Route path='about' element={<Info page='about' />} />
				<Route path='delivery' element={<Info page='delivery' />} />
				<Route path='contacts' element={<Info page='contacts' />} />
				<Route path='*' element={<NotFound />} />
			</Route>
			<Route path='admin' element={<Admin />} />
		</Routes>
	)
}
