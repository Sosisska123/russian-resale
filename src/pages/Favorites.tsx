import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../store'
import s from './Pages.module.css'

export default function Favorites() {
	const { products, favs } = useStore()
	const list = favs.flatMap(id => products.filter(p => p.id === id))
	return (
		<>
			<h1 className={s.h1}>Избранное</h1>
			{list.length ? (
				<div className={s.grid}>
					{list.map(p => (
						<ProductCard key={p.id} p={p} />
					))}
				</div>
			) : (
				<div className={s.empty}>
					Здесь появятся лоты, которые вы отметите сердцем.
					<Link to='/catalog' className={s.btn}>
						В каталог
					</Link>
				</div>
			)}
		</>
	)
}
