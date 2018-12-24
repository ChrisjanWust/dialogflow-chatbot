/* DEPRECATING
function read_JSON_fs (){
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('locations.json', 'utf8'));
    return json
}
 */


function read_JSON(path){
    let json = require(path)
    return json
}

const db =  read_JSON('./db.json')


function get_classroom_location(classroom_id){
    let fulfillment_message = ""

    if (db["classrooms"].hasOwnProperty(classroom_id)) {
        const url = db["classrooms"][classroom_id]["url"]
        const building = db["classrooms"][classroom_id]["building"]
        fulfillment_message = "It is in the " + building + " building.\nHere is a Google Maps link (to the classroom, not the building):\n" + url


    } else { // location is not found in the json database. If this triggers, data has probably been added to Dialogflow without updating the json dB. This could also be to the server requiring a restart, which will read the updated json again. A discrepancy between the naming of the Dialogflow and json on the server is also possible.
        console.error("\n\nClassroom which has been added to Dialogflow is not found in the server's local JSON dB." +
            "\nClassroom in question:\t\t" + classroom_id + "\n\n")

        fulfillment_message = "I recognize this as a classroom, but don't have the necessary info in the database yet."
    }

    return fulfillment_message

}

function get_building_location(building_id){
    let fulfillment_message = ""

    if (db["buildings"].hasOwnProperty(building_id)) { // location is found in the json database
        const url = db["buildings"][building_id]["url"]
        const street_address = db["buildings"][building_id]["street_address"]
        fulfillment_message = "It is at " + street_address + "\nHere's the Google Maps link:\n" + url


    } else { // location is not found in the json database. If this triggers, data has probably been added to Dialogflow without updating the json dB. This could also be to the server requiring a restart, which will read the updated json again. A discrepancy between the naming of the Dialogflow and json on the server is also possible.
        console.error("\n\nBuilding which has been added to Dialogflow is not found in the server's local JSON dB." +
            "\nBuilding in question:\t\t" + building_id + "\n\n")

        fulfillment_message = "I recognize this as a building, but don't have the necessary info in the database yet."
    }

    return fulfillment_message
}

module.exports = {

    handle_location : function (parameters) {

        if (parameters["building"]){
            return get_building_location(parameters["building"])
            // todo: if building_location unsuccesfull, check if there is a classroom parameter as well. rare use case though. To be honest, this does support an argument to split the location intent to classroom_location intent and building_location intent. This allows Dialogflow's ML certainty to choose the right parameter type.
        } else if (parameters["classroom"]){
            return get_classroom_location(parameters["classroom"])
        }

    }
}