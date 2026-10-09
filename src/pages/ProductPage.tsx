import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../store'
import { fmt } from '../utils'
import s from './Pages.module.css'

export default function ProductPage() {
	const { id } = useParams()
	const { products, cart, favs, toggleCart, toggleFav } = useStore()
	const [i, setI] = useState(0)
	const p = products.find(x => x.id === id)

	if (!p) {
		return (
			<div className={s.empty}>
				Лот не найден: возможно, он удалён.
				<Link to='/catalog' className={s.btn}>
					В каталог
				</Link>
			</div>
		)
	}
	const sold = p.status === 'sold'
	const inCart = cart.includes(p.id)
	const fav = favs.includes(p.id)

	return (
		<div className={s.product}>
			<div className={s.gallery}>
				<img
					className={s.main}
					src={p.photos[i] ?? p.photos[0]}
					alt={p.title}
				/>
				{p.photos.length > 1 && (
					<div className={s.thumbs}>
						{p.photos.map((src, n) => (
							<button
								key={n}
								className={s.thumb}
								aria-current={n === i}
								aria-label={`Фото ${n + 1}`}
								onClick={() => setI(n)}
							>
								<img src={src} alt='' />
							</button>
						))}
					</div>
				)}
			</div>
			<div>
				<h1 className={s.h1}>{p.title}</h1>
				<p className={s.price}>{fmt(p.price)}</p>
				{sold && <span className={s.sold}>Продано</span>}
				<dl className={s.attrs}>
					<dt>Бренд</dt>
					<dd>{p.brand}</dd>
					<dt>Категория</dt>
					<dd>{p.category}</dd>
					<dt>Размер</dt>
					<dd>{p.size}</dd>
					<dt>Состояние</dt>
					<dd>{p.condition}</dd>
				</dl>
				<div className={s.actions}>
					<button
						className={s.btn}
						disabled={sold}
						onClick={() => toggleCart(p.id)}
					>
						{inCart ? 'Убрать из корзины' : 'В корзину'}
					</button>
					<button className={s.ghost} onClick={() => toggleFav(p.id)}>
						{fav ? 'Убрать из избранного' : 'В избранное'}
					</button>
				</div>
				<p className={s.count}>Лот в единственном экземпляре.</p>
			</div>
		</div>
	)
}
