<template>
  <input 
    :value="modelValue"
    @input="UpdateModelValue($event.target.value)"
    @keydown.enter="addTickerEmit"
    class="my_input"
    type="text">
</template>

<script>
  export default {
    name: 'my-input',

    props: {
      modelValue: {
        type: String,
        required: true
      }
    },

    emits: {
      'update:modelValue': null,
      'addTickerEmit': null
    },

    methods: {
      UpdateModelValue(event) {
        this.$emit('update:modelValue', event)
      },
      
      addTickerEmit() {
        this.$emit('addTickerEmit')
      }
    }
  }
</script>

<style scoped>
  .my_input {
    width: 175px;
    outline: none;
    border: none;
    font-size: 18px;
    padding: 3px 5px;
    color: var(--main-green);
    text-align: left;
  }

	.my_input::placeholder {
		color: var(--grey-color);
	}
</style>