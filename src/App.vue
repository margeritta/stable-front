<template>
<div>
  <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch('tryLogin')
  }
};
</script>
