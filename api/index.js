/* 
* UVOD DO REST API
* ----------------
* const - slovíčko pro vytvoření proměnné (const express - proměnná s názvem 'express')
* require() - funkce z Node.JS - načítá moduly PS: příkaz pro instalaci modulu: npm i nazev_modulu
* PORT - port na kterým API poběží - př. 127.0.0.1:3000 (PORT - 3000) PS pro Zajdu: 127.0.0.1 je IP adresa (localhost) :)
* app = express(); - z modulu express natáhneme Express apku do proměnné app
*/
const express = require('express');
const cors = require('cors');
const PORT = 3000;
const app = express();

/*
* app.use(); - řikáme, že aplikace bude používat 'middleware' - jinak řečeno, tato část kódu se provede pokaždý bez ohledu na to, který koncový bod si client vyžádal.
* Příklad: Client si hodí GET request (požadavek Zajdo :)) na 127.0.0.1:3000/user - server samozřejmě spustí kód pro tento koncový bod, ale zároveň spustí i app.use(cors()); a app.use(express.json());
*
* app.use(cors()); - aplikace bude používat middleware z modulu cors. CORS - cross origin resource sharing - např. pokud se liší IP adresa či PORT serveru od IP adresy či PORTU clienta, tak nám jednoduše řečeno nepůjde komunikace - chybí potřebné hlavičky. Tyto hlavičky nám řeší CORS modul.
* app.use(express.json()); - aplikace bude přijímat BODY z requestu od clienta jako JSON. JSON - JavaScriptová objektová notace.
*/
app.use(cors());
app.use(express.json());

/*
* aplikace bude mít koncový bod 127.0.0.1:3000/user na který když client hodí request, tak se mu vrátí od serveru HTTP status code 200 (OK) se zprávou v JSONu
* req - request (požadavek) od clienta
* res - response (odpověď) od serveru
*/
app.get('/user', (req, res) => {
    res.status(200).send({
        msg: "Seems good"
    });
});

/*
* /user/:id - dynamická část v URL adrese
* Příklad: 127.0.0.1:3000/user/mojeid1 nebo třeba 127.0.0.1:3000/user/qwe5494d9qweq
* Tato hodnota se uloží do req.params
* const { id } = req.params; - destructuring - místo toho abychom psali const id = req.params.id; Popřípadě když toho bude více, tak abychom ušetřili řádky - const { id, name, age } = req.params;
* if(!payload) return res.status(404).send({ msg: "Payload not found" }); - když nebude payload definovaný, tak vrátíme clientovi status 404 (Not found) se zprávou v JSONu. Slovo return nám zajistí, že toto bude poslední věc, která se v tomto bloku provede.
* Pokud payload definován bude, tak server pošle response s 200 s id a payloadem v JSONu.
*/
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const { payload } = req.body;
    if(!payload) return res.status(404).send({ msg: "Payload not found" });
    res.status(200).send({
        id,
        payload
    });
});

//aplikace bude běžet na PORTu 3000 a když se spustí, tak se do Node.JS terminálu vypíše 'Server is running on 3000'
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
