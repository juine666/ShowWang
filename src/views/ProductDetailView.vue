<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../store/products'
import { useCartStore } from '../store/cart'
import { ChevronLeft, Share, ShoppingCart, CheckCircle2 } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const product = computed(() => productsStore.getProductById(route.params.id))
const showToast = ref(false)

const goBack = () => {
  router.back()
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value, 1)
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 2000)
  }
}

const buyNow = () => {
  if (product.value) {
    cartStore.addItem(product.value, 1)
    router.push('/checkout')
  }
}

// Image Zoom Logic
const isZooming = ref(false)
const zoomStyle = ref({
  transform: 'scale(1)',
  transformOrigin: 'center center'
})

const handleMouseMove = (e) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
  const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100))
  const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100))
  
  zoomStyle.value = {
    transformOrigin: `${x}% ${y}%`,
    transform: 'scale(2.5)' // Adjust zoom level here
  }
}

const handleMouseEnter = () => {
  isZooming.value = true
}

const handleMouseLeave = () => {
  isZooming.value = false
  zoomStyle.value = {
    transform: 'scale(1)',
    transformOrigin: 'center center'
  }
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen pb-20 relative" v-if="product">
    <!-- Header (Transparent overlapping image) -->
    <header class="absolute top-0 w-full z-10 flex justify-between items-center p-4 pt-10">
      <button @click="goBack" class="w-9 h-9 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white touch-target">
        <ChevronLeft class="w-6 h-6 -ml-0.5" />
      </button>
      <button class="w-9 h-9 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white touch-target">
        <Share class="w-4 h-4" />
      </button>
    </header>

    <!-- Product Image -->
    <div 
      class="w-full aspect-square bg-white relative overflow-hidden group cursor-crosshair"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-full object-cover transition-transform duration-100 ease-out will-change-transform"
        :style="isZooming ? zoomStyle : {}"
      />
      
      <!-- Zoom indicator prompt -->
      <div 
        class="absolute inset-0 bg-black/0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        :class="{ 'hidden': isZooming }"
      >
        <div class="bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
           <span>悬浮放大</span>
        </div>
      </div>
    </div>

    <!-- Product Info Panel -->
    <div class="bg-white rounded-t-3xl -mt-6 relative z-10 p-5 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.1)]">
      <div class="flex items-end justify-between mb-2">
        <div class="flex items-baseline gap-1">
          <span class="text-rose-500 font-bold text-2xl"><span class="text-sm">¥</span>{{ product.price }}</span>
          <span v-if="product.originalPrice" class="text-gray-400 text-sm line-through ml-1">¥{{ product.originalPrice }}</span>
        </div>
        <span class="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">已售 {{ product.sales }}</span>
      </div>
      
      <h1 class="text-lg font-bold text-gray-800 leading-tight mb-2">{{ product.name }}</h1>
      <p class="text-sm text-gray-500 mb-4">{{ product.description }}</p>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="tag in product.tags" :key="tag" class="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-sm border border-emerald-100">
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Details Section -->
    <div class="mt-3 bg-white p-5">
      <h3 class="font-bold text-gray-800 mb-4 text-sm flex items-center">
        <span class="w-1 h-3 bg-emerald-500 rounded-full mr-2"></span>
        商品详情
      </h3>
      <div class="space-y-4 text-sm text-gray-600">
        <div class="flex border-b border-gray-100 pb-2">
          <span class="w-16 text-gray-400">规格</span>
          <span class="flex-1 text-gray-800">{{ product.unit }}</span>
        </div>
        <div class="flex border-b border-gray-100 pb-2">
          <span class="w-16 text-gray-400">产地</span>
          <span class="flex-1 text-gray-800">中国</span>
        </div>
        <div class="flex border-b border-gray-100 pb-2">
          <span class="w-16 text-gray-400">发货时间</span>
          <span class="flex-1 text-gray-800">付款后48小时内发货</span>
        </div>
      </div>
      <!-- Placeholder for rich detail images -->
      <div class="mt-4 pt-4 border-t border-gray-50 flex flex-col gap-2">
        <div class="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">商品宣传图1</div>
        <div class="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">商品宣传图2</div>
      </div>
    </div>

    <!-- Bottom Action Bar -->
    <div class="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)] z-50">
      <div class="flex items-center h-14 px-3 gap-3">
        <router-link to="/cart" class="flex flex-col items-center justify-center w-14 h-full text-gray-500 relative touch-target">
          <ShoppingCart class="w-5 h-5 mb-0.5" />
          <span class="text-[9px]">购物车</span>
          <span v-if="cartStore.totalItems > 0" class="absolute top-1 right-2 bg-rose-500 text-white text-[10px] px-1 py-0 rounded-full min-w-[14px] text-center font-bold">
            {{ cartStore.totalItems }}
          </span>
        </router-link>
        
        <div class="flex-1 flex gap-2 h-10">
          <button @click="addToCart" class="flex-1 rounded-full bg-emerald-100 text-emerald-600 font-medium text-sm font-bold touch-target active:bg-emerald-200 transition-colors">
            加入购物车
          </button>
          <button @click="buyNow" class="flex-1 rounded-full bg-emerald-500 text-white font-medium text-sm font-bold shadow-md shadow-emerald-500/30 touch-target active:bg-emerald-600 transition-colors">
            立即购买
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="fade">
      <div v-if="showToast" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-3 rounded-xl flex items-center gap-2 z-50 shadow-xl">
        <CheckCircle2 class="w-5 h-5 text-emerald-400" />
        <span class="text-sm font-medium">已加入购物车</span>
      </div>
    </transition>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
    <span class="text-gray-400">商品不存在</span>
  </div>
</template>
