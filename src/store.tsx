import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react'
import type { Order, Product, Status } from './types'
import { isOrder, isProduct, isStr, loadList, save } from './storage'
import { SEED } from './seed'

const KEYS = { p: 'rr.products', c: 'rr.cart', f: 'rr.favs', o: 'rr.orders' }

interface Store {
	products: Product[]
	cart: string[]
	cartItems: Product[]
	favs: string[]
	orders: Order[]
	saveProduct(p: Product): void
	removeProduct(id: string): void
	setStatus(id: string, s: Status): void
	toggleCart(id: string): void
	toggleFav(id: string): void
	placeOrder(c: { name: string; contact: string; city: string }): Order | null
}

const Ctx = createContext<Store>(null as never)
export const useStore = () => useContext(Ctx)
const toggle = (a: string[], id: string) =>
	a.includes(id) ? a.filter(x => x !== id) : [...a, id]

export function StoreProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState(() =>
		loadList(KEYS.p, SEED, isProduct),
	)
	const [cart, setCart] = useState(() => loadList(KEYS.c, [], isStr))
	const [favs, setFavs] = useState(() => loadList(KEYS.f, [], isStr))
	const [orders, setOrders] = useState(() => loadList(KEYS.o, [], isOrder))

	useEffect(() => save(KEYS.p, products), [products])
	useEffect(() => save(KEYS.c, cart), [cart])
	useEffect(() => save(KEYS.f, favs), [favs])
	useEffect(() => save(KEYS.o, orders), [orders])

	// проданные и удалённые лоты в корзину не попадают
	const cartItems = cart
		.map(id => products.find(p => p.id === id))
		.filter((p): p is Product => !!p && p.status === 'available')

	const store: Store = {
		products,
		cart,
		cartItems,
		favs,
		orders,
		saveProduct: p =>
			setProducts(a =>
				a.some(x => x.id === p.id)
					? a.map(x => (x.id === p.id ? p : x))
					: [p, ...a],
			),
		removeProduct: id => {
			setProducts(a => a.filter(x => x.id !== id))
			setCart(a => a.filter(x => x !== id))
			setFavs(a => a.filter(x => x !== id))
		},
		setStatus: (id, status) =>
			setProducts(a => a.map(x => (x.id === id ? { ...x, status } : x))),
		toggleCart: id => setCart(a => toggle(a, id)),
		toggleFav: id => setFavs(a => toggle(a, id)),
		placeOrder: c => {
			if (!cartItems.length) return null
			const o: Order = {
				id: Date.now().toString(36),
				items: cartItems.map(({ id, title, price }) => ({ id, title, price })),
				...c,
				total: cartItems.reduce((s, p) => s + p.price, 0),
				createdAt: new Date().toISOString(),
			}
			setOrders(a => [o, ...a])
			setCart([])
			return o
		},
	}
	return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}
