<template>
  <button
    @click="addTickerEmit()"
    class="w-48 uppercase cursor-pointer rounded-sm py-1 px-4 m-1.5 border-2 border-mainGreen bg-mainGreen text-white text-base lg:hover:transition-all lg:hover:border-lightGreen lg:hover:bg-lightGreen disabled:cursor-not-allowed disabled:border-greyColor disabled:bg-greyColor">
      добавить тикер
  </button>
</template>


<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'add-ticker-button',

    setup(props, { emit }) {
    
    const addTickerEmit = () => {
      emit('addTickerEmit')
    }

      return { addTickerEmit }
    }
  })
</script>