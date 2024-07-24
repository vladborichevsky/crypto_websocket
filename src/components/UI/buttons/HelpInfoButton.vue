<template>
  <button @click="selectTicker" class="help_info_btn">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'help-info-button',

    emits: {
      'selectTicker': null
    },
    
    methods: {
      selectTicker() {
        this.$emit('selectTicker')
      }
    }
  }
</script>

<style scoped>
	.help_info_btn {
		margin: 10px 5px 0 0;
		padding: 3px 5px;
		color:var(--white-color);
		font-size: 14px;
		background-color: var(--light-green);
		cursor: pointer;
	}

  .help_info_btn:hover {
		background-color: var(--main-green);
	}
</style>