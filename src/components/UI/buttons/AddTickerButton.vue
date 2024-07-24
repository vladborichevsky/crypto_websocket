<template>
  <button
    @click="addTickerEmit()"
    class="btn_convert">
      добавить тикер
  </button>
</template>

<script>
  export default {
    name: 'add-ticker-button',

    emits: {
      'addTickerEmit': null
    },
    
    methods: {
      addTickerEmit() {
        this.$emit('addTickerEmit')
      }
    }
  }
</script>

<style scoped>
	.btn_convert {
		text-transform: uppercase;
		padding: 8px 16px;
		border: 2px solid var(--main-green);
		cursor: pointer;
		background-color: var(--main-green);
		color: var(--white-color);
		border-radius: 2px;
		font-size: 16px;
	}

	.btn_convert:hover {
		transition: all 0.3s;
		border: 2px solid var(--light-green);
		background-color: var(--light-green);
	}

  .btn_convert:disabled {
    cursor: not-allowed;
    border: 2px solid var(--grey-color);
		background-color: var(--grey-color);
  }
</style>