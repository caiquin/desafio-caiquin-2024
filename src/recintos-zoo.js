class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "macaco", quantidade: 3 }] },
        { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animais: [{ especie: "gazela", quantidade: 1 }] },
        { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "leao", quantidade: 1 }] }
      ];
  
      this.animais = {
        leao: { tamanho: 3, biomas: ["savana"], carnivoro: true },
        leopardo: { tamanho: 2, biomas: ["savana"], carnivoro: true },
        crocodilo: { tamanho: 3, biomas: ["rio"], carnivoro: true },
        macaco: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
        gazela: { tamanho: 2, biomas: ["savana"], carnivoro: false },
        hipopotamo: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
      };
    }

    analisaRecintos(animal, quantidade) {
      const animalLower = animal.toLowerCase();
  
      if (!this.validaAnimal(animalLower)) {
        return { erro: "Animal inválido", recintosViaveis: null };
      }
  
      if (!this.validaQuantidade(quantidade)) {
        return { erro: "Quantidade inválida", recintosViaveis: null };
      }
  
      const animalInfo = this.animais[animalLower];
      const recintosViaveis = [];
  
      for (const recinto of this.recintos) {
        if (!animalInfo.biomas.includes(recinto.bioma) && recinto.bioma !== "savana e rio") {
          continue;
        }
  
        if (!this.verificaCompatibilidade(animalLower, recinto, quantidade)) {
          continue;
        }
  
        const espacoNecessario = this.calculaEspaco(animalLower, quantidade, recinto);
        const espacoAtual = recinto.tamanhoTotal - recinto.animais.reduce((c, anml) => c + this.animais[anml.especie].tamanho * anml.quantidade, 0);
  
        if (espacoNecessario <= espacoAtual) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoAtual - espacoNecessario} total: ${recinto.tamanhoTotal})`);
        }
      }
  
      return recintosViaveis.length > 0 ? { erro: null, recintosViaveis: recintosViaveis.sort() } : { erro: "Não há recinto viável", recintosViaveis: null };
    }

    validaAnimal(animal) {
      return this.animais.hasOwnProperty(animal.toLowerCase());
    }
  
    validaQuantidade(quantidade) {
      return Number.isInteger(quantidade) && quantidade > 0;
    }
  
    verificaCompatibilidade(animal, recinto, quantidade) {
      const carnivoro = this.animais[animal].carnivoro;
      if (carnivoro) {
        return recinto.animais.every(anml => anml.especie === animal);
      }

      if (recinto.animais.some(anml => this.animais[anml.especie].carnivoro)) {
        return false;
      }
      
      if (animal === 'hipopotamo') {
        return recinto.bioma === "savana e rio" || recinto.animais.length === 0;
      }

      if(animal === 'crocodilo'){
        return recinto.bioma === "rio";
      }

      if (animal === 'macaco') {
        return quantidade >= 2 || recinto.animais.length > 0;
      }
      
      return true;
    }
  
    calculaEspaco(animal, quantidade, recinto) {
      const tamanhoAnimal = this.animais[animal].tamanho;
      let espaco = tamanhoAnimal * quantidade;
  
      if (recinto.animais.length > 0 && !recinto.animais.some(anml => anml.especie === animal)) {
        espaco += 1;
      }
      return espaco;
    }

  }
  
  export { RecintosZoo as RecintosZoo };
  