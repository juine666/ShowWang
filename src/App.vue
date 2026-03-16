<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useCartStore } from './store/cart'
import { Home, ShoppingCart, User } from 'lucide-vue-next'

const route = useRoute()
const cartStore = useCartStore()

// Only show bottom nav on main pages
const showBottomNav = computed(() => ['home', 'cart'].includes(route.name))
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col pb-[env(safe-area-inset-bottom)] text-slate-800 font-sans selection:bg-emerald-200">
    <!-- Main Content -->
    <main class="flex-1 w-full max-w-md mx-auto relative bg-slate-50 shadow-2xl overflow-hidden flex flex-col" :class="{ 'pb-[60px]': showBottomNav }">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
      
      <!-- Premium Bottom Navigation -->
      <nav v-if="showBottomNav" class="fixed bottom-0 w-full max-w-md bg-white/95 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center h-[60px] pb-[env(safe-area-inset-bottom)] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] rounded-t-[20px]">
        <router-link to="/" class="flex flex-col items-center justify-center w-full h-full text-slate-400 touch-target relative group transition-colors" active-class="!text-emerald-500">
          <div class="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-[.router-link-exact-active]:-translate-y-1">
            <Home class="w-6 h-6 mb-1 group-[.router-link-exact-active]:fill-emerald-500/10" />
            <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-[.router-link-exact-active]:opacity-100 transition-opacity"></div>
          </div>
          <span class="text-[10px] font-bold tracking-wide">首页</span>
        </router-link>
        
        <router-link to="/cart" class="flex flex-col items-center justify-center w-full h-full text-slate-400 touch-target relative group transition-colors" active-class="!text-emerald-500">
          <div class="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-[.router-link-exact-active]:-translate-y-1">
            <ShoppingCart class="w-6 h-6 mb-1 group-[.router-link-exact-active]:fill-emerald-500/10" />
            <span v-if="cartStore.totalItems > 0" class="absolute -top-1.5 -right-2.5 bg-gradient-to-tr from-rose-500 to-pink-500 text-white text-[10px] px-1.5 py-0 rounded-full min-w-[18px] text-center font-black border-2 border-white shadow-sm transform scale-100 animate-bounce-short">
              {{ cartStore.totalItems }}
            </span>
            <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-[.router-link-exact-active]:opacity-100 transition-opacity"></div>
          </div>
          <span class="text-[10px] font-bold tracking-wide">购物车</span>
        </router-link>
        
        <a href="#" class="flex flex-col items-center justify-center w-full h-full text-slate-400 touch-target relative group transition-colors hover:text-emerald-500">
          <div class="relative transition-transform duration-300 group-hover:-translate-y-0.5">
            <User class="w-6 h-6 mb-1" />
          </div>
          <span class="text-[10px] font-bold tracking-wide">我的</span>
        </a>
      </nav>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
