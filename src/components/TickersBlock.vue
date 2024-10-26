
<template>
  <div class="w-full flex justify-center flex-wrap mx-auto mt-1.5">
    <div 
      v-for="(ticker, index) in tickerList" 
      :key="index">

        <ticker-element
          :ticker="ticker"
          :sameTicker="sameTicker"
          @deleteTicker="deleteTicker"/>
    </div>
  </div>
</template>



<script setup>
  import TickerElement from '@/components/TickerElement.vue'

  const props = defineProps({
    tickerList: Array,
    sameTicker: String
  })

  const emit = defineEmits(['deleteTicker'])

  const deleteTicker = (tickerName) => {
    emit('deleteTicker', tickerName)
  }
</script>
