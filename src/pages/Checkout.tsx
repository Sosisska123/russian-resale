import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import type { Order } from '../types'
import { SHOP, fmt } from '../utils'
import s from './Pages.module.css'

const message = (o: Order) =>
	[
		`Новый заказ №${o.id}`,
		...o.items.map((x, n) => `${n + 1}. ${x.title} — ${fmt(x.price)}`),
		`Итого: ${fmt(o.total)}`,
		`Имя: ${o.name}`,
		`Контакт: ${o.contact}`,
		`Город: ${o.city}`,
	].join('\n')

export default function Checkout() {
	const { cartItems, placeOrder } = useStore()
	const [v, setV] = useState({ name: '', contact: '', city: '' })
	const [err, setErr] = useState('')
	const [done, setDone] = useState<Order | null>(null)

	const submit = (e: FormEvent) => {
		e.preventDefault()
		if (!v.name.trim() || !v.contact.trim() || !v.city.trim()) {
			setErr('Заполните имя, контакт для связи и город доставки.')
			return
		}
		const o = placeOrder({
			name: v.name.trim(),
			contact: v.contact.trim(),
			city: v.city.trim(),
		})
		if (o) setDone(o)
	}

	if (done) {
		return (
			<div className={s.text}>
				<h1 className={s.h1}>Заказ №{done.id} сохранён</h1>
				<p>
					Отправьте сообщение продавцу в Telegram: он уточнит доставку и оплату.
				</p>
				<a
					className={s.btn}
					target='_blank'
					rel='noreferrer'
					href={`https://t.me/${SHOP.tg}?text=${encodeURIComponent(message(done))}`}
				>
					Открыть Telegram
				</a>
				<Link to='/catalog' className={s.ghost}>
					Вернуться в каталог
				</Link>
			</div>
		)
	}
	if (!cartItems.length) {
		return (
			<div className={s.empty}>
				В корзине нет лотов для заказа.
				<Link to='/catalog' className={s.btn}>
					В каталог
				</Link>
			</div>
		)
	}

	const field = (k: keyof typeof v, label: string) => (
		<label className={s.field}>
			{label}
			<input
				className={s.input}
				value={v[k]}
				onChange={e => setV({ ...v, [k]: e.target.value })}
			/>
		</label>
	)
	return (
		<>
			<h1 className={s.h1}>Оформление заказа</h1>
			<form className={s.form} onSubmit={submit} noValidate>
				{field('name', 'Имя')}
				{field('contact', 'Телефон или @username')}
				{field('city', 'Город доставки')}
				<p>
					Лотов: {cartItems.length}, итого{' '}
					{fmt(cartItems.reduce((a, p) => a + p.price, 0))}
				</p>
				{err && (
					<p className={s.error} role='alert'>
						{err}
					</p>
				)}
				<button className={s.btn}>Подтвердить заказ</button>
			</form>
		</>
	)
}
