const button = document.querySelector('button');
const resultDiv = document.getElementById('resultDiv');
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
        .catch(() => showErrorInput(servError))
}

function showErrorInput(error){
      resultDiv.innerHTML = error;

}
function showResult (list) {
    let result = '';
    for (let link of list) {
        result += `<img src="${link}">`;
    }
    resultDiv.innerHTML = result;

}

button.addEventListener("click", async () => {
    let pageNumber = +document.getElementById('pageNumber').value;
    let limit = +document.getElementById('limit').value;

    let inputError = checkInput(pageNumber, limit);

    if (inputError) {showErrorInput(inputError)}
    else {let url = ` https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`;
          const linksList = await useRequest(url);
          localStorage.setItem('linkslist', JSON.stringify(linksList));
          showResult(linksList);
        }
    });

if (sessionStorage.getItem("is_reloaded")) {
    window.onload = () => {
        const saveLinks = JSON.parse(localStorage.getItem('linkslist'));
        if (saveLinks) {
            showResult(saveLinks)
        }
    };
}
sessionStorage.setItem("is_reloaded", true);
