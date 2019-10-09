<template>
  <div>
    <q-input @input="handleInput" v-bind="$attrs" v-model.lazy="content" v-money="money" />
  </div>
</template>

<script>
import { VMoney } from 'v-money'

export default {
  data () {
    return {
      content: 0,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    }
  },
  methods: {
    handleInput (e) {
      let unformatted = this.content
      unformatted = unformatted.replace(/[R]|[$]|[ ]|[.]/g, '')
      unformatted = unformatted.replace(/[,]/g, '.')
      this.$emit('input', Number(unformatted))
    }
  },
  directives: { money: VMoney }
}
</script>
