const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const error = document.querySelector('#error');
const form = document.querySelector('#form');
const result = document.querySelector('#result');
const submit = document.querySelector('#submit');
const savedresult = document.querySelector('#savedresult');
let BMIs= JSON.parse(localStorage.getItem('BMIData')) || [];

function saveEntry (BMIData)   {
    BMIs.push(BMIData);
    

    localStorage.setItem('BMIs', JSON.stringify(BMIs));
};

function BMICalc() {
    const heightValue = parseFloat(height.value);
    const weightValue = parseFloat(weight.value);
    const BMI = ((weightValue / (heightValue * heightValue))*703).toFixed(2);
    if (isNaN(heightValue) || isNaN(weightValue) || height === '' || weight === '' || height === null || weight === null ||  BMI <= 0 || BMI >= 100) {
        error.textContent ='Please enter a valid height and weight';
        result.textContent = '';
        return console.log('Please enter a valid height and weight');
            
    }else{
    result.textContent = `Your BMI is ${BMI}%`;
    error.textContent = '';
    console.log(BMI);
    console.log(BMIs)
    saveEntry({height: height.value,
               weight: weight.value,
               BMI: BMI});
    //console.log(heightValue);
    //console.log(weightValue);    
    }
};

submit.addEventListener('click', function (event) {
    event.preventDefault();
    BMICalc();
    console.log('clicked');
    //console.log(height.value);
    console.log(weight.value);
});

function init() {
    console.log('App started');
    
    ;
}
init();