<template>
    <div id="main-multi-input">
        <h1>{{ titulo }}</h1>
        <div class="center">
            <input id="multi-input" type="text" v-model="inputValue" placeholder="Informe o CPF, CNPJ, Raiz CNPJ ou Nome/Razão Social." size="80" minlength="3" v-bind:maxlength="limiteMaximoCampo" />
            <button @click="validateInput">Pesquisar</button>
            <div v-if="inputValue.length === 8 && inputValue.match(/[A-Zi]/i) === null">
                <input type="checkbox" v-model="pesquisarPorRaizCnpj" @on="pesquisarPorRaizCnpj = $event.target.value"> Deseja pesquisar pela raiz do CNPJ.<br>
            </div>
            <div v-if="inputValue.length >= 3 && inputValue.match(/[A-Zi]/i) !== null">
                <span v-for="tipo in tipos" v-bind:key="tipo.idTipoPessoa">
                    <input type="radio" name="tipoPessoa" :id="tipo.idTipoPessoa" v-model="tipoPessoa" :value="tipo.idTipoPessoa" >
                    <label for="pessoaJuridica">{{ tipo.decricaoTipoPessoa }}</label>
                </span>
            </div>
        </div>
        <div>
            <ul>
                <li>IdFiscal: {{ idFiscal }} </li>
                <li>CPF: {{ cpf }} </li>
                <li>CNPJ: {{ cnpj }} </li>
                <li>Raiz CNPJ: {{ cnpjRaiz }} </li>
                <li>Nome ou Razao Social: {{ nomeRazaoSocial }} </li>
                <li>Quantidade de caracteres digitados: {{ inputValue.length }}</li>
                <li>Deseja pesquisar pela raiz do CNPJ: {{ pesquisarPorRaizCnpj }}</li>
                <li>Tipo pessoa: {{ tipoPessoa }}</li>
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
	name: "MultiInput",
	props: {
		titulo: String
	},
	data() {
		return {
			inputValue: "",
			idFiscal: "",
			cpf: "",
			cnpj: "",
			cnpjRaiz: "",
			nomeRazaoSocial: "",
			pesquisarPorRaizCnpj: false,
			tipoPessoa:"",
			limiteMaximoCampo: 100,
			tipos: [ {idTipoPessoa: "PESSOA_FISICA",
				decricaoTipoPessoa: "Pessoa Fisíca"},
			{idTipoPessoa: "PESSOA_JURIDICA",
				decricaoTipoPessoa: "Pessoa Jurídica"},
			{idTipoPessoa: "AMBOS",
				decricaoTipoPessoa: "Todos"} ]
		};
		
	},
	methods: {
		validateInput(){
			const regexRegra1 = /[A-Zi]/i;
            
			// Regra 1 - somente nomeRazaoSocial recebe o valor de inputValue pois o campo contem letras e numeros.
			if(this.inputValue.match(regexRegra1) !== null){
				this.limiteMaximoCampo = 100;
				this.nomeRazaoSocial = this.inputValue;
				this.idFiscal = "";
				this.cpf = "";
				this.cnpj = "";
				this.cnpjRaiz = "";
			}else{
				/*  Analise dos demais casos onde todos os digitos são numericos. */
				// Reseta o valor de nomeRazaoSocial.
				this.nomeRazaoSocial = "";
				this.tipoPessoa = "";

				// Limita o tamanho do campo para o maior formato.
				this.limiteMaximoCampo = 18;
				// Realizar as validações para os demais variaveis.

				// Verifica se é um IdFiscal
				if(this.validarCPF(this.inputValue.padStart(11,"0")) || this.validarCNPJ(this.inputValue.padStart(14,"0"))){
					this.idFiscal = this.inputValue; 
				}else{
					this.idFiscal = "";
				}

				// Verifica se é um CPF
				if(this.validarCPF(this.inputValue.padStart(11,"0"))){
					this.cpf = this.inputValue; 
					this.limiteMaximoCampo = 14;
				}else{
					this.cpf = "";
				}

				// Verifica se é um CNPJ
				if(this.validarCNPJ(this.inputValue.padStart(14,"0"))){
					this.limiteMaximoCampo = 18;
					this.cnpj = this.inputValue; 
				}else{
					this.cnpj = "";
				}

				// Verifica se é uma Raiz do CNPJ.
				if(this.inputValue.length <= 8 && this.pesquisarPorRaizCnpj ) this.cnpjRaiz = this.inputValue;
                
				// Verifica se o usuario não deseja consultar pela Raiz do CNPJ.
				if( !this.pesquisarPorRaizCnpj ) this.cnpjRaiz = "";  

				// Verifica se o usuario digitou mais de 8 caracteres.

				if(this.inputValue.length > 8 && this.pesquisarPorRaizCnpj ){
					this.cnpjRaiz = "";
					this.pesquisarPorRaizCnpj = false;
				}

			}                         
		},
		validarCPF(pCpf){
			pCpf = pCpf.replace(/[^\d]+/g,"");
                                   
			if ( pCpf.length != 11 ||
            pCpf == "00000000000" ||
            pCpf == "11111111111" ||
            pCpf == "22222222222" ||
            pCpf == "33333333333" ||
            pCpf == "44444444444" ||
            pCpf == "55555555555" ||
            pCpf == "66666666666" ||
            pCpf == "77777777777" ||
            pCpf == "88888888888" ||
            pCpf == "99999999999" ) return false;

			// Valida 1o digito	
			var add = 0;
			var rev = 0;

			for (var i = 0; i < 9; i ++) add += parseInt(pCpf.charAt(i)) * (10 - i);
            
			rev = 11 - (add % 11);
            
			if (rev == 10 || rev == 11)	rev = 0;

			if (rev != parseInt(pCpf.charAt(9))) return false;

			// Valida 2o digito
			add = 0;
			for (var j = 0; j < 10; j ++) add += parseInt(pCpf.charAt(j)) * (11 - j);
            
			rev = 11 - (add % 11);
            
			if (rev == 10 || rev == 11)	rev = 0;

			if (rev != parseInt(pCpf.charAt(10))) return false;
            
			return true;
		},
		validarCNPJ(pCnpj) {
			pCnpj = pCnpj.replace(/[^\d]+/g,"");
        
			// Elimina CNPJs invalidos conhecidos
			if ( pCnpj.length != 14 ||
            pCnpj == "00000000000000" || 
            pCnpj == "11111111111111" || 
            pCnpj == "22222222222222" || 
            pCnpj == "33333333333333" || 
            pCnpj == "44444444444444" || 
            pCnpj == "55555555555555" || 
            pCnpj == "66666666666666" || 
            pCnpj == "77777777777777" || 
            pCnpj == "88888888888888" || 
            pCnpj == "99999999999999") return false;
            
			// Valida DVs
			var tamanho = pCnpj.length - 2;
			var numeros = pCnpj.substring(0,tamanho);
			var digitos = pCnpj.substring(tamanho);
			var soma = 0;
			var pos = tamanho - 7;
			for (i = tamanho; i >= 1; i--) {
				soma += numeros.charAt(tamanho - i) * pos--;
				if (pos < 2) pos = 9;
			}
			var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
			if (resultado != digitos.charAt(0)) return false;
			tamanho = tamanho + 1;
			numeros = pCnpj.substring(0,tamanho);
			soma = 0;
			pos = tamanho - 7;
            
			for (var i = tamanho; i >= 1; i--) {
				soma += numeros.charAt(tamanho - i) * pos--;
				if (pos < 2) pos = 9;
			}
			resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            
			if (resultado != digitos.charAt(1)) return false;
			return true;
		}
	},
	removeMascara(value) {
		return value.replace(/[^\d]+/g,"");
	}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    background-color: darkgreen;
    color: white;
    text-align: center;
    margin: auto;
    padding-bottom: 10px;
    padding-top: 10px;
}

.center {
    display: table;
    margin: auto;
    border: 3px solid green;
    padding: 10px;
}
</style>
