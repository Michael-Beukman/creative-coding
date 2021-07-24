/// <reference path="../p5.d/p5.global-mode.d.ts" />

function formSubmit(){
    values = getValues();    
    resetValues(values);
    return false;

}

const getValues = () =>{
    const perc = $('#inpPercentage')[0].value;
    const nPoints = parseFloat($('#inpNumPoints')[0].value);
    return {perc, nPoints};
}

resetValues(getValues(), false);