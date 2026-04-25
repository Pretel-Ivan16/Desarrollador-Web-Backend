/* 
let edad = 30
const PISO_EDAD = 18

if(edad >= PISO_EDAD){
    console.log("puede pasar")
}
 */


let scoring_validacion_facial = 4322

const REKOGNITION_CONFIG = {
    CONFIDENCE_SCORING_FLOOR: 4500
}

if(scoring_validacion_facial >= REKOGNITION_CONFIG.CONFIDENCE_SCORING_FLOOR){
    console.log('sos una persona')
}
