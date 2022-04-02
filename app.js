// Importer les librairies
const express = require('express')
const bodyParser = require('body-parser')
const Personnes = require('./beans/Personnes')
const Spe = require('./beans/Spe')
const { body, validationResult } = require('express-validator');
// Implémentation de app et définition du port
const app = express()
const port = 3006
// app va utiliser la librairie bodyParser
app.use(bodyParser.json());

// Méthodes de app.
const log = require('./Utilities/logUtilities')
const mysqlUtilities = require('./Utilities/MysqlUtilities')

// /////////////////////////////////////////////////////// DEBUT PERSONNES ///////////////////////////////////////////////

// Récupérer toutes les personnes de la BDD
app.get('/personnes', (req, res) => {
    // console.log("Test")
    mysqlUtilities.getUsers((result, error) => {
        if (!error) {
            res.send(result)
        } else {
            res.status(500).send(error)
        }
    })
})
// Ajouter une personne dans la BDD en l'important d'un JSON avec validator
app.post('/personnes', body('nom').isLength({ min: 5 }), body('prenom').isLength({ min: 4 }).isAlpha().withMessage('Chut Marwa!!!!'), (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    /*fin du validator*/
    let user = new Personnes(req.body.nom, req.body.prenom)
    console.log(user);
    mysqlUtilities.addUser((result, error) => {
        if (!error) {
            user.id = result.insertId
            res.send(user)
        } else {
            res.status(500).send(error)
        }
    }, user)
})

// Récupérer la personne par l'id
app.get('/personnes/:id', (req, res) => {
    let getId = req.params
    console.log("recup une personne by id")
    mysqlUtilities.getUser((result, error) => {
        if (!error) {
            res.send(result)
        } else {
            res.status(500).send(error)
        }
    }, getId.id)

})
// Supprimer personne par l'id
app.delete('/personnes/:id', (req, res) => {
    let getId = req.params
    console.log("supprimer personne avec id")
    mysqlUtilities.deleteUser((result, error) => {
        if (!error) {
            res.send(result)
        } else {
            res.status(500).send(error)
        }
    }, getId.id)
})
// Modifier personne par l'id
app.put('/personnes/:id', (req, res) => {
    let getId = req.params
    let user = new Personnes(req.body.nom, req.body.prenom)
    // console.log(user)
    // console.log(getId)
    console.log("modification personne avec id")
    mysqlUtilities.modifUser((result, error) => {
        if (!error) {
            // console.log(result.insertId)
            user.id = result.insertId
            res.send(user)
        } else {
            res.status(500).send(error)
        }
    }, getId.id, user)
})
// ////////////////////////////////////////////////// FIN PERSONNES ////////////////////////////////////////////

//////////////////////////////////////////////////// DEBUT SPE /////////////////////////////////////////////////

// Récupérer toutes les SPE de la BDD
app.get('/spe', (req, res) => {
    console.log('recup des spe!!!')
    mysqlUtilities.getSpe((result, error) => {
        if (!error) {
            console.log(result)
            res.send(result)
        } else {
            res.status(500).send(error)
        }
    })
})

// Ajout de Spe dans la BDD
app.post('/spe', (req, res) => {
    let spe = new Spe(req.body.nom)
    console.log('Ajout spe dans la BDD')
    mysqlUtilities.addSpe((result, error) => {
        if (!error) {
            spe.id = result.insertId
            res.send(spe)
        } else {
            res.status(500).send(error)
        }
    }, spe)
})
// Récupérer spe by Id
app.get('/spe/:id', (req, res) => {
    let getId = req.params.id
    console.log("récuperer spe by Id")
    mysqlUtilities.getSpeById((result, error) => {
        if (!error) {
            console.log(result)
            res.send(result)
        } else {
            res.status(500).send(error)
        }
    }, getId)
})
// Supprimer spe par l'id
app.delete('/spe/:id', (req, res) => {
    let getId = req.params.id
    console.log("supprimer spe par l'id")
    mysqlUtilities.deleteSpeById((result, error) => {
        if (!error) {
            res.send(`spe avec l'id ${getId} supprimée`)
        } else {
            res.status(500).send(error)
        }
    }, getId)
})
// Modifier spe avec l'id
app.put('/spe/:id', (req, res) => {
    let getId = req.params.id
    let specif = new Spe(req.body.nom)
    // console.log(specif)
    // console.log(getId)
    console.log("modification spe avec id")
    mysqlUtilities.modifSpe((result, error) => {
        if (!error) {
            // console.log(result.insertId)
            specif.id = result.insertId
            res.send(specif)
        } else {
            res.status(500).send(error)
        }
    }, getId, specif)
})

// ///////////////////////////////////////////// FIN SPE ///////////////////////////////////////////

// Récupérer la spe et la personne by l'id
app.get('/personnes/:id/spe', (req, res) => {
    let getId = req.params.id
    console.log("recupération personne et spe via l'id")
    mysqlUtilities.getUserSpeByID((result, error) => {
        if (!error) {
            console.log(result)
            res.send(result)
        } else {
            res.status(500).send(error)
        }
    }, getId)
})
// Ajouter personnes et spe via l'id dans avoir
app.post('/personnes/:id_p/spe/:id_spe', (req, res) => {
    let getId_p = req.params.id_p
    let getId_spe = req.params.id_spe
    // console.log(getId_p)
    // console.log(getId_spe)
    console.log('Ajout personnes/spe dans table avoir')
    mysqlUtilities.addUserSpeById((result, error) => {
        if (!error) {
            res.send(result)
        } else {
            res.status(500).send(error)
        }
    }, getId_p, getId_spe)
})
// // Supprimer la personne et la spe de la table avoir
app.delete('/personnes/:id_p/spe/:id_spe', (req, res) => {
    let getId_p = req.params.id_p
    let getId_spe = req.params.id_spe
    // console.log(getId_p)
    // console.log(getId_spe)
    console.log('supprimer personnes/spe de la table avoir')
    mysqlUtilities.deleteUserSpeById((result, error) => {
        if (!error) {
            res.send(result)
        } else {
            res.status(500).send(error)
        }
    }, getId_p, getId_spe)
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})