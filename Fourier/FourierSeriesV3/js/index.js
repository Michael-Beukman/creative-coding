/// <reference path="../p5.d/p5.global-mode.d.ts" />

function formSubmit(){
    values = getValues();    
    resetValues(values);
    return false;
}

const getValues = () =>{
    const cirOrLines = $("input[name='radLine']:checked")[0].getAttribute('data-name');
    const whichFunction = $('#selectFunction')[0].value;
    const speed = parseFloat($('#inpSpeed')[0].value);
    const numberOfWaves = parseInt($("#inpNumWaves")[0].value);
    return {cirOrLines: cirOrLines, whichFunction: whichFunction, speed: speed, numberOfWaves: numberOfWaves};
}

resetValues(getValues());