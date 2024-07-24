
<template>
  <div class="app_wrapper">
    <div class="container">

      <header class="header">Crypto Converter</header>

      <add-ticker-block
        :nonExistentTickerError="nonExistentTickerError"
        :availableCoinList="availableCoinList"
        @addTickerEmit="addTicker"/>

      <tickers-block
        :tickerList="tickerList"
        :sameTicker="sameTicker"
        @deleteTicker="deleteTicker"/>

    </div>
  </div>
</template>



<script>
import AddTickerBlock from '@/components/AddTickerBlock.vue'
import TickersBlock from '@/components/TickersBlock.vue'

import { getDataByWebSocket, sendNewMessageToWebSocketToSub, sendNewMessageToWebSocketToSubRemove } from './WebSocket.js';
import { getDataForAvailableCoinList } from './api.js'

export default {
    components: { AddTickerBlock, TickersBlock },

    data() {
      return {
        tickerList: [],
        availableCoinList: [],
        sameTicker: 'false',
        nonExistentTickerError: '',
      }
    },

    methods: {
      addTicker(ticker) {
        // проверка, чтобы нельзя было добавить уже существующий тикер
        if (this.currentCoinList.includes(ticker)) {
          this.sameTicker = ticker
          setTimeout(() => {
            this.sameTicker = 'false'
          }, 3000)

          return
        }

        if(!this.availableCoinList.includes(ticker)) {
          this.nonExistentTickerError = 'Такой криптовалюты не существует'

          setTimeout(() => {
            this.nonExistentTickerError = ''
          }, 3000)

          return
        }

        this.tickerList.push({
          'name': ticker,
          'price': ''
        })

        sendNewMessageToWebSocketToSub(this.currentCoinList)
      },

      updateTickers() {
        setInterval( ()=> {
          let result = getDataByWebSocket()

          this.tickerList.forEach( (item, index) => {
            Object.keys(result).forEach(el => {
              if(item.name == el) {
                this.tickerList[index].price = result[el]?.toFixed()
              }
            })
          })
        }, 1000)
        

      },

      deleteTicker(ticker) {
        this.tickerList = this.tickerList.filter(item => item.name != ticker)

        sendNewMessageToWebSocketToSubRemove(ticker)
      },

      async updateAvailableCoinList() {
        this.availableCoinList = await getDataForAvailableCoinList()
      }
    },

    watch: {
      tickerList: {
          handler() {
            if(this.tickerList.length > 0) {
              this.updateTickers()
            }
          },
          deep: true
        },

      currentCoinList: {
        handler() {
          if (this.currentCoinList.length == 0) {
            window.history.pushState(null, document.title, `${window.location.pathname}`)
          } else {
            window.history.pushState(null, document.title, `${window.location.pathname}?cur_coin_list=${this.currentCoinList}`)
          }
        },
        deep: true
      }  
    },

    computed: {
      currentCoinList() {
        let array = []
        this.tickerList.forEach(item => {
          array.push(item.name)
        }) 

        return array
      }
    },

    async mounted() {   
      await this.updateAvailableCoinList()

      const windowData = Object.fromEntries(
        new URL(window.location).searchParams.entries()
      );

      if (windowData.cur_coin_list) {
        windowData.cur_coin_list.split(',').forEach(item => {
          this.addTicker(item)
        })
      } 
    }
  }

</script>



<style scoped>
  .app_wrapper {
    width: 100vw;
    min-height: 100vh;
    background-color: var(--background-color);
  }

  .container {
    margin: 0 auto;
    width: 1200px;
    padding: 10px 0;
  }

  .header {
    font-family: 'Bungee Spice', sans-serif;
    font-size: 50px;
  }
</style>
