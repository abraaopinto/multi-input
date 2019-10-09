<template>
  <q-input
    v-model="content"
    v-bind="$attrs"
    @input="handleInput"
    mask="##.###.###/####-##" unmasked-value
    :rules="[
        val => isRequired(val) || 'Este campo é obrigatório',
        val => validateCnpj(val) || 'CNPJ inválido'
    ]"
    />
</template>

<script>
import Vue from 'vue'

export default {
  prop: ['value'],
  data () {
    return {
      content: this.value
    }
  },
  methods: {
    handleInput (e) { this.$emit('input', this.content) },
    validateCnpj (value) {
      if (value === undefined || value === null || value === '') {
        return true
      }
      return Vue.prototype.$validations.validateCnpj(value)
    },
    isRequired (value) {
      let isRequired = this.$attrs['required'] !== undefined && this.$attrs['required'] !== false
      if (!isRequired) {
        return true
      }
      return value !== undefined && value !== ''
    }
  }
}
</script>
