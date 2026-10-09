export type Status = 'available' | 'sold'

export interface Product {
	id: string
	title: string
	brand: string
	category: string
	size: string
	condition: string
	price: number
	photos: string[]
	status: Status
	createdAt: string
}

export interface OrderItem {
	id: string
	title: string
	price: number
}

export interface Order {
	id: string
	items: OrderItem[]
	name: string
	contact: string
	city: string
	total: number
	createdAt: string
}
