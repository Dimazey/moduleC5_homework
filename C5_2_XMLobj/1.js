const xmlStr = '<list><student><name lang="en"><first>Ivan</first><second>Ivanov</second></name><age>35</age><prof>teacher</prof></student><student><name lang="ru"><first>Петр</first><second>Петров</second></name><age>58</age><prof>driver</prof></student></list>';

const parser = new DOMParser();
const xmlDom = parser.parseFromString(xmlStr, "text/html");

let resultObj = {};
resultObj.list = [];

const students = xmlDom.querySelectorAll('student');
let name;
let prof;
let age;
let lang;

for (let i = 0; i < students.length; i++) {
    name = students[i].querySelector('first').textContent + ' ' + students[i].querySelector('second').textContent,
    age = students[i].querySelector('age').textContent;
    prof = students[i].querySelector('prof').textContent;
    lang = students[i].querySelector('name').getAttribute('lang');

    resultObj.list[i] = {
        name: name,
        age: +age,
        prof: prof,
        lang: lang,
    }
}
console.log(resultObj);