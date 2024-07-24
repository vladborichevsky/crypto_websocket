<template>
  <div 
    class="ticker_wrapper" 
    :class="{ same_ticker: sameTicker === ticker.name }">

    <div 
      class="ticker_name">
        {{ ticker.name }}
    </div>

    <my-spinner 
      v-if="!ticker.price"/> 

    <div 
      v-else 
      class="ticker_price">
        {{ ticker.price }} $
    </div>

    <delete-ticker-button
      @deleteTicker="deleteTicker(ticker.name)"
    />
  </div>
</template>

<script>
  export default {
    name: 'ticker-element',

    props: {
      ticker: {
        type: Object,
        required: true
      },

      sameTicker: {
        type: String,
        required: true
      }
    },

    emits: {
      'deleteTicker': null
    },
    
    methods: {
      deleteTicker(tickerName) {
        this.$emit('deleteTicker', tickerName)
      }
    }
  }
</script>

<style scoped>
  .ticker_wrapper {
    background-color: var(--main-green);
    width: 200px;
    height: 200px;
    padding: 10px;
    border-radius: 100%;
    border: 2px solid var(--light-green);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 15px;
  }

  .ticker_name {
    color: var(--white-color);
    font-size: 25px;
    font-weight: 600;
  }

  .ticker_price {
    font-family: 'Bungee Spice', sans-serif;
    font-size: 40px;
  }

  .same_ticker {
    transition: all 0.3s;
    border: 2px solid var(--white-color);
  }
</style>