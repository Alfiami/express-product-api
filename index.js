const express = require('express');
const app = express();
const port = 3000;
const db = require("./connection");
app.use(express.json());

app.get('/products', (req, res) => {
    const sqlQuery = "SELECT * FROM products";
    db.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "Database query error",
                error: err
            });
        } else if (results.length > 0) {
            res.json({
                status: 200,
                payload: results,
                message: "ok",
            });
        } else {
            res.status(400).json({
                status: 400,
                payload: results,
                message: "bad",
            });
        }
    });
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = `select * from products where id = ${id}`
    db.query(sqlQuery, (err,result) => {
        if(result.length > 0){
            res.json({
                status:200,
                payload : result,
                message : "sukses get detail produk"
            });
        } else {
            res.status(400).json({
                status: 400,
                payload: results,
                message: "bad",
            });
        }
    });
});
      

app.post('/products', (req, res) => {
    const { nama, stok, kategori, deskripsi } = req.body;
    console.log("body => ", req.body);

    const sqlQuery = 'INSERT INTO products SET nama = ?, stok = ?, kategori = ?, deskripsi = ?';
    db.query(sqlQuery, [nama, stok, kategori, deskripsi], (err, result) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "Error while inserting data",
                error: err
            });
        } else {
            res.json({
                status: 200,
                payload: result,
                message: "Sukses tambah produk"
            });
        }
    });
});

app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const { nama, stok, kategori, deskripsi } = req.body;

    const sqlQuery = 'UPDATE products SET nama = ?, stok = ?, kategori = ?, deskripsi = ? WHERE id = ?';
    db.query(sqlQuery, [nama, stok, kategori, deskripsi, id], (err, result) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "Error while updating data",
                error: err
            });
        } else if (result.affectedRows > 0) {
            res.json({
                status: 200,
                payload: result,
                message: "Sukses update produk"
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Produk tidak ditemukan"
            });
        }
    });
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = 'DELETE FROM products WHERE id = ?';
    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "Error while deleting data",
                error: err
            });
        } else if (result.affectedRows > 0) {
            res.json({
                status: 200,
                payload: result,
                message: "Sukses hapus produk"
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Produk tidak ditemukan"
            });
        }
    });
});
app.listen(port, () => {
  console.log(`listening on port ${port}`)
});
