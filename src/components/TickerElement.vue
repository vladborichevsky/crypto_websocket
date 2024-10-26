<template>
  <div 
    class="bg-mainGreen w-36 h-36 rounded-full flex flex-col justify-around p-2.5 m-4 mt-0 border-2 border-lightGreen  sm:w-56 sm:h-56 sm:m-4" 
    :class="{ same_ticker: sameTicker === ticker.name }">

    <div 
      class="text-base font-semibold text-white sm:text-2xl">
        {{ ticker.name }}
    </div>

    <my-spinner 
      v-if="!ticker.price"/> 

    <div 
      v-else 
      class="font-serif text-2xl min-h-8 flex justify-center items-center font-bold text-amber-400 sm:min-h-24 sm:text-4xl">
        {{ ticker.price }} $
    </div>

    <delete-ticker-button
      @deleteTickerEmit="deleteTicker(ticker.name)"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    ticker: Object,
    sameTicker: String
  })

	const emit = defineEmits(['deleteTicker'])
    
  const deleteTicker = (tickerName) => {
    emit('deleteTicker', tickerName)
  }
</script>


<style scoped>
  .same_ticker {
    transition: all 0.3s;
    border: 2px solid #ffff;
  }
</style>