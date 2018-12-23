const express = require('express')
const app = express()

app.post('/webhook', (req,res) => {
    console.log('- - - - B O D Y - - - -' + req.body)

    const intent = req.body.queryResult.intent.displayName
    console.log("Intent: " + intent)

    const parameters = req.body.queryResult.parameters
    console.log("Parameters: \n" + parameters)

    if (intent === "location"){

    }


    res.send(
        {
            "fulfillmentText": "Text response from NOW server."
        }
    )
})

app.listen(3000, () => console.log('Gator app listening on port 3000!'))


function getLocation(location) {
    locations = JSON.parse("locations.json")

    let request = new XMLHttpRequest();
    request.open("GET", "../locations.json", false);
    request.send(null)
    let my_JSON_object = JSON.parse(request.responseText);
    //console.log(my_JSON_object)
    alert (my_JSON_object.result[0])
    console.log(my_JSON_object.result[0])
}