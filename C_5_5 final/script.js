const button = document.querySelector('button');
const resultDiv = document.getElementById('result');
const servError = 'Ошибка сервера. Попробуйте снова';


function checkInput (value1, value2) {
    let result = 0;
    if (isNaN(value1) || value1 < 1 || value1 > 10) {
        result = 'Номер страницы вне диапазона от 1 до 10';
        }
    if (isNaN(value2) ||  value2 < 1 || value2 > 10) {
        if (result) {result =  'Номер страницы и лимит вне диапазона от 1 до 10';}
        else {result =  'Лимит вне диапазона от 1 до 10';}
    }
   return result
}

const useRequest = (url) => {
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            const pictureLinks = [];
            for (let line of json) {
                pictureLinks.push(line.download_url);
            }
            console.log(pictureLinks)
            return pictureLinks ;
        })
        .catch(() => console.log(servError))
}

function showErrorInput(error){
      let resultDiv = document.getElementById('resultDiv');
    resultDiv.innerHTML = error;

}
function showResult (list) {
    let result = '';
    for (let link of list) {
        result += `<img src="${link}">`;
    }
    console.log(result)
        let resultDiv = document.getElementById('resultDiv');
    resultDiv.innerHTML = result;

}

button.addEventListener("click", async () => {
    let pageNumber = +document.getElementById('pageNumber').value;
    let limit = +document.getElementById('limit').value;

    let inputError = checkInput(pageNumber, limit);

    if (inputError) {showErrorInput(inputError)}
    else {let url = ` https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`;
          const linksList = await useRequest(url);
          console.log('pictureList:', linksList);
          showResult(linksList);
        }
    });

