import dotenv from 'dotenv';

dotenv.config();

const encodedKey = process.env.ENCODED_API_KEY;
const API_KEY = Buffer.from(encodedKey, 'base64').toString('utf-8');

export class Conversor {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async convert(base, target, amount) {
        const endpoint = `pair/${base}/${target}/${amount}`;

        try {
            const response = await fetch(`https://${this.baseURL}/${API_KEY}/${endpoint}`, { method: 'GET' });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Ocorreu um erro.');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Erro na API', error.message);
        }
    }    
}

const conversorMoedas = new Conversor('v6.exchangerate-api.com/v6');
export default conversorMoedas;