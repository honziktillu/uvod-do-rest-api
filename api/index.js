const express = require('express');
const cors = require('cors');
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/user', (req, res) => {
    res.status(200).send({
        msg: "Seems good"
    });
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const { payload } = req.body;
    if(!payload) return res.status(404).send({ msg: "Payload not found" });
    res.status(200).send({
        id,
        payload
    });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));