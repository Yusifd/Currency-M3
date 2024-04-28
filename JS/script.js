const fromInput = document.getElementById('input-from');
const resultInput = document.getElementById('input-to');
var fromCurrency;
var toCurrency;
const getCurrencyData = async (event) => {
      const buttonsFrom = document.querySelector('#radio-from-buttons input[name="from"]:checked');
      const buttonsResult = document.querySelector('#radio-to-buttons input[name="to"]:checked');
      if(!buttonsFrom || !buttonsResult){
        return;
      }
      fromCurrency=buttonsFrom.value
       toCurrency=buttonsResult.value
        if(fromCurrency===toCurrency) {       
            event.target===resultInput ? fromInput.value=resultInput.value:resultInput.value = fromInput.value;
            const currencyDescription = document.querySelectorAll('.currency-description');
            currencyDescription.forEach((item)=>{
                item.textContent = `1 ${fromCurrency.toUpperCase()} = 1 ${toCurrency.toUpperCase()}`;
            })
    }else{
        const response1 = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.min.json`);
        const data1 = await response1.json();
        const response2 = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${toCurrency}.min.json`);
        const data2 = await response2.json();

        if(fromInput.value<0 || resultInput.value<0){
            alert('Неправильное значение!')            
        }else if(event.target===resultInput){            
            fromInput.value = Number(resultInput.value) * data2[`${toCurrency}`][`${fromCurrency}`];
        }else{
            resultInput.value = Number(fromInput.value) * data1[`${fromCurrency}`][`${toCurrency}`];
        }
        const currencyDescriptionFrom = document.getElementById('currency-description-from');
        currencyDescriptionFrom.textContent = `1 ${fromCurrency.toUpperCase()} = ${data1[`${fromCurrency}`][toCurrency]} ${toCurrency.toUpperCase()}` ;
        const currencyDescriptionTo = document.getElementById('currency-description-to')
        currencyDescriptionTo.textContent = `1 ${toCurrency.toUpperCase()} = ${data2[`${toCurrency}`][fromCurrency]} ${fromCurrency.toUpperCase()}` ;
    }  
}
function currencyHandler(event){
    getCurrencyData(event)
    .catch(error => {
        alert(`${error}! Something went wrong!`);
    })
}
document.querySelectorAll('input[name="from"]').forEach(radio => {
    radio.addEventListener('change', currencyHandler);
});
document.querySelectorAll('input[name="to"]').forEach(radio => {
    radio.addEventListener('change', currencyHandler);
});
fromInput.addEventListener('keyup',currencyHandler);
resultInput.addEventListener('keyup',currencyHandler);
currencyHandler(window);