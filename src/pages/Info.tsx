import { SHOP } from '../utils'
import s from './Pages.module.css'

const T = {
	about: {
		h: 'О проекте',
		p: [
			'Русский Ресейл — курируемая подборка перепродаваемых вещей: верхняя и нижняя одежда, кроссовки и стритвир, включая дизайнерский сегмент.',
			'Каждая вещь существует в одном экземпляре. Мы отбираем лоты по состоянию и честно описываем дефекты, поэтому ассортимент обновляется постоянно.',
		],
	},
	delivery: {
		h: 'Доставка и оплата',
		p: [
			'Заказ оформляется без регистрации: вы заполняете форму, и сообщение с составом заказа уходит продавцу в Telegram.',
			'Способ доставки — пункт выдачи или курьер — и способ оплаты согласуются с продавцом в переписке.',
		],
	},
	contacts: {
		h: 'Контакты',
		p: [`Город: ${SHOP.city}`, `Telegram: @${SHOP.tg}`],
	},
}

export default function Info({ page }: { page: keyof typeof T }) {
	const { h, p } = T[page]
	return (
		<div className={s.text}>
			<h1 className={s.h1}>{h}</h1>
			{p.map(t => (
				<p key={t}>{t}</p>
			))}
			{page === 'contacts' && (
				<a
					className={s.btn}
					href={`https://t.me/${SHOP.tg}`}
					target='_blank'
					rel='noreferrer'
				>
					Написать в Telegram
				</a>
			)}
		</div>
	)
}
