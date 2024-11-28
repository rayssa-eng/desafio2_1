import conversorMoedas from './conversor.js';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

export class Menu {
    mostrarMenu() {
        console.log('Bem-vindo ao conversor minimalista!');
        console.log('Escolha as moedas de origem e destino.');
        
        let bc     = prompt('Moeda origem: ');
        let tc     = prompt('Moeda destino: ');
        let amount = prompt('Valor: ');

        console.log('--------------------------------------------------------------');

        return { moedaOrigem: bc, moedaDestino: tc, valor: amount };
    }

    handleConversion(bc, tc, amount) {
        const valorConvertido = conversorMoedas.convert(bc, tc, amount).conversion_result;
        const taxaConversao = conversorMoedas.convert(bc, tc, amount).conversion_rate;

        console.log('--------------------------------------------------------------');
        console.log(`${bc} ${amount} => ${tc} ${valorConvertido.toFixed(2)}`);
        console.log('Taxa: ', taxaConversao);
    }

    start( ) {
        const { moedaOrigem, moedaDestino, valor } = this.mostrarMenu();  
        this.mostrarMenu();
        this.handleConversion(moedaOrigem, moedaDestino, valor);
    }
}

const menu = new Menu();
export default menu;

