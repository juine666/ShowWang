<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'
import { ChevronLeft, MapPin, Package, AlertCircle } from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()

const formData = ref({
  name: '',
  phone: '',
  address: ''
})

const goBack = () => {
  router.back()
}

const submitOrder = () => {
  if (!formData.value.name || !formData.value.phone || !formData.value.address) {
    alert("请填写完整的收件人信息")
    return
  }
  
  // Fake processing order
  alert(`下单成功！\n共支付: ¥${cartStore.totalPrice.toFixed(2)}`)
  cartStore.clearCart()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col pb-24 relative">
    <header class="bg-white px-4 py-3 sticky top-0 z-20 shadow-sm flex items-center gap-3">
      <button @click="goBack" class="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-gray-800 active:bg-gray-100 transition-colors touch-target">
        <ChevronLeft class="w-6 h-6" />
      </button>
      <h1 class="text-lg font-bold">确认订单</h1>
    </header>

    <main class="flex-1 px-4 py-4 space-y-4">
      <!-- Shipping Info -->
      <section class="bg-white rounded-2xl p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
        <div class="flex items-center mb-4">
          <MapPin class="text-emerald-500 w-5 h-5 mr-2" />
          <h2 class="font-bold text-gray-800">收货地址</h2>
        </div>
        
        <div class="space-y-3">
          <div class="flex gap-3">
            <input v-model="formData.name" placeholder="收货人姓名" class="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]" />
            <input v-model="formData.phone" type="tel" placeholder="手机号码" class="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]" />
          </div>
          <textarea v-model="formData.address" rows="2" placeholder="详细地址 (如街道、小区、房号等)" class="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"></textarea>
        </div>
        
        <!-- Mail styling border bottom -->
        <div class="absolute bottom-0 left-0 w-full h-1" style="background: repeating-linear-gradient(45deg, #fb7185, #fb7185 10px, transparent 10px, transparent 20px, #38bdf8 20px, #38bdf8 30px, transparent 30px, transparent 40px);"></div>
      </section>

      <!-- Order Summary -->
      <section class="bg-white rounded-2xl p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div class="flex items-center mb-4 border-b border-gray-50 pb-3">
          <Package class="text-emerald-500 w-5 h-5 mr-2" />
          <h2 class="font-bold text-gray-800">商品信息</h2>
        </div>
        
        <div class="space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="flex gap-3 items-center">
            <img :src="item.image" class="w-14 h-14 rounded-lg object-cover bg-gray-100" />
            <div class="flex-1 py-1">
              <h3 class="text-sm font-medium text-gray-800 line-clamp-1">{{ item.name }}</h3>
              <p class="text-xs text-gray-400 mt-1">{{ item.unit }}</p>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold">¥{{ item.price }}</div>
              <div class="text-xs text-gray-400 mt-1">x{{ item.quantity }}</div>
            </div>
          </div>
        </div>

        <div class="mt-5 pt-4 border-t border-gray-50 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">商品金额</span>
            <span class="font-medium text-gray-800">¥{{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">运费</span>
            <span class="font-medium text-emerald-600">包邮</span>
          </div>
        </div>
      </section>

      <!-- Notes/Alert -->
      <div class="bg-amber-50 rounded-xl p-3 flex gap-2 items-start border border-amber-100/50">
        <AlertCircle class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p class="text-xs text-amber-700 leading-relaxed">响应国家号召，支持绿色农业，部分产地直发商品可能需要 3-5 天送达，感谢您的支持和理解。</p>
      </div>
    </main>

    <!-- Bottom Submit Bar -->
    <div class="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)] z-30">
      <div class="flex items-center justify-between h-14 pl-5 p-2">
        <div>
          <span class="text-xs text-gray-500">实付：</span>
          <span class="text-rose-500 font-bold text-xl"><span class="text-sm">¥</span>{{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        <button 
          @click="submitOrder"
          class="bg-emerald-500 text-white font-bold h-11 px-8 rounded-full shadow-md shadow-emerald-500/30 touch-target active:scale-95 transition-transform shrink-0"
        >
          提交订单
        </button>
      </div>
    </div>
  </div>
</template>
