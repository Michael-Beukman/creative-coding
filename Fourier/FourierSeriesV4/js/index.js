/// <reference path="../p5.d/p5.global-mode.d.ts" />

function formSubmit(){
    values = getValues();    
    resetValues(values);
    return false;

}

const getValues = () =>{
    const whichFunction = $('#selectFunction')[0].value;
    const speed = parseFloat($('#inpSpeed')[0].value);
    const numberOfWaves = parseInt($("#inpNumWaves")[0].value);
    return {whichFunction: whichFunction, _speed: speed, numberOfWaves: numberOfWaves};
}

resetValues(getValues());