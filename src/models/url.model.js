const db = require("../config/database");

class Url {
    static async addUrl(url) {
        const sql = `INSERT INTO urls (url) VALUES (?)`;
        return new Promise((resolve, reject) => {
            db.run(sql, [url], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve({ id: this.lastID, url });
            });
        });
    }

    static async getUrlById(id) {
        const sql = `SELECT * FROM urls WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static async getIdByUrl(url) {
        const sql = `SELECT id FROM urls WHERE url = ?`;
        return new Promise((resolve, reject) => {
            db.get(sql, [url], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }
}


module.exports = Url;