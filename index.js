const express = require('express')
const app = express()

app.post('/webhook', (req,res) => {
    res.send(
        {
            "fulfillmentText": "This is a text response"
        }
    ) 
})

app.listen(3000, () => console.log('Gator app listening on port 3000!'));