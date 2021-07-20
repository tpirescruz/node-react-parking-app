const express = require('express');
const app = express();
const parkings = require('./parkings.json')
const reservations = require('./reservations.json')
const cors = require('cors')

app.use(cors())
app.use(express.json())

// GET => recupérer des données => READ
app.get('/parkings', (req,res) => {
    res.status(200).json(parkings)
})
app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})

// POST => Insérer des données => CREATE
app.post('/parkings', (req,res) => {
    parkings.push(req.body)
    res.status(200).json(parkings)
})

// PUT => modifier des données => UPDATE
app.put('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    parking.name =req.body.name,
    parking.city =req.body.city,
    parking.type =req.body.type,
    res.status(200).json(parking)
})

// DELETE => Supprimer des données => DELETE
app.delete('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id  === id)
    parkings.splice(parkings.indexOf(parking), 1)
    res.status(200).json(parkings)

})
app.get('/search' , (req, res) => {
    const city = req.query.city
    const results = parkings.filter((parking) => parking.city === city )
    res.status(200).json(results)
})

app.post('/reservations', (req, res) => {
    reservations.push(req.body)
    res.status(200).json(reservations)
})

app.get('/reservations', (req, res) => {
    res.status(200).json(reservations)
})

app.get('/reservations/parking/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const reservation = reservations.find(reservation => reservation.parkingId === id)
    res.status(200).json(reservation)
})

app.get('/reservations/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const reservation = reservations.find(reservation => reservation.id === id)
    res.status(200).json(reservation)
})

app.put('/reservations/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const reservation = reservations.find(reservation => reservation.id === id)
    reservation.parking = req.body.parking
    reservation.parkingId = req.body.parkingId
    reservation.clientName = req.body.clientName
    reservation.city = req.body.city
    reservation.vehicle = req.body.vehicle
    reservation.licensePlate = req.body.licensePlate
    reservation.checkin = req.body.checkin
    reservation.checkout = req.body.checkout
    res.status(200).json(reservation)
})

app.delete('/reservations/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const reservation = reservations.find(reservation => reservation.id === id)
    reservations.splice(reservations.indexOf(reservation), 1)
    res.status(200).json(reservations)
})


app.listen(4242, () => {
    console.log("Serveur à l'écoute sur le port: 4242")
});