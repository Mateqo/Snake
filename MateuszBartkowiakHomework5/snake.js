
// wyłap obiekt z id snake
const canvas = document.getElementById("snake");
// ustaw na 2d
const context = canvas.getContext("2d");

// tworzenie kwadratu (jednego pola)
const box = 32;


// ustawianie zdjęc
const background = new Image();
background.src = "img/snakeBg.jpg";

const presentImage = new Image();
presentImage.src = "img/prezent.png";

let retrievedObject = 0;

// zmienna wynik
let score = 0;

// zmienna jaki kierunek węża
let direction;

// tworzenie węża
let snake = [];
snake[0] = {
    // współrzędne głowy
    x: 9 * box,
    y: 10 * box
}

// tworzenie prezentu (losowanie gdzie)
let present = {
    // współrzędne prezentu
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

// dodajemy wydarzenie - wciśnięcie klawisza, wywołuje fukcje która potem przypisuje kierunek
document.addEventListener("keydown",directionSet);

// funkcja przypisująca kierunek
function directionSet(event) {
    if (event.keyCode == 65 && direction!="Right") {
        direction = "Left";
    }
    else if (event.keyCode == 87 && direction != "Down") {
        direction = "Up";
    }
    else if (event.keyCode == 68 && direction != "Left") {
        direction = "Right";
    }
    else if (event.keyCode == 83 && direction != "Up") {
        direction = "Down";
    }
}

// funkcja rysująca
function draw() {
    context.drawImage(background, 0, 0);

    // zrób z każdym elementem węża
    for (let i = 0; i < snake.length; i++) {

        // zmiana koloru głowu czyli gdy zerowy element lub zmiana na inny gdy tułów
        context.fillStyle = (i == 0) ? "#c34f4f" : "white";

        // wypełnianie o współrzędnych i wymiarach
        context.fillRect(snake[i].x, snake[i].y, box, box);

        // zmiana koloru obramowania
        context.strokeStyle = "red";
        // rysowanie  obrysu o współrzędnych i wymiarach
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // rysujemy na płótnie(co rysujemy, współrzędna,w spółrzędna)
    context.drawImage(presentImage, present.x, present.y);

    // przetrzymanie pozycji poprzedniej
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    
    // poruszanie się 
    if (direction == "Left") snakeX -= box;
    if (direction == "Up") snakeY -= box;
    if (direction == "Right") snakeX += box;
    if (direction == "Down") snakeY += box;

    // jeśli zbierzemy prezent wygeneruj nowe współrzędne obrazka
    if (snakeX == present.x && snakeY == present.y) {
        score++;
        present = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    }
    else {
        // usunięcie ogonu (usunięcie ostatniego elementu)
        snake.pop();
    }

    // nowa pozycja (pierwszego klocka, który steruje)
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // wykrycie zderzenia
    if (snakeX < 0 || snakeX > 18 * box || snakeY < 0 || snakeY > 18 * box || collision(newHead,snake)) {
        clearInterval(game);
        setTimeout(slow, 200);
        // wywołanie funkcji sprawdzającej poprawność 
        if (localStorageTest()) {
            if (localStorage.getItem('myElement') !== null) {
                // wyciagnięcie elementu i przypisanie
                retrievedObject = localStorage.getItem('myElement');
            }
            // gdy nowy rekord
            if (score > retrievedObject) {
                // nadpisz
                localStorage.setItem('myElement', JSON.stringify(score));
                document.getElementById("yourscore").innerHTML = score;
            }
        }
    }
    
    // dodanie do tablicy na początek
    snake.unshift(newHead);

    // wypełnienie ogona
    context.fillStyle = "white";
    // wypisanie aktualnego wyniku
    document.getElementById("count").innerHTML = score;
}

// funkcja w której pojawia się przycisk
function slow() {
    $('#restart').css('opacity', 100);
    // możliwość kliknięcia w przycisk
    $('#restart').attr('disabled', false);
}

// wykrycie kolizji głowa-ogon
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// restart
function reset() {
    window.location.reload();
}


// wywoływanie funkcji rysującej co 100ms
let game = setInterval(draw, 100);


// funkcja sprawdza poprawne działanie
function localStorageTest() {
    const test = "test" + new Date().valueOf();
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}



