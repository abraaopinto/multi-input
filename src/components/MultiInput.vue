<template>
    <div id="multi-input">
        <h1>Componente MultiInput Mask</h1>
        <div>
            <input id="multi-input" type="text" v-model="inputValue" placeholder="Informe o CPF, CNPJ, Raiz CNPJ ou Nome/Razão Social." size="80" minlength="3" v-bind:maxlength="limiteMaximoCampo">
            <button v-bind="validateInput()">Pesquisar</button>
            <div v-if="pesquisarPorRaizCnpj === true">
                <input type="checkbox" name="raizCnpj"> Deseja pesquisar pela raiz do CNPJ.<br>
            </div>
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
        <div class="regras">
            <ul>
                <li>Regra 1 - Analisa se existe pelo menos uma letra [a-z]. Retorna o valor na propriedade nomeRazaoSocial.</li>
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
             nomeRazaoSocial: '',
             pesquisarPorRaizCnpj: false,
             limiteMaximoCampo: 100,
         }
     },
    methods: {
         validateInput: function (){
            
            const regexRegra1 = /[A-Zi]/i;
            this.inputValue = this.inputValue;
            //console.log(this.inputValue.match(regexRegra1));
            // Regra 1 - somente nomeRazaoSocial recebe o valor de inputValue pois o campo contem letras e numeros.
            if(this.inputValue.match(regexRegra1) !== null){
                this.limiteMaximoCampo = 100;
                this.nomeRazaoSocial = this.inputValue;
                this.idFiscal = '';
                this.cpf = '';
                this.cnpj = '';
                this.cnpjRaiz = '';
            }else{
                // Reseta o valor de nomeRazaoSocial.
                this.nomeRazaoSocial = '';
                this.limiteMaximoCampo = 14;
                // Realizar as validações para os demais variaveis.
                if(this.inputValue.length <= 14 && this.inputValue.length >= 5){
                    this.idFiscal = this.inputValue; 
                }else{
                    this.idFiscal = '';
                }
                if(this.inputValue.length <= 11 && this.inputValue.length >= 5){
                    this.cpf = this.inputValue; 
                }else{
                    this.cpf = '';
                }
                if(this.inputValue.length <= 14 && this.inputValue.length >= 8){
                    this.cnpj = this.inputValue; 
                }else{
                    this.cnpj = '';
                }
                if(this.inputValue.length <= 8 && this.inputValue.length >= 5){
                    this.pesquisarPorRaizCnpj = true;
                    this.cnpjRaiz = this.inputValue;
                }else{
                    this.pesquisarPorRaizCnpj = false;
                    this.cnpjRaiz = '';
                }                
            }                         
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
