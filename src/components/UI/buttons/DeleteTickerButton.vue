<template>
  <button 
    @click="deleteTicker()" 
    class="ticker_delete">
      удалить
  </button>
</template>

<script>
  export default {
    name: 'delete-ticker-button',

    emits: {
      'deleteTicker': null
    },
    
    methods: {
      deleteTicker() {
        this.$emit('deleteTicker')
      }
    }
  }
</script>

<style scoped>
  .ticker_delete {
    width: 100px;
    margin: 0 auto;
    cursor: pointer;
    text-transform: uppercase;
    padding: 6px 0px;
    border: 2px solid var(--light-green);
    border-radius: 5px;
		background-color: var(--main-green);
    color: var(--white-color);
    font-size: 11px;
    font-weight: 500;
  }

  .ticker_delete:hover {
    transition: all 0.3s;
    border: 2px solid var(--light-green);
		background-color: var(--light-green);
  }
</style>