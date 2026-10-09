import { Link } from 'react-router-dom'
import s from './Pages.module.css'

export default function NotFound() {
	return (
		<div className={s.empty}>
			Страница не найдена.
			<Link to='/' className={s.btn}>
				На главную
			</Link>
		</div>
	)
}
