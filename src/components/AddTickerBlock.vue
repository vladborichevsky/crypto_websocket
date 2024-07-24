
<template>
	<div class="inputs_wrapper">
		
		<my-input
			v-focus
			v-model.trim='ticker'
			@addTickerEmit="addTickerEmit"
			:title="title"
			:placeholder="inputPlaceholder"/>

		<add-ticker-button
			v-if="ticker.length < 3"
			disabled
			:title="title"/>

		<add-ticker-button
			v-else
			@addTickerEmit="addTickerEmit"/>

	</div>

	<div 
		v-if="ticker" 
		class="help_info_wrapper">
			<div 
				v-for="(item, index) in filtredAvailableCoinList.slice(0, 3)" 
				:key="index">
					<help-info-button
						v-if="helpInfoWrapper"
						@selectTicker="selectTicker(item)">
							{{ item }}
					</help-info-button>
			</div>
	</div>

	<div 
		v-else 
		class="non_existent_ticker_error">
			{{ nonExistentTickerError }}
	</div>
</template>



<script>
  export default {
		setup() {
			const title = "Введите криптовалюту"
			const inputPlaceholder = "BTC ETH LTC USDT"

			return { title, inputPlaceholder }
		}, 

		props: {
			nonExistentTickerError: {
				type: String,
				required: true
			},
			
			availableCoinList: {
				type: Array,
				required: true
			}
		},

    emits: [
      'addTickerEmit' 
    ],

    data() {
      return {
        ticker: '',
				helpInfoWrapper: true
      }
    },

    methods: {
      addTickerEmit() {
        this.$emit('addTickerEmit', this.ticker.toUpperCase())
				this.ticker = '' // очищаем инпут с переменной ticker
				this.helpInfoWrapper = true
      },

			selectTicker(item) {
				this.ticker = item
				this.helpInfoWrapper = false
			}
    },
		
		computed: {
			filtredAvailableCoinList() {
				let result

				if(this.ticker === '') {
					result = []
				} else {
					result = this.availableCoinList.filter(item => item.includes(this.ticker.toLocaleUpperCase()))
				}
				
				return result
			}
		}
  }

</script>



<style scoped>
	.inputs_wrapper {
		margin: 0 auto;
		margin-top: 10px;
		width: 400px;
		display: flex;
		justify-content: space-between;
	}

	.help_info_wrapper {
		min-height: 50px;
		margin: 0 auto;
		width: 400px;
		display: flex;
		justify-content: left;
	}

	.non_existent_ticker_error {
    min-height: 40px;
		margin-top: 10px;
    color: var(--red-color);
  }
</style>
