<script setup>
import { useCartStore } from '../store/cart'
import { useRouter } from 'vue-router'
import { Plus, Minus, Trash2, ArrowRight } from 'lucide-vue-next'

const cartStore = useCartStore()
const router = useRouter()

const goCheckout = () => {
  if (cartStore.totalItems > 0) {
    router.push('/checkout')
  }
}
</script>

<template>
  <div class="h-full bg-gray-50 flex flex-col pt-4">
    <header class="px-5 mb-4 shrink-0">
      <h1 class="text-2xl font-bold tracking-tight text-gray-800">购物车</h1>
      <p class="text-sm text-gray-400 mt-1">共 {{ cartStore.totalItems }} 件商品</p>
    </header>

    <!-- Cart Items -->
    <div class="flex-1 overflow-y-auto px-4 pb-20 hide-scrollbar" v-if="cartStore.items.length > 0">
      <div 
        v-for="item in cartStore.items" 
        :key="item.id"
        class="bg-white rounded-2xl p-4 mb-3 shadow-[0_4px_10px_-4px_rgba(0,0,0,0.05)] flex gap-3 relative"
      >
        <!-- Delete Button -->
        <button 
          @click="cartStore.removeItem(item.id)" 
          class="absolute top-3 right-3 text-gray-300 hover:text-rose-500 transition-colors p-1"
        >
          <Trash2 class="w-4 h-4" />
        </button>

        <!-- Product Image -->
        <div class="w-20 h-20 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
          <img :src="item.image" :alt="item.name" class="w-full h-full object-cover mix-blend-multiply" />
        </div>

        <!-- Product Details & Actions -->
        <div class="flex-1 flex flex-col justify-between py-0.5">
          <div class="pr-6">
            <h3 class="text-sm font-bold text-gray-800 line-clamp-1 h-5">{{ item.name }}</h3>
            <span class="text-[10px] text-gray-400 mt-1 inline-block bg-gray-50 px-1.5 py-0.5 rounded">{{ item.unit }}</span>
          </div>
          
          <div class="flex items-center justify-between mt-2">
            <span class="text-rose-500 font-bold text-lg"><span class="text-xs">¥</span>{{ item.price }}</span>
            
            <!-- Quantity Controls -->
            <div class="flex items-center gap-2 bg-gray-50 rounded-full p-0.5 border border-gray-100">
              <button 
                @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                class="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 touch-target active:bg-gray-100"
              >
                <Minus class="w-3.5 h-3.5" />
              </button>
              <span class="w-5 text-center text-sm font-medium text-gray-700">{{ item.quantity }}</span>
              <button 
                @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                class="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 touch-target active:bg-gray-100"
              >
                <Plus class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div class="flex-1 flex flex-col items-center justify-center -mt-10 px-6" v-else>
      <div class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-300">
        <ShoppingCart class="w-12 h-12" />
      </div>
      <h2 class="text-gray-800 font-bold text-lg mb-2">购物车空空如也</h2>
      <p class="text-gray-400 text-sm mb-6 text-center">再去挑点好农货吧，总有让你心动的</p>
      <router-link to="/" class="bg-emerald-500 text-white font-medium pl-6 pr-5 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-emerald-500/30 touch-target active:scale-95 transition-transform">
        去逛逛
        <ArrowRight class="w-4 h-4" />
      </router-link>
    </div>

    <!-- Bottom Checkout Bar (overrides app-level bottom nav slightly by sitting above it, or inside content area) -->
    <div v-if="cartStore.items.length > 0" class="fixed bottom-14 w-full max-w-md bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between z-40 shadow-[0_-10px_10px_-5px_rgba(0,0,0,0.02)] pl-5">
      <div class="flex flex-col">
        <span class="text-xs text-gray-400 mb-0.5">合计金额</span>
        <div class="text-rose-500 font-bold text-xl flex items-baseline">
          <span class="text-sm">¥</span>{{ cartStore.totalPrice.toFixed(2) }}
        </div>
      </div>
      
      <button 
        @click="goCheckout"
        class="bg-emerald-500 text-white font-bold h-11 px-8 rounded-full shadow-md shadow-emerald-500/30 touch-target active:scale-95 transition-transform"
      >
        去结算 ({{ cartStore.totalItems }})
      </button>
    </div>
  </div>
</template>
