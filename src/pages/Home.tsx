import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../store'
import s from './Pages.module.css'

export default function Home() {
	const { products } = useStore()
	const fresh = products
		.filter(p => p.status === 'available')
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
		.slice(0, 4)
	return (
		<>
			<section className={s.hero}>
				<h1 className={s.heroTitle}>
					Русский
					<br />
					Ресейл
				</h1>
				<p className={s.heroText}>
					Отобранные вещи в единственном экземпляре: верхняя одежда, брюки,
					футболки и кроссовки. Заказ — в мессенджере, без регистрации.
				</p>
				<Link to='/catalog' className={s.heroBtn}>
					Открыть каталог
				</Link>
			</section>
			<h2 className={s.h2}>Новые поступления</h2>
			{fresh.length ? (
				<div className={s.grid}>
					{fresh.map(p => (
						<ProductCard key={p.id} p={p} />
					))}
				</div>
			) : (
				<div className={s.empty}>Пока нет доступных лотов.</div>
			)}
		</>
	)
}
