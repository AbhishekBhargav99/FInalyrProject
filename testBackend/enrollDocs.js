const fs = require('fs');
const { type } = require('os');
const {registerUser} = require('../patient-assets/application-javascript/app')
const {enrollRegisterUser} = require('./regUsers');
async function enrollPatients() {
    try {
        // returns buffer
        const buffer = fs.readFileSync('../patient-asset-transfer/chaincode/lib/initLedger.json');
        const patientData = JSON.parse(buffer);
        // console.log(patientData);
        let hospId = '1';
        for(let i = 0; i < patientData.length; i++){
            let patient = patientData[i];
            const attr = {
                firstName: patient.firstName,
                lastName: patient.lastName, 
                role: 'patient',
            }
            // console.log(attr);
            await enrollRegisterUser(hospId, 'PID'+i, JSON.stringify(attr));
        }
        
    } catch (err) {
        console.log(err);
    }
};

async function enrollDocs(){
    try{
        const buffer = fs.readFileSync('./sampleDocs.json');
        const docData = JSON.parse(buffer);

        for(let i = 0; i < docData.length; i++){
            let doctor = docData[i];
            // console.log(doctor); 
            let hospId = (doctor.hospitalId)
            const attr = {
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                role: 'doctor',
                speciality: doctor.speciality
            }
            await enrollRegisterUser(doctor.hospitalId, ( 'HOSP' + doctor.hospitalId + '-' + 'DOC' + i) , JSON.stringify(attr));
        }
    } catch(err){
        console.log(err);
    }
};

async function main(){
    await enrollPatients();
    await enrollDocs();
}

main();

