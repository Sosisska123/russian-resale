import type { Product } from './types'

const ph = (t: string, g: number) =>
	'data:image/svg+xml;utf8,' +
	encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="hsl(0 0% ${g}%)"/><text x="200" y="255" font-family="monospace" font-size="20" text-anchor="middle" fill="#666">${t}</text></svg>`,
	)

const mk = (
	i: number,
	title: string,
	brand: string,
	category: string,
	size: string,
	condition: string,
	price: number,
): Product => ({
	id: 'seed' + i,
	title,
	brand,
	category,
	size,
	condition,
	price,
	photos: [ph(brand + ' / ' + title, 90 + (i % 3) * 3), ph('вид сзади', 88)],
	status: 'available',
	createdAt: new Date(2026, 8, i + 1).toISOString(),
})

export const SEED: Product[] = [
	mk(1, 'Бомбер Archive', 'ERD', 'Верхняя одежда', 'L', 'Отличное', 64000),
	mk(
		2,
		'Брюки карго',
		'Rick Owens',
		'Брюки',
		'48',
		'Хорошее — потёртости на коленях',
		38000,
	),
	mk(3, 'Футболка Gazelle', 'MM', 'Футболки', 'M', 'Новое', 9500),
	mk(
		4,
		'Кроссовки Track',
		'Balenciaga',
		'Кроссовки',
		'43',
		'Есть дефекты — стёрта подошва',
		27000,
	),
	mk(
		5,
		'Куртка Hooded',
		'Number (N)ine',
		'Верхняя одежда',
		'M',
		'Хорошее',
		52000,
	),
	mk(6, 'Футболка Level', 'Rick Owens', 'Футболки', 'L', 'Отличное', 14000),
	mk(7, 'Брюки Wide', 'ERD', 'Брюки', '50', 'Новое', 31000),
	mk(8, 'Кроссовки Tabi', 'MM', 'Кроссовки', '42', 'Отличное', 36000),
]
