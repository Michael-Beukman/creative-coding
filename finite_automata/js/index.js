function formSubmit(){
    values = getValues();    
    resetValues(values);
    return false;
}

const getValues = () =>{
    const time = parseFloat($('#inpTime')[0].value);
    // const speed = parseFloat($('#inpSpeed')[0].value);
    // const numberOfWaves = parseInt($("#inpNumWaves")[0].value);
    const string = $("#inpString")[0].value;
    return {time, string};
}

resetValues(getValues());