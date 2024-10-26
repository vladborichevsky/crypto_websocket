
<template>
  <div class="spinner min-h-8 text-2xl sm:min-h-24 sm:after:text-6xl"></div>
</template>


<script>
  export default {
    name: 'my-spinner'
  }
</script>


<style scoped>
  .spinner {
    color: #ffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner:after {
    animation: changeContent .8s linear infinite;
    display: block;
    content: "⠋";
  }

  @keyframes changeContent {
    10% { content: "⠙"; }
    20% { content: "⠹"; }
    30% { content: "⠸"; }
    40% { content: "⠼"; }
    50% { content: "⠴"; }
    60% { content: "⠦"; }
    70% { content: "⠧"; }
    80% { content: "⠇"; }
    90% { content: "⠏"; }
  }
</style>
