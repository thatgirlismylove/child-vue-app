<script setup>
</script>

<template>
  <div>
    <p>vite vue3 子应用</p>
    <div class="box">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  gap: 10px;
}
</style>
