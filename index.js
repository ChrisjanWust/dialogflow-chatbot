const express = require('express')
const app = express()
app.use(express.json())    // <==== parse request body as JSON


const intentHandler = require('./intentHandler')


intentHandler.handle_location("Engineering")


app.post('/webhook', (req,res) => {
    console.log("/webhook triggered")

    //console.log("REQUEST:")
    //console.log(req.body)

    const intent = req.body.queryResult.intent.displayName
    console.log("Intent: " + intent)

    const parameters = req.body.queryResult.parameters
    console.log("Parameters: \n" + parameters)


    let fulfillmentText = "The intent was recognized, but not implemented in the server."

    switch(intent){
        case "location": {
            fulfillmentText = intentHandler.handle_location(parameters)
        }
    }


    res.send(
        {
            "fulfillmentText": fulfillmentText
        }
    )
})









app.listen(3000, () => console.log('Server listening on port 3000'))
