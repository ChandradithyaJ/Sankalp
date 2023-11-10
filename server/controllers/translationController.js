const { translate } = require('bing-translate-api')

const multilingualTranslate = async(req, res) => {
    if(!req?.body?.to){
        return res.status(400).json({ 'message': 'No language to translate to' })
    }

    const targetLanguage = req?.body.to
    let translated = {} // response data

    for(const key in req?.body){
        if(req?.body[key] === targetLanguage) continue

        if(typeof req?.body[key] === 'object'){
            let translatedArray = []
            for(const ele of req?.body[key]){
                await translate(ele, 'en', targetLanguage).then(response => {
                    translatedArray.push(response.translation)
                }).catch(err => {
                    console.log(err)
                    return res.status(400).json(err.message)
                })
            }
            translated[key] = translatedArray
            continue
        }
        await translate(req?.body[key], 'en', targetLanguage).then(response => {
            translated[key] = response.translation
        }).catch(err => {
            console.log(err)
            return res.status(400).json(err.message)
        })
    }

    res.status(200).json(translated)
}

// function to translate a dialog set request from story mode
const translateStoryDialogues = async(req, res) => {
    if (!req?.body?.to) {
        return res.status(400).json({ 'message': 'No language to translate to' })
    }

    const targetLanguage = req?.body.to
    let translated = {} // response data

    for (const key in req?.body.dialogueSet) {
        if (key === '_id') continue

        if (Array.isArray(req?.body.dialogueSet[key])) {
            let translatedArray = []
            for (const ele of req?.body.dialogueSet[key]) {
                // we get an individual dialogueOption
                const translatedDialogueOption = {}

                await translate(ele.dialogueOption, 'en', targetLanguage).then(response => {
                    translatedDialogueOption.dialogueOption = response.translation
                }).catch(err => {
                    console.log(err)
                    return res.status(400).json(err.message)
                })

                if(ele.sankalpExplanation !== ""){
                    await translate(ele.sankalpExplanation, 'en', targetLanguage).then(response => {
                        translatedDialogueOption.sankalpExplanation = response?.translation
                    }).catch(err => {
                        console.log(err)
                        return res.status(400).json(err.message)
                    })
                }

                translatedArray.push(translatedDialogueOption)
            }
            translated[key] = translatedArray
            continue
        }
        await translate(req?.body.dialogueSet[key], 'en', targetLanguage).then(response => {
            translated[key] = response.translation
        }).catch(err => {
            console.log(err)
            return res.status(400).json(err.message)
        })
    }

    res.status(200).json(translated)
}

module.exports = {
    multilingualTranslate,
    translateStoryDialogues
}