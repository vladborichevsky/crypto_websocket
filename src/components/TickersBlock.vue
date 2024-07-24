
<template>
  <div class="tickers_wrapper">
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



<script>
  import TickerElement from '@/components/TickerElement.vue'

  export default {
    components: { 
      TickerElement
    },

		props: {
      tickerList: { 
        type: Array,
        required: true
      },

      sameTicker: {
        type: String,
        required: true
      }
		},

    emits: [
      'deleteTicker'
    ],

    methods: {
      deleteTicker(tickerName) {
        this.$emit('deleteTicker', tickerName)
      }
    }    
    
  }

</script>



<style scoped>
  .tickers_wrapper {
    margin: 0 auto;
    margin-top: 5px;
    width: 822px;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }
</style>
