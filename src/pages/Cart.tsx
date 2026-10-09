import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { fmt } from '../utils'
import s from './Pages.module.css'

export default function Cart() {
	const { cartItems, toggleCart } = useStore()
	const total = cartItems.reduce((a, p) => a + p.price, 0)
	return (
		<>
			<h1 className={s.h1}>Корзина</h1>
			{cartItems.length ? (
				<>
					<div className={s.rows}>
						{cartItems.map(p => (
							<div key={p.id} className={s.row}>
								<img src={p.photos[0]} alt='' />
								<Link to={`/product/${p.id}`}>
									{p.title}
									<br />
									<small>
										{p.brand} / {p.size}
									</small>
								</Link>
								<strong>{fmt(p.price)}</strong>
								<button className={s.ghost} onClick={() => toggleCart(p.id)}>
									Убрать
								</button>
							</div>
						))}
					</div>
					<div className={s.total}>
						<span>Итого: {fmt(total)}</span>
						<Link to='/checkout' className={s.btn}>
							Оформить заказ
						</Link>
					</div>
				</>
			) : (
				<div className={s.empty}>
					Корзина пуста.
					<Link to='/catalog' className={s.btn}>
						В каталог
					</Link>
				</div>
			)}
		</>
	)
}
