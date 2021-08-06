/// <reference path="../p5.d/p5.global-mode.d.ts" />

function formSubmit(){
    values = getValues();    
    resetValues(values);
    return false;

}

const getValues = () =>{
    return {
        colourMode: $('#colourMode')[0].value,
        speed: parseFloat($('#inpSpeed')[0].value),
        sigma: parseFloat($('#inpSigma')[0].value),
        omega: parseFloat($('#inpOmega')[0].value),
        lambda: parseFloat($('#inpLambda')[0].value),
        move: $("#inpMoving").is(':checked'),
        tiles: parseInt($('#inpTiles')[0].value),
    };
    const color = $('#colourMode')[0].value;
    const speed = parseFloat($('#inpSpeed')[0].value);
    const numberOfWaves = parseInt($("#inpNumWaves")[0].value);
    return {whichFunction: whichFunction, _speed: speed, numberOfWaves: numberOfWaves};
}

resetValues(getValues());