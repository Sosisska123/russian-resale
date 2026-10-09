export const SHOP = { tg: 'russian_resale', city: 'Казань' }
export const CATEGORIES = ['Верхняя одежда', 'Брюки', 'Футболки', 'Кроссовки']
export const CONDS = ['Новое', 'Отличное', 'Хорошее', 'Есть дефекты']

export const fmt = (n: number) =>
	new Intl.NumberFormat('ru-RU').format(n) + ' ₽'
export const condLabel = (c: string) => c.split(' — ')[0]
export const uid = () =>
	Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

export const readPhoto = (f: File) =>
	new Promise<string>(res => {
		const r = new FileReader()
		r.onload = () => {
			const img = new Image()
			img.onload = () => {
				const k = Math.min(1, 800 / Math.max(img.width, img.height))
				const c = document.createElement('canvas')
				c.width = img.width * k
				c.height = img.height * k
				c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
				res(c.toDataURL('image/jpeg', 0.7))
			}
			img.src = r.result as string
		}
		r.readAsDataURL(f)
	})
