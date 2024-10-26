
<template>
	<div class="w-fit flex flex-col justify-between items-center mx-auto mt-2.5 sm:flex-row">
		<my-input
			v-focus
			v-model.trim='ticker'
			@addTickerEmit="addTickerEmit"
			@keyup.down="focusOnHelpBtns"
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
		class="w-72 min-h-10 mt-1.5 mx-auto flex justify-center sm:w-96 sm:justify-start">
			<div 
				v-for="(item, index) in filtredAvailableCoinList.slice(0, 3)" 
				:key="index">
					<help-info-button
						v-if="helpInfoWrapper"
						@keyup.right="changeFocusOnNextHelpBtns(index)"
						@keyup.left="changeFocusOnPrevHelpBtns(index)"
						@keyup.up="focusOnInput"
						@selectTickerEmit="selectTicker(item)">
							{{ item }}
					</help-info-button>
			</div>
	</div>

	<div 
		v-else 
		class="min-h-10 mt-1.5 text-redColor">
			{{ nonExistentTickerError }}
	</div>
</template>



<script setup>
	import { ref, computed } from 'vue'

	const title = "Введите криптовалюту"
	const inputPlaceholder = "BTC ETH LTC BCH"

	const ticker= ref('')
	const helpInfoWrapper = ref(true)

	const filtredAvailableCoinList = computed(() => {
		let result

		if(ticker.value === '') {
			result = []
		} else {
			result = props.availableCoinList.filter(item => item.includes(ticker.value.toLocaleUpperCase()))
		}

		return result
	}) 

	const props = defineProps({
		nonExistentTickerError: String,
		availableCoinList: Array
	})

	const emit = defineEmits(['addTickerEmit'])

	const addTickerEmit = () => {
		emit('addTickerEmit', ticker.value.toUpperCase())
		ticker.value = '' // очищаем инпут с переменной ticker
		helpInfoWrapper.value = true
	}

	const selectTicker = (item) => {
		ticker.value = item
		helpInfoWrapper.value = false
		addTickerEmit()
	}

	// когда инпут в фокусе и уже появились какие-то кнопки с подсказками криптовалют, при нажатии на клавишу "вниз" фокус переходит на первую кнопку с подсказками
	const focusOnHelpBtns = () => {
		document.querySelector('.help_info_btn')?.focus()
	}

	// функция, которая переключает фокус кнопок подсказки на следующую
	const changeFocusOnNextHelpBtns = (index) => {
		if( (index + 1) == document.querySelectorAll('.help_info_btn').length) {
			return false
		} else {
			document.querySelectorAll('.help_info_btn')[index + 1].focus()
		}
	}

	// функция, которая переключает фокус кнопок подсказки на предыдущую
	const changeFocusOnPrevHelpBtns = (index) => {
		if( index == 0) {
			return false
		} else {
			document.querySelectorAll('.help_info_btn')[index - 1].focus()
		}
	}

	// когда фокус на одной из кнопок с подсказками и пользователь нажимает клавишу "вверх", то фокус возвращается в инпут
	const focusOnInput = () => {
		document.querySelector('.my_input').focus()
	}
</script>
