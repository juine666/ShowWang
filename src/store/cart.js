import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])

    function addItem(product, quantity = 1) {
        const existing = items.value.find(i => i.id === product.id)
        if (existing) {
            existing.quantity += quantity
        } else {
            items.value.push({ ...product, quantity })
        }
    }

    function removeItem(productId) {
        const index = items.value.findIndex(i => i.id === productId)
        if (index > -1) {
            items.value.splice(index, 1)
        }
    }

    function updateQuantity(productId, quantity) {
        const item = items.value.find(i => i.id === productId)
        if (item) {
            if (quantity <= 0) {
                removeItem(productId)
            } else {
                item.quantity = quantity
            }
        }
    }

    const totalItems = computed(() => {
        return items.value.reduce((acc, item) => acc + item.quantity, 0)
    })

    const totalPrice = computed(() => {
        return items.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    })

    function clearCart() {
        items.value = []
    }

    return { items, addItem, removeItem, updateQuantity, totalItems, totalPrice, clearCart }
})
