// Import librairie Mysql
let mysql = require('mysql')

// config connexion BDD
const config = {
    host: 'localhost',
    user: 'user6',
    password: 'Web6',
    database: 'user6'
}

// Classe contenant appel à la BDD
class MysqlUtilities {
    // Récupère tous les utilisateurs
    getUsers(callback) {
        // Définition connexion
        let connection = mysql.createConnection(config)
        // on lance la connexion
        connection.connect()
        // On envoie la query
        connection.query('SELECT * FROM personnes', (error, results) => {
            callback(results, error)
        })
        // Fermeture connexion
        connection.end()
    }
    // Ajout d'un user dans la BDD MySQL
    addUser(callback, user) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('INSERT INTO personnes (nom,prenom) VALUES (?, ?)', [user.nom, user.prenom], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }

    // Réupérer une personne par l'id
    getUser(callback, id) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('SELECT * FROM personnes WHERE id_p=(?)', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }
    // Supprimer une personne via l'id
    deleteUser(callback, id) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('DELETE FROM personnes WHERE id_p=(?)', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }
    // Modifier personne via l'id
    modifUser(callback, id, user) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('UPDATE personnes SET nom = (?) , prenom = (?)  WHERE id_p=(?)', [user.nom, user.prenom, id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }
    // Récupérer la liste des SPE
    getSpe(callback) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('SELECT * FROM spe', (error, results) => {
            callback(results, error)
        })
        connection.end()
    }
    // Ajouter une SPE dans la BDD
    addSpe(callback, spe) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('INSERT INTO spe (nom_spe) VALUES (?)', [spe.nom], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }
    // Récupérer les Spe par l'id
    getSpeById(callback, id) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('SELECT * FROM spe WHERE id_spe=(?)', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }
    // Supprimer spe par l'id
    deleteSpeById(callback, id) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('DELETE FROM spe WHERE id_spe=(?)', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }
    // Modification spe par l'id
    modifSpe(callback, id, specif) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('UPDATE spe SET nom_spe = (?) WHERE id_spe=(?)', [specif.nom, id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }
    // Récupérer la spe et la personne by l'id
    getUserSpeByID(callback, id) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('SELECT personnes.nom, personnes.prenom, spe.nom_spe FROM personnes  INNER JOIN (avoir INNER JOIN spe ON avoir.id_spe = spe.id_spe) ON personnes.id_p = avoir.id_p WHERE personnes.id_p=? ', [id], (error, results) => {
            callback(results, error)
        })
        connection.end()
    }
    // Ajouter personnes et spe via l'id dans avoir
    addUserSpeById(callback, getId_p, getId_spe) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('INSERT INTO avoir (id_p,id_spe) VALUES (?,?)', [getId_p, getId_spe], (error, results) => {
            callback(results, error)
        })
    }
    // Supprimer la personne et la spe de la table avoir
    deleteUserSpeById(callback, getId_p, getId_spe) {
        let connection = mysql.createConnection(config)
        connection.connect()
        connection.query('DELETE FROM avoir WHERE id_nom=(?) AND id_spe=(?)', [getId_p, getId_spe], (error, results) => {
            callback(results, error)
        })
    }
}

module.exports = new MysqlUtilities()