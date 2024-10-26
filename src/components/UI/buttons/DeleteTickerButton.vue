<template>
  <button 
    @click="deleteTickerEmit()" 
    class="uppercase cursor-pointer w-20 mx-auto py-1.5 rounded-md border-2 border-lightGreen bg-mainGreen text-xs text-white hover:transition-all hover:bg-lightGreen hover:border-lightGreen sm:w-24 sm:py-1">
      удалить
  </button>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'delete-ticker-button',

    setup(props, { emit }) {
    
    const deleteTickerEmit = () => {
      emit('deleteTickerEmit')
    }

      return { deleteTickerEmit }
    }
  })
</script>