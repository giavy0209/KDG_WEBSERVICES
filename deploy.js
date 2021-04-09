const fs = require('fs');
const path = require('path')

const axios = require('axios')
const FormData = require('form-data');

const compressing = require('compressing');

const {exec, execSync} = require('child_process')


const str = `mYE88UnACvCTUZS6jBGOlyMqX3u0spuRddEXZGyHKixl3oMxRcHooYIJhVvoFTpGgY8AuBX6xFOFgimZKT4fQE0NJS4fWGfi7zK1KGS8KX6k96oD5jNg5crASmAWn8ImDPxmUZYyBQfx3Y85DlA694ACpZwBT44lFnhXJA8TN4zqmfKuztQlPfY0pfdnQLsLWrqy3WR1`

const sendFile = async function (type) {
    const form = new FormData()
    form.append('file' , fs.createReadStream(path.join(__dirname , 'file.zip')))
    form.append('type' , type)
    await axios.post('http://103.253.146.152?uploadstring='+str , form , {
        headers : {
            ...form.getHeaders()
        }
    })
    fs.unlinkSync(path.join(__dirname , 'file.zip'))
}

async function compress(type) {
    try {
        execSync('npm run build', {cwd : path.join(__dirname , type) })
        console.log('builded ' + type);
        const res = await compressing.zip.compressDir(path.join(__dirname ,type, 'build'), path.join(__dirname,'file.zip'))
        console.log('compressed  ' + type);
        if(type === 'kdg_stream') type = 'kinglive'
        if(type === 'kdg_wallet') type = 'wallet'
        if(type === 'kdg_login') type = 'login'
        await sendFile(type)
        console.log('Sended  ' + type + ' to server');
    } catch (error) {
        throw new Error(error)
    }
}

const acceptType = [
    'kdg_stream', 'kdg_wallet' , 'kdg_login'
]
async function main () {
    const args = process.argv.slice(2);
    for (let index = 0; index < args.length; index++) {
        const type = args[index];
        if(!acceptType.includes(type)) {
            throw new Error(`Arg  ${type} is not allow`)
        }
        await compress(type)

        console.log('deployed ' + type);        
    }
    console.log('Deployed all');
}

main()