<template>
  <q-input
    v-model="content"
    v-bind="$attrs"
    @input="handleInput"
    @keydown="handleKeyUp"
    ref="inputCpfCnpj"
    :mask="cpfOrCnpjMask" unmasked-value
    :rules="[
        val => isRequired(val) || 'Este campo é obrigatório',
        val => validateCpfCnpj(val) || 'CPF/CNPJ inválido'
    ]"
    />
</template>

<script>
import Vue from 'vue'

const cpfMaskFormat = '###.###.###-###'
const cnpjMaskFormat = '##.###.###/####-##'

export default {
  prop: ['value'],
  data () {
    return {
      content: this.value,
      maskFormat: cnpjMaskFormat
    }
  },
  computed: {
    cpfOrCnpjMask () {
      if (this.content === undefined || this.content === '') {
        return cnpjMaskFormat
      }
      return this.isCpf() ? cpfMaskFormat : cnpjMaskFormat
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.content)
    },
    handleKeyUp (e) {
      if (this.content !== undefined && this.content.length === 1) {
        let input = this.$refs.inputCpfCnpj.$refs.input
        input.scrollLeft = input.scrollWidth
        input.setSelectionRange(input.value.length, input.value.length)
      }
    },
    isCpf () {
      return (this.content === undefined || this.content.length <= 11)
    },
    validateCpfCnpj (value) {
      if (value === undefined || value === null || value === '') {
        return true
      }
      return Vue.prototype.$validations.validateCpfCnpj(value)
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
