import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useStore } from '../store'
import type { Product } from '../types'
import { condLabel } from '../utils'
import s from './Pages.module.css'

type Key = 'category' | 'brand' | 'size' | 'cond'

export default function Catalog() {
	const { products } = useStore()
	const avail = products.filter(p => p.status === 'available')
	const [f, setF] = useState({
		category: '',
		brand: '',
		size: '',
		cond: '',
		min: '',
		max: '',
	})

	const opts = (get: (p: Product) => string) =>
		[...new Set(avail.map(get))].sort()
	const list = avail.filter(
		p =>
			(!f.category || p.category === f.category) &&
			(!f.brand || p.brand === f.brand) &&
			(!f.size || p.size === f.size) &&
			(!f.cond || condLabel(p.condition) === f.cond) &&
			(!f.min || p.price >= +f.min) &&
			(!f.max || p.price <= +f.max),
	)

	const select = (k: Key, label: string, values: string[]) => (
		<label className={s.field}>
			{label}
			<select
				className={s.input}
				value={f[k]}
				onChange={e => setF({ ...f, [k]: e.target.value })}
			>
				<option value=''>Все</option>
				{values.map(v => (
					<option key={v}>{v}</option>
				))}
			</select>
		</label>
	)

	return (
		<>
			<h1 className={s.h1}>Каталог</h1>
			<div className={s.split}>
				<aside className={s.filters} aria-label='Фильтры'>
					{select(
						'category',
						'Категория',
						opts(p => p.category),
					)}
					{select(
						'brand',
						'Бренд',
						opts(p => p.brand),
					)}
					{select(
						'size',
						'Размер',
						opts(p => p.size),
					)}
					{select(
						'cond',
						'Состояние',
						opts(p => condLabel(p.condition)),
					)}
					<div className={s.range}>
						<label className={s.field}>
							Цена от
							<input
								className={s.input}
								type='number'
								min='0'
								value={f.min}
								onChange={e => setF({ ...f, min: e.target.value })}
							/>
						</label>
						<label className={s.field}>
							до
							<input
								className={s.input}
								type='number'
								min='0'
								value={f.max}
								onChange={e => setF({ ...f, max: e.target.value })}
							/>
						</label>
					</div>
					<button
						className={s.ghost}
						onClick={() =>
							setF({
								category: '',
								brand: '',
								size: '',
								cond: '',
								min: '',
								max: '',
							})
						}
					>
						Сбросить
					</button>
				</aside>
				<section>
					<p className={s.count}>Найдено: {list.length}</p>
					{list.length ? (
						<div className={s.grid}>
							{list.map(p => (
								<ProductCard key={p.id} p={p} />
							))}
						</div>
					) : (
						<div className={s.empty}>
							Ничего не найдено. Измените условия фильтра.
						</div>
					)}
				</section>
			</div>
		</>
	)
}
