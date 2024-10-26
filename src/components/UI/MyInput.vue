<template>
  <input 
    :value="modelValue"
    @input="updateModelValue($event.target.value)"
    @keydown.enter="addTickerEmit"
    class="my_input w-48 border-0 outline-none p-1 m-1.5 text-lg text-left text-mainGreen placeholder:text-center"
    type="text">
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      modelValue: {
        type: String,
        required: true
      }
    },

    name: 'my-input',

    setup(props, { emit }) {

    const updateModelValue = (event) => {
      emit('update:modelValue', event)
    }
    
    const addTickerEmit = () => {
      emit('addTickerEmit')
    }

      return { props, updateModelValue, addTickerEmit }
    }
  })
</script>
