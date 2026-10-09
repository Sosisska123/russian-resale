import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { useStore } from '../store'
import { fmt } from '../utils'
import s from './ProductCard.module.css'

export default function ProductCard({ p }: { p: Product }) {
	const { favs, toggleFav } = useStore()
	const fav = favs.includes(p.id)
	return (
		<article className={s.card}>
			<Link to={`/product/${p.id}`} className={s.link}>
				<img className={s.img} src={p.photos[0]} alt={p.title} loading='lazy' />
				<div className={s.caption}>
					<span className={s.title}>{p.title}</span>
					<span className={s.meta}>
						{p.brand} / {p.size}
					</span>
					<span className={s.price}>{fmt(p.price)}</span>
				</div>
			</Link>
			<button
				className={s.fav}
				aria-pressed={fav}
				aria-label='В избранное'
				onClick={() => toggleFav(p.id)}
			>
				{fav ? '♥' : '♡'}
			</button>
		</article>
	)
}
