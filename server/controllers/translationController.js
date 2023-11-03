const { translate } = require('bing-translate-api')

const multilingualTranslate = async(req, res) => {
    if(!req?.body?.to){
        return res.status(400).json({ 'message': 'No language to translate to' })
    }

    const targetLanguage = req?.body.to
    let translated = {} // response data

    for(const key in req?.body){
        await translate(req?.body[key], 'en', targetLanguage).then(response => {
            translated[key] = response.translation
        }).catch(err => {
            console.log(err)
            return res.status(400).json(err.message)
        })
    }

    res.status(200).json(translated)
}

module.exports = {
    multilingualTranslate
}