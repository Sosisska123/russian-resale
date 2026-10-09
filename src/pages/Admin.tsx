import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import type { Product } from '../types'
import { CATEGORIES, CONDS, fmt, readPhoto, uid } from '../utils'
import s from './Pages.module.css'
import a from './Admin.module.css'

const empty = {
	title: '',
	brand: '',
	category: CATEGORIES[0],
	size: '',
	cond: CONDS[0],
	note: '',
	price: '',
	photos: [] as string[],
}

export default function Admin() {
	const { products, orders, saveProduct, removeProduct, setStatus } = useStore()
	const [d, setD] = useState(empty)
	const [editId, setEditId] = useState<string | null>(null)

	const set =
		(k: keyof typeof empty) =>
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
			setD({ ...d, [k]: e.target.value })

	const edit = (p: Product) => {
		const [cond, ...note] = p.condition.split(' — ')
		setEditId(p.id)
		setD({
			title: p.title,
			brand: p.brand,
			category: p.category,
			size: p.size,
			cond,
			note: note.join(' — '),
			price: String(p.price),
			photos: p.photos,
		})
		window.scrollTo(0, 0)
	}
	const upload = async (e: ChangeEvent<HTMLInputElement>) => {
		const added = await Promise.all([...(e.target.files ?? [])].map(readPhoto))
		setD(x => ({ ...x, photos: [...x.photos, ...added] }))
		e.target.value = ''
	}
	const submit = (e: FormEvent) => {
		e.preventDefault()
		const old = products.find(x => x.id === editId)
		const note = d.note.trim()
		saveProduct({
			id: editId ?? uid(),
			title: d.title.trim(),
			brand: d.brand.trim(),
			category: d.category,
			size: d.size.trim(),
			condition: note ? `${d.cond} — ${note}` : d.cond,
			price: +d.price,
			photos: d.photos,
			status: old?.status ?? 'available',
			createdAt: old?.createdAt ?? new Date().toISOString(),
		})
		setD(empty)
		setEditId(null)
	}

	const input = (
		k: 'title' | 'brand' | 'size' | 'price' | 'note',
		label: string,
		req = true,
	) => (
		<label className={s.field}>
			{label}
			<input
				className={s.input}
				required={req}
				type={k === 'price' ? 'number' : 'text'}
				min={k === 'price' ? 1 : undefined}
				value={d[k]}
				onChange={set(k)}
			/>
		</label>
	)
	const pick = (k: 'category' | 'cond', label: string, vals: string[]) => (
		<label className={s.field}>
			{label}
			<select className={s.input} value={d[k]} onChange={set(k)}>
				{vals.map(v => (
					<option key={v}>{v}</option>
				))}
			</select>
		</label>
	)

	return (
		<div className={a.wrap}>
			<div className={a.top}>
				<h1 className={s.h2} style={{ margin: 0 }}>
					Панель администратора
				</h1>
				<Link to='/' className={s.ghost}>
					На сайт
				</Link>
			</div>

			<form className={a.form} onSubmit={submit}>
				{input('title', 'Наименование')}
				{input('brand', 'Бренд')}
				{pick('category', 'Категория', CATEGORIES)}
				{input('size', 'Размер')}
				{pick('cond', 'Состояние', CONDS)}
				{input('note', 'Описание дефектов', false)}
				{input('price', 'Цена, ₽')}
				<div className={`${a.wide} ${s.field}`}>
					Фотографии
					<input type='file' accept='image/*' multiple onChange={upload} />
					<div className={a.photos}>
						{d.photos.map((src, n) => (
							<button
								type='button'
								key={n}
								title='Убрать фото'
								onClick={() =>
									setD({ ...d, photos: d.photos.filter((_, j) => j !== n) })
								}
							>
								<img src={src} alt='' />
							</button>
						))}
					</div>
				</div>
				<div className={`${a.wide} ${a.btns}`}>
					<button className={s.btn} disabled={!d.photos.length}>
						{editId ? 'Сохранить изменения' : 'Добавить товар'}
					</button>
					{editId && (
						<button
							type='button'
							className={s.ghost}
							onClick={() => {
								setD(empty)
								setEditId(null)
							}}
						>
							Отмена
						</button>
					)}
				</div>
			</form>

			<section>
				<h2 className={s.h2}>Товары ({products.length})</h2>
				<div className={a.table}>
					{products.map(p => (
						<div key={p.id} className={a.tr}>
							<img src={p.photos[0]} alt='' />
							<div className={p.status === 'sold' ? a.sold : ''}>
								{p.title}, {p.brand}, {p.size} — {fmt(p.price)}
								<br />
								<small>
									{p.status === 'sold'
										? 'Продано (скрыто из каталога)'
										: 'В каталоге'}
								</small>
							</div>
							<div className={a.btns}>
								<button className={s.ghost} onClick={() => edit(p)}>
									Изменить
								</button>
								<button
									className={s.ghost}
									onClick={() =>
										setStatus(p.id, p.status === 'sold' ? 'available' : 'sold')
									}
								>
									{p.status === 'sold' ? 'Вернуть в каталог' : 'Продано'}
								</button>
								<button
									className={s.ghost}
									onClick={() =>
										confirm('Удалить товар?') && removeProduct(p.id)
									}
								>
									Удалить
								</button>
							</div>
						</div>
					))}
				</div>
			</section>

			<section>
				<h2 className={s.h2}>Заказы ({orders.length})</h2>
				{orders.length ? (
					orders.map(o => (
						<div key={o.id} className={a.order}>
							<strong>№{o.id}</strong> от{' '}
							{new Date(o.createdAt).toLocaleString('ru-RU')} — {fmt(o.total)}
							<br />
							{o.name}, {o.contact}, {o.city}
							<br />
							{o.items.map(x => x.title).join('; ')}
						</div>
					))
				) : (
					<p className={s.count}>Заказов пока нет.</p>
				)}
			</section>
		</div>
	)
}
