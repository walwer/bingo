let data = {
    "polski": ["żydzi","holocaust","okularnicy","matura","manipulacja","ironia","złośliwość","uchodźcy","Rafał","macie to gdzieś",
    "ulobiony uczeń", "kochanie", "myślicie, że zdacie?","obozy","o Seweryn przyszedł","bo moje dziecko", "elitarne szkoły",
    "mój syn","taką szmate","moje roślinki"],

    "matematyka" :  ["plan działania","zapraszam","dlaczego cię nie było","a jak będziesz chodził do pracy to..",
    "proste zadanie","losowe patyczni","słoń","dźdzownica","zapomniałam","zaproś kolegę do pomocy","chwila na zastanowienie",
    "kto nieboceny?","bardzo ładnie", "jak pięknie się skróciło", "bardzo ładnie","ma ktoś pytania?","rozumiesz/rozumiecie?",
    "Ty już byłeś","robimy z marszu", "zestaw A","na pewno chciał","kto pójdzie po kredę?"],
    
    "his": ["Tomasz Opałka","ty smyku","Kamil ty smyku","Dobra","MUR BETON","tak nie może być","Panowie","Rzymianie","falanga",
    "4 godziny w tygodniu","prezentacje","w porządku","spokój panowie","krew zaleje","jak musisz to idź","te telefony","przepraszam",
    "tym razem nie uciekłeś","miło cię widzieć",]
}

let board = [];

const boardSize = 4;
let chosenCategory = 'polski';

let boardElement = document.getElementById("board");

let selectElement = document.getElementById("select-box");

function getItem(name) {
    return `
        <div class="item">
        <span> 
        ${name}
        </span>
        </div>
    `;
}

for(let key in data) {
    let element = `<option value="${key}">${key}</option>`;
    selectElement.innerHTML += element;
}

function getRandomFromData() {
    return Math.floor(Math.random() * data[chosenCategory].length);
}

document.getElementById('generate').addEventListener('click', function(e) {
    chosenCategory = selectElement.value;
    generateBoard();
});

function generateBoard() {
    board = [];
    boardElement.innerHTML = '';

    let header = document.getElementById('board_header');
    header.innerText = chosenCategory.toUpperCase() + " BINGO";

    for(let i=0;i<boardSize*boardSize;i++){
        let random = getRandomFromData();

        while(board.indexOf(random)!==-1){
            random = getRandomFromData();
        }
        board.push(random);
        boardElement.innerHTML += getItem(data[chosenCategory][random])
    }
    downloadBoard();
    // document.getElementsByClassName('download')[0].classList.remove('disabled');
}

function downloadBoard() {
    let content = document.getElementById('content');


    html2canvas(content).then(function(canvas) {
        let img = canvas.toDataURL();
        let link = document.createElement('a');
        link.download = `plansza_bingo_${chosenCategory}`;
        link.href = img;
        link.click();
    });
}



