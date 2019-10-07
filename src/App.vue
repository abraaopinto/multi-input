<template>
  <div id="app">
    <MultiInput titulo="Componente MultiInput Mask"/>
  </div>
</template>

<script>
import vueMask from 'vue-jquery-mask'
import MultiInput from './components/MultiInput.vue'


export default {
  name: 'app',
  components: {
    MultiInput,
    vueMask
  }
}
</script>

<style>

</style>
