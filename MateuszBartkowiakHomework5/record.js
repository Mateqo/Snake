
// zmienna przechowująca rekord
let record;

// funckja ustawia nowy rekord jeśli zostanie pobity
function setScore() {

    // gdy storage nie jest pusty przypisz zmienną
    if (localStorage.getItem('myElement') !== null) {
        record = localStorage.getItem('myElement');
        // nadpisz w "yourscore" wynik
        document.getElementById("yourscore").innerHTML = record;
    }


    // wywołuj co sekunde
    setTimeout("setScore()", 1000);
}