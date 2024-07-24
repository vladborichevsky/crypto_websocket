
<template>
  <div class="spinner"></div>
</template>

<script>
  export default {
    name: 'my-spinner'
  }
</script>


<style scoped>
  .spinner {
    color: var(--white-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner:after {
    animation: changeContent .8s linear infinite;
    display: block;
    content: "⠋";
    font-size: 60px;
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
