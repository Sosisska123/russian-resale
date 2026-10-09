import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useStore } from '../store'
import { SHOP } from '../utils'
import s from './Layout.module.css'

const NAV = [
	['/catalog', 'Каталог'],
	['/about', 'О проекте'],
	['/delivery', 'Доставка и оплата'],
	['/contacts', 'Контакты'],
]

export default function Layout() {
	const { cartItems, favs } = useStore()
	const [open, setOpen] = useState(false)
	const [showTop, setShowTop] = useState(false)
	const { pathname } = useLocation()

	useEffect(() => window.scrollTo(0, 0), [pathname])
	useEffect(() => {
		const on = () => setShowTop(window.scrollY > 600)
		window.addEventListener('scroll', on)
		return () => window.removeEventListener('scroll', on)
	}, [])

	return (
		<>
			<header className={s.header}>
				<div className={s.bar}>
					<Link to='/' className={s.logo}>
						Русский Ресейл
					</Link>
					<nav
						className={`${s.nav} ${open ? s.open : ''}`}
						onClick={() => setOpen(false)}
					>
						{NAV.map(([to, t]) => (
							<NavLink
								key={to}
								to={to}
								className={({ isActive }) => (isActive ? s.active : '')}
							>
								{t}
							</NavLink>
						))}
					</nav>
					<div className={s.tools}>
						<Link to='/favorites'>Избранное ({favs.length})</Link>
						<Link to='/cart'>Корзина ({cartItems.length})</Link>
						<button
							className={s.burger}
							aria-expanded={open}
							onClick={() => setOpen(!open)}
						>
							Меню
						</button>
					</div>
				</div>
			</header>
			<main className={s.main}>
				<Outlet />
			</main>
			<footer className={s.footer}>
				<div className={s.footerIn}>
					<div>
						<strong>Русский Ресейл</strong>
						<span>{SHOP.city}</span>
					</div>
					<div>
						<Link to='/catalog'>Каталог</Link>
						<Link to='/delivery'>Доставка и оплата</Link>
					</div>
					<div>
						<a
							href={`https://t.me/${SHOP.tg}`}
							target='_blank'
							rel='noreferrer'
						>
							Telegram: @{SHOP.tg}
						</a>
						<Link to='/contacts'>Контакты</Link>
					</div>
				</div>
			</footer>
			{showTop && (
				<button className={s.top} onClick={() => window.scrollTo({ top: 0 })}>
					Наверх
				</button>
			)}
		</>
	)
}
