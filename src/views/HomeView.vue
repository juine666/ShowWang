<script setup>
import { useProductsStore } from '../store/products'
import { MessageCircle, Phone, Search } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const productsStore = useProductsStore()
const router = useRouter()

const goToDetail = (id) => {
  router.push(`/product/${id}`)
}
</script>

<template>
  <div class="min-h-full bg-slate-50 pb-6 relative section-home">
    <!-- Premium Header -->
    <header class="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white pt-12 pb-5 px-5 sticky top-0 z-30 shadow-[0_4px_20px_rgba(16,185,129,0.2)] rounded-b-[24px] mb-2">
      <div class="flex items-center justify-between mb-5 relative z-10">
        <h1 class="text-2xl font-extrabold tracking-tight drop-shadow-sm">源产地甄选</h1>
        <div class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </div>
      </div>
      
      <!-- Search Bar -->
      <div class="relative flex items-center w-full h-11 rounded-2xl bg-white/20 px-4 backdrop-blur-md border border-white/30 shadow-inner group transition-all focus-within:bg-white/30">
        <Search class="w-5 h-5 text-emerald-50 transition-colors group-focus-within:text-white" />
        <input 
          type="text" 
          placeholder="搜索应季生鲜..." 
          class="ml-2.5 bg-transparent text-white placeholder-emerald-100/80 focus:outline-none w-full text-[15px] font-medium"
        />
      </div>
      
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div class="absolute bottom-0 left-10 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl translate-y-1/2"></div>
    </header>

    <!-- Premium Banner -->
    <div class="px-4 mt-5">
      <div class="w-full h-40 bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-600 rounded-[24px] shadow-[0_8px_20px_rgba(52,211,153,0.25)] text-white p-6 flex flex-col justify-center relative overflow-hidden border border-emerald-300/30">
        <div class="relative z-10">
          <span class="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-bold mb-2 border border-white/20 drop-shadow-sm">产地直发 限时特惠</span>
          <h2 class="text-[28px] font-black tracking-wide mb-1 drop-shadow-md">春季尝鲜季</h2>
          <p class="text-emerald-50 text-sm font-medium drop-shadow">新鲜采摘 · 顺丰冷链包邮</p>
        </div>
        <!-- Decorative circles -->
        <div class="absolute -right-8 -bottom-8 w-40 h-40 bg-gradient-to-tl from-white/30 to-transparent rounded-full blur-2xl"></div>
        <div class="absolute right-4 top-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
      </div>
    </div>

    <!-- Enhanced Product Grid -->
    <div class="px-4 mt-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-[19px] font-extrabold text-slate-800 flex items-center tracking-tight">
          <span class="w-1.5 h-5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full mr-2.5 shadow-sm"></span>
          热卖推荐
        </h3>
        <span class="text-xs text-emerald-600 font-medium flex items-center">查看全部 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-0.5"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
      </div>
      
      <div class="grid grid-cols-2 gap-3.5">
        <div 
          v-for="product in productsStore.products" 
          :key="product.id"
          @click="goToDetail(product.id)"
          class="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(149,157,165,0.12)] active:scale-[0.97] transition-all duration-300 touch-target border border-slate-100 group flex flex-col"
        >
          <!-- Image Container with soft gradient overlay -->
          <div class="aspect-[4/3] w-full bg-slate-50 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 pointer-events-none"></div>
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
            
            <!-- Premium Tag -->
            <div v-if="product.tags[0]" class="absolute top-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[11px] px-2 py-1 rounded-br-[12px] font-semibold tracking-wide z-20 shadow-sm">
              {{ product.tags[0] }}
            </div>
          </div>
          
          <!-- Content area -->
          <div class="p-3.5 flex flex-col flex-1">
            <h4 class="text-[14px] font-bold text-slate-800 line-clamp-2 leading-snug mb-1">{{ product.name }}</h4>
            <span class="text-[11px] text-slate-400 mb-2 mt-auto">{{ product.unit }}</span>
            
            <div class="flex justify-between items-end mt-1">
              <div class="flex flex-col">
                <div class="flex items-baseline gap-1.5">
                  <span class="text-rose-500 font-black text-[19px] leading-none"><span class="text-xs font-bold">¥</span>{{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-slate-300 text-[11px] line-through font-medium">¥{{ product.originalPrice }}</span>
                </div>
                <span class="text-[10px] text-slate-400 font-medium mt-1">已售 {{ product.sales }}</span>
              </div>
              
              <!-- Premium Add Button -->
              <button class="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white touch-target shadow-md shadow-emerald-500/20 active:scale-90 transition-transform" @click.stop="goToDetail(product.id)">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Floating Actions -->
    <div class="fixed right-4 bottom-24 flex flex-col gap-3.5 z-40 drop-shadow-xl">
      <a href="tel:4001234567" class="w-[46px] h-[46px] bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)] text-emerald-600 touch-target active:bg-slate-50 border border-slate-100 transition-colors">
        <Phone class="w-5 h-5" />
      </a>
      <button class="w-[50px] h-[50px] bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(16,185,129,0.35)] text-white touch-target outline-none focus:outline-none transform transition active:scale-90 hover:scale-105">
        <MessageCircle class="w-[22px] h-[22px]" />
      </button>
    </div>
  </div>
</template>
