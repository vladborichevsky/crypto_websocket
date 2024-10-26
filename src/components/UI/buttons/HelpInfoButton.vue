<template>
  <button 
    @click="selectTickerEmit"
    @mouseenter="removeFocus()"
    class="help_info_btn cursor-pointer bg-mainGreen mt-1.5 ml-1.5 mr-1.5 p-1 text-sm text-white sm:ml-0 lg:hover:bg-lightGreen focus:bg-lightGreen focus:outline-none"> 
      <slot></slot>
  </button>
</template>


<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'help-info-button',
    setup(props, { emit }) {

      const selectTickerEmit = () => {
        emit('selectTickerEmit')
      }

      const removeFocus = () => {
        document.querySelectorAll('.help_info_btn')?.forEach(item => {
          item.blur()
        }) 
      }

      return { selectTickerEmit, removeFocus }
    }
  })
</script>