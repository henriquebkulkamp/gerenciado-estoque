import fs from 'fs';

const filePath = './info.txt';

export function read_name() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                reject(err);
                return;
            }

            const name = data.split('\n')[0];
            console.log(`name: ${name}`);
            resolve(name);
        });
    });
}


export function write_name(text_content) {
    fs.writeFile(filePath, text_content + '\n', (err) => {
    if (err) {
        console.error('Erro ao escrever no arquivo:', err);
        return;
    }
    console.log('Texto escrito na primeira linha com sucesso!');
    });
}