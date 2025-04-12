export interface Product {
  id: number | string // Allow string ID
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: { // Make rating optional
    rate: number
    count: number
  }
}
