const date = document.querySelector('#date');
const heightfeet = document.querySelector('#heightfeet');
const heightinches = document.querySelector('#heightinches');
const weight = document.querySelector('#weight');
const error = document.querySelector('#error');
const form = document.querySelector('#form');
const result = document.querySelector('#result');
const submit = document.querySelector('#submit');
const savedresult = document.querySelector('#savedresult');

let BMIs = JSON.parse(localStorage.getItem('BMIData')) || [];

function saveEntry(BMIData) {
    BMIs.push(BMIData);
    localStorage.setItem('BMIData', JSON.stringify(BMIs));
}

function BMICalc() {
    const timestamp = new Date();
    const newDate = `${timestamp.getDate()}-${timestamp.getMonth() + 1}-${timestamp.getFullYear()}`; // Corrected newDate declaration
    const heightfeetValue = parseFloat(heightfeet.value);
    const heightinchesValue = parseFloat(heightinches.value);
    const weightValue = parseFloat(weight.value);
    const BMI = (((weightValue / (((heightfeetValue * 12) + heightinchesValue) * ((heightfeetValue * 12) + heightinchesValue))) * 703)).toFixed(2);

    if (isNaN(heightfeetValue) || isNaN(heightinchesValue) || isNaN(weightValue) || heightfeet.value === '' || heightinches.value === '' || weight.value === '' || BMI <= 0 || BMI >= 100) {
        error.textContent = 'Please enter a valid height and weight';
        result.textContent = '';
        console.log(`invalid entry`, BMI);
        return console.log('Please enter a valid height and weight');
    } else {
        date.textContent = `Date: ${newDate}`;
        result.textContent = `Your BMI is ${BMI}`;
        error.textContent = '';
        console.log(BMI);
        console.log(BMIs);
        saveEntry({
            timestamp: newDate,
            heightfeet: heightfeet.value,
            heightinches: heightinches.value,
            weight: weight.value,
            BMI: BMI
        });
        displaySavedResults();
        
    }
};

function displaySavedResults() {
    const savedResultsContainer = document.querySelector('#savedResultsContainer');
    savedResultsContainer.innerHTML = ''; 

    const savedBMIs = JSON.parse(localStorage.getItem('BMIData')) || [];

    if (savedBMIs.length === 0) {
        savedResultsContainer.textContent = 'No saved BMI data.';
        return;
    }

    savedBMIs.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('bmi-entry');
        entryElement.innerHTML = `
            <p>Date: ${entry.timestamp}</p>
            <p>Height: ${entry.heightfeet} feet ${entry.heightinches} inches</p>
            <p>Weight: ${entry.weight} lbs</p>
            <p>BMI: ${entry.BMI}</p>
        `;
        savedResultsContainer.appendChild(entryElement);
    });
}

submit.addEventListener('click', function (event) {
    event.preventDefault();
    BMICalc();
    closeModal('modal-BMI');
    console.log('clicked');
    //console.log(height.value);
    console.log(weight.value);
});

function init() {
    console.log('App started');
    console.log(new Date())
    ;
}
init();
document.addEventListener('DOMContentLoaded', displaySavedResults);