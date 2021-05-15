const button = document.querySelector('button');
const resultDiv = document.getElementById('result');
const servError = 'Ошибка сервера. Попробуйте снова'

button.addEventListener("click", () => {
    const value = +document.querySelector('input').value;
    if (value > 10 || value < 1 || isNaN(value)) {let badNumber = 'число вне диапазона от 1 до 10'
        resultDiv.innerHTML = badNumber;
        } else {let url = 'https://picsum.photos/v2/list?limit=' + value;
        useRequest (url, showGallery);
    }
});

function useRequest (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = () => {
        if (xhr.status != 200) {resultDiv.innerHTML = servError;
            console.log('Ошибка. Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result)
            }
        }
    }
    xhr.onerror = ()=> {resultDiv.innerHTML = servError;
    console.log('Ошибка. Статус ответа: ', xhr.status);
    }
    xhr.send();
};

function showGallery (apiData){
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
        <img 
        src="${item.download_url}" class="card-image">
        <p>${item.author}</p>
        </div>`;
        cards += cardBlock;
    })
    resultDiv.innerHTML = cards;

}