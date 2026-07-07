export const fallbackStore = {
  users: [
    { _id: 'user_1', name: 'Ava Martinez', email: 'ava@example.com', age: 31 },
    { _id: 'user_2', name: 'Noah Hughes', email: 'noah@example.com', age: 28 }
  ],
  products: [
    { _id: 'product_1', name: 'Aurora Desk', description: 'Ergonomic office desk', price: 249, category: 'Furniture', stock: 12, available: true },
    { _id: 'product_2', name: 'Nova Keyboard', description: 'Mechanical keyboard', price: 89, category: 'Electronics', stock: 30, available: true }
  ],
  orders: [
    {
      _id: 'order_1',
      user: 'user_1',
      items: [
        { product: 'product_1', quantity: 1, price: 249 }
      ],
      total: 249,
      shippingAddress: '12 Lake Street',
      paymentMethod: 'Card',
      status: 'Delivered'
    }
  ]
};
