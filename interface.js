import conversorMoedas from './conversor.js';
import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });

export class Menu {
    mostrarMenuPrincipal() {
        console.log('\nBem-vindo ao conversor de moedas minimalista!\n');

        let opcao = parseInt(prompt('Digite 1 para converter e 2 para sair: '), 10);
        console.log('\n');

        return opcao;
    }

    // handleOpcaoUsuario(opcao) {
    //     if (opcao === 1) {
    //         const { moedaOrigem, moedaDestino, valor } = this.mostrarMenuConversao();
    //         this.handleConversion(moedaOrigem, moedaDestino, valor).then(() => {
    //             this.start();
    //         });
    //     } else if (opcao === 2) {
    //         console.log("Obrigada e volte sempre!\n");
    //         process.exit(0);
    //     } else {
    //         console.error("Opção inválida.\n");
    //         this.start();
    //     }
    // }

    handleOpcaoUsuario(opcao) {
        if (opcao === 1) {
            this.mostrarMenuConversao()
                .then(({ moedaOrigem, moedaDestino, valor }) => {
                    return this.handleConversion(moedaOrigem, moedaDestino, valor);
                })
                .then(() => {
                    this.start();
                })
                .catch((error) => {
                    console.error('Erro:', error.message);
                    this.start();
                });
        } else if (opcao === 2) {
            console.log("Obrigada e volte sempre!\n");
            process.exit(0);
        } else {
            console.error("Opção inválida.\n");
            this.start();
        }
    }
    
    async mostrarMenuConversao() {
        console.log('Escolha as moedas de origem e destino.\n');
        
        let bc, bcUpper, isValid;
        do {
            bc = prompt('Moeda origem: ');
            bcUpper = bc.toUpperCase();
            isValid = await conversorMoedas.validateCurrencyString(bcUpper);
    
            if (!isValid) {
                console.error('\nMoeda inválida.\n');
            }
        } while (!isValid);
        
        let tc, tcUpper;
        do {
            tc = prompt('Moeda destino: ');
            tcUpper = tc.toUpperCase();
            isValid = await conversorMoedas.validateCurrencyString(tcUpper);
    
            if (!isValid) {
                console.error('\nMoeda inválida.\n');
            }
        } while (!isValid);
        
        if (bcUpper === tcUpper) {
            console.error('\nErro: Moeda origem deve ser diferente da moeda destino.\n');
            return this.mostrarMenuConversao(); // Restart if the same currency is selected
        }
        
        let amount;
        do {
            amount = prompt('Valor: ');
            if (isNaN(parseFloat(amount.replace(',', '.')))) {
                console.error('\nValor inválido. Insira um número válido.\n');
            }
        } while (isNaN(parseFloat(amount.replace(',', '.'))));
        
        const floatAmount = parseFloat(amount);

        console.log('\n');
        return { moedaOrigem: bcUpper, moedaDestino: tcUpper, valor: floatAmount };
    }
    

    async handleConversion(bc, tc, amount) {
        try {
            // const formattedAmount = parseFloat(amount.replace(',', '.'));

            const conversion = await conversorMoedas.convert(bc, tc, amount);

            const valorConvertido = parseFloat(conversion.conversion_result).toFixed(2);
            const taxaConversao = parseFloat(conversion.conversion_rate);
    
            console.log('--------------------------------------------------------------');
            console.log(`${bc} ${parseFloat(amount).toFixed(2)} => ${tc} ${valorConvertido}`);
            console.log('Taxa: ', taxaConversao);

        } catch (error) {
            console.error('Erro ao realizar a conversão:', error.message);
        }
    }

    start( ) {
        const opcao = this.mostrarMenuPrincipal();
        this.handleOpcaoUsuario(opcao);
    }
}

const menu = new Menu();
export default menu;

