const button = document.querySelector('button');
const resultDiv = document.getElementById('result');
const servError = 'Ошибка сервера. Попробуйте снова'

button.addEventListener("click", () => {
    let value1 = +document.getElementById('jsNumb1').value;
    let value2 = +document.getElementById('jsNumb2').value;

    if (!isNaN(value1) && !isNaN(value2) && (value1 >= 100 && value1 <= 300)
        && (value2 >= 100 && value2 <= 300)) {
        let url = 'https://picsum.photos/' + value1 + '/' + value2;
        useRequest(url);
        } else {
        result =  'одно из чисел вне диапазона от 100 до 300';
        showResult(result);

    }
});

function useRequest (url) {
    fetch(url)
        .then((response) => {
        let result = `<img img src="${response.url}">`;
        showResult(result);
        })
        .catch(() => console.log(servError))
}

function showResult(result){
    let resultDiv = document.getElementById('resultDiv');
    resultDiv.innerHTML = result;

}