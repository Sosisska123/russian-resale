import type { Order, Product } from './types'

export const isStr = (x: unknown): x is string => typeof x === 'string'
const rec = (x: unknown) => (x ?? {}) as Record<string, unknown>
const strs = (x: unknown): x is string[] => Array.isArray(x) && x.every(isStr)

export const isProduct = (x: unknown): x is Product => {
	const o = rec(x)
	return (
		isStr(o.id) &&
		isStr(o.title) &&
		isStr(o.brand) &&
		isStr(o.category) &&
		isStr(o.size) &&
		isStr(o.condition) &&
		typeof o.price === 'number' &&
		strs(o.photos) &&
		(o.status === 'available' || o.status === 'sold') &&
		isStr(o.createdAt)
	)
}
export const isOrder = (x: unknown): x is Order => {
	const o = rec(x)
	return (
		isStr(o.id) &&
		Array.isArray(o.items) &&
		isStr(o.name) &&
		isStr(o.contact) &&
		isStr(o.city) &&
		typeof o.total === 'number' &&
		isStr(o.createdAt)
	)
}

// Чтение коллекции с проверкой целостности: битые данные отбрасываются
export function loadList<T>(
	key: string,
	fallback: T[],
	guard: (x: unknown) => x is T,
): T[] {
	try {
		const raw = localStorage.getItem(key)
		if (raw === null) return fallback
		const v: unknown = JSON.parse(raw)
		if (!Array.isArray(v)) throw new Error('not array')
		return v.filter(guard)
	} catch {
		localStorage.removeItem(key)
		return fallback
	}
}
export const save = (key: string, v: unknown) => {
	try {
		localStorage.setItem(key, JSON.stringify(v))
	} catch {
		/* квота */
	}
}
