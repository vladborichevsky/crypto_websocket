
<template>
  <div class="w-full min-h-screen bg-backgroundColor">
    <div class="w-11/12 mx-auto py-3.5">

      <header class="font-serif text-3xl font-bold text-amber-400 sm:text-5xl">Crypto Converter</header>

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



<script setup>
  import { ref, watch, computed, onMounted } from 'vue';

  import AddTickerBlock from '@/components/AddTickerBlock.vue'
  import TickersBlock from '@/components/TickersBlock.vue'

  import { getDataByWebSocket, sendNewMessageToWebSocketToSub, sendNewMessageToWebSocketToSubRemove } from './WebSocket.js';
  import { getDataForAvailableCoinList } from './api.js'

  const tickerList = ref([]) 
  const availableCoinList = ref([])
  const sameTicker = ref('false')
  const nonExistentTickerError = ref('') 

  const currentCoinList = computed(() => {
    let array = []
    tickerList.value.forEach(item => {
      array.push(item.name)
    }) 

    return array
  }) 

  const addTicker = (ticker) => {
    // проверка, чтобы нельзя было добавить уже существующий тикер
    if (currentCoinList.value.includes(ticker)) {
      sameTicker.value = ticker
      setTimeout(() => {
        sameTicker.value = 'false'
      }, 3000)
      return false
    }

    if(!availableCoinList.value.includes(ticker)) {
      nonExistentTickerError.value = 'Такой криптовалюты не существует'

      setTimeout(() => {
        nonExistentTickerError.value = ''
      }, 3000)

      return
    }

    tickerList.value.push({
      'name': ticker,
      'price': ''
    })

    sendNewMessageToWebSocketToSub(currentCoinList.value)
  }

  const updateTickers = () => {
    setInterval( ()=> {
      let result = getDataByWebSocket()

      tickerList.value.forEach( (item, index) => {
        Object.keys(result).forEach(el => {
          if(item.name == el) {
            tickerList.value[index].price = result[el]?.toFixed()
          }
        })
      })
    }, 1000)
  }

  const deleteTicker = (ticker) => {
    tickerList.value = tickerList.value.filter(item => item.name != ticker)
    sendNewMessageToWebSocketToSubRemove(ticker)
  }

  const updateAvailableCoinList = async () => {
    availableCoinList.value = await getDataForAvailableCoinList()
  }

  watch(
    () => tickerList.value,
    (value, newValue) => {
      if(tickerList.value.length > 0) {
        updateTickers()
      }
    },
    { deep: true }
  )

  watch(
    () => currentCoinList.value,
    (value, newValue) => {
      if (currentCoinList.value.length == 0) {
        window.history.pushState(null, document.title, `${window.location.pathname}`)
      } else {
        window.history.pushState(null, document.title, `${window.location.pathname}?cur_coin_list=${currentCoinList.value}`)
      }
    },
    { deep: true }
  )

  onMounted( async () => {
    await updateAvailableCoinList()

    const windowData = Object.fromEntries(
      new URL(window.location).searchParams.entries()
    )

    if (windowData.cur_coin_list) {
      windowData.cur_coin_list.split(',').forEach(item => {
        addTicker(item)
      })
    } 
  })
</script>
