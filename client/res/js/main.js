// vytvoří proměnnou info, která bude odkazovat na element s id "info"
const info = document.getElementById('info');

/*
* window.onload - když se načte okno
* async () => - tak spustíme asynchronní funkci
* try {} - zkusí provést nějaký kód. Pokud nastane někde chyba, spustí se catch (error) {} (chyba se uloží do 'error')
* await - počkáme než se provede určitá část kódu
* await fetch('http://127.0.0.1:3000/user',  { - hodí požadavek na server na koncový bod /user pomocí metody GET a odpověď hodí do proměnné res
*            method: "GET",
* });
* await res.json(); - počká než se přijatá data překonvertují na JSON a hodí tento JSON do proměnné data
* info.innerText = data.msg; - do textové části infa hodí přijatou zprávu od serveru (v našem případě "Seems good")
*/
window.onload = async () => {
    try {
        const res = await fetch('http://127.0.0.1:3000/user', {
            method: "GET",
        });
        const data = await res.json();
        info.innerText = data.msg;
    } catch (error) {
        info.innerText = error;
    }
}
