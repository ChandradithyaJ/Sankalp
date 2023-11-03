const axios = require('axios')

const getNews = async (req, res) => {
    try {
        const apiKey = process.env.NEWS_API_KEY

        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=Mental&pageSize=6&apiKey=${apiKey}`
        )

        if(response.data){
            res.status(200).json(response.data)
        } else{
            res.status(200).json({ 'message': 'No articles' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json('Unable to fetch news')
    }
}

module.exports = {
    getNews
}