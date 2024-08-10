const date = document.querySelector('#date');
const heightfeet = document.querySelector('#heightfeet');
const heightinches = document.querySelector('#heightinches');
const weight = document.querySelector('#weight');
const error = document.querySelector('#error');
const form = document.querySelector('#form');
const result = document.querySelector('#result');
const submit = document.querySelector('#submit');
const savedresult = document.querySelector('#savedresult');
const modalBMI = document.querySelector('#modal-BMI')
const savedResultsContainer = document.querySelector('#savedResultsContainer');
let BMIs = JSON.parse(localStorage.getItem('BMIData')) || [];

function saveEntry(BMIData) {
    BMIs.unshift(BMIData);
    localStorage.setItem('BMIData', JSON.stringify(BMIs));
}

function BMICalc() {
    const timestamp = new Date();
    const newDate = `${timestamp.getMonth() + 1}-${timestamp.getDate()}-${timestamp.getFullYear()}`; 
    const heightfeetValue = parseFloat(heightfeet.value);
    const heightinchesValue = parseFloat(heightinches.value);
    const weightValue = parseFloat(weight.value);
    const BMI = ((((weightValue / (((heightfeetValue * 12) + heightinchesValue) * ((heightfeetValue * 12) + heightinchesValue)))) * 703)).toFixed(2);

    if (isNaN(heightfeetValue) || isNaN(heightinchesValue) || isNaN(weightValue) || heightfeet.value === '' || heightinches.value === '' || weight.value === '' || BMI <= 0 || BMI >= 100) {
        error.textContent = 'Please enter a valid height and weight';
        result.textContent = '';
        console.log(`invalid entry`, BMI);
        return console.log('Please enter a valid height and weight');
    } else {
     
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
    
    savedResultsContainer.innerHTML = ''; 

    const savedBMIs = JSON.parse(localStorage.getItem('BMIData')) || [];

    if (savedBMIs.length === 0) {
        const noneElement = document.createElement('div');
        noneElement.classList.add('bmi-entry', 'box', 'box-shadow', 'has-background-primary-85', 'is-size-4', 'ml-6', 'mr-6');
        savedResultsContainer.textContent = 'No saved BMI data.';
        noneElement.innerHTML = `<p class='is-size-2 has-text-danger'>  No saved BMI data.</p>`;
        noneElement.style.textAlign = 'center';
        savedResultsContainer.appendChild(noneElement);
        return;
    }

    savedBMIs.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('bmi-entry', 'box', 'box-shadow', 'has-background-primary-85', 'is-size-4', );
        entryElement.style.textAlign = 'center';
        entryElement.innerHTML = `
            <p class='is-size-2 has-text-primary-20 has-text-weight-bold'>${entry.timestamp}</p>
            <p>Height: ${entry.heightfeet} feet ${entry.heightinches} inches</p>
            <p>Weight: ${entry.weight} lbs</p>
            <p>BMI: ${entry.BMI}</p>
        `;
        savedResultsContainer.appendChild(entryElement);
    });
}

function closeModal($el) {
    $el.classList.remove('is-active');
  }
submit.addEventListener('click', function (event) {
    event.preventDefault();
    BMICalc();
    closeModal(modalBMI);
    console.log('clicked');
    console.log(weight.value);
});

function init() {
    console.log('App started');
    console.log(new Date())
    ;
}
init();
document.addEventListener('DOMContentLoaded', displaySavedResults);