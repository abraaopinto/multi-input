<template>
    <div id="multi-input">
        <h1>Componente MultiInput Mask</h1>
        <div>
            <input type="text" v-model="inputValue" placeholder="Informe o CPF, CNPJ, Raiz CNPJ ou Nome/Razão Social." size="80" min="3">
            <button v-bind="validateInput()">Pesquisar</button>
        </div>
        <div>
            <ul>
                <li>InputValue: {{ inputValue }} </li>
                <li>IdFiscal: {{ idFiscal }} </li>
                <li>CPF: {{ cpf }} </li>
                <li>CNPJ: {{ cnpj }} </li>
                <li>Raiz CNPJ: {{ cnpjRaiz }} </li>
                <li>Nome ou Razao Social: {{ nomeRazaoSocial }} </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
     name: 'MultiInput',
     data() {
         return {
             inputValue: '',
             idFiscal: '',
             cpf: '',
             cnpj: '',
             cnpjRaiz: '',
             nomeRazaoSocial: ''
         }
     },
     methods: {
         validateInput: function (){
            console.log(this.inputValue.search(/[a-z]/i));
             if ( this.inputValue.trim != '' )
                if(this.inputValue.length > 5 && this.inputValue.length <= 8)
                    this.cnpjRaiz = this.inputValue;      
                if( this.inputValue.search(/[a-z]/i) === this.inputValue.length)
                    this.nomeRazaoSocial = this.inputValue; 
                else
                    this.nomeRazaoSocial = '';
         }

     }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
