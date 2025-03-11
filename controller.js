'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function(req, res){
    response.ok("Aplikasi REST API berjalan!",res)
};


// menampilkan database
exports.tampilsemuamahasiswa = function(req,res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};


// menampilkan semua data mahasiswa berdasarkan id
exports.tampilberdasarkanid = function(req, res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok(rows, res);
            }
        }
    );
};

// menambahkan data mahasiswa
exports.tambahmahasiswa = function (req,res){
    console.log("Data yang diterima:", req.body); // Cek apakah data masuk

    var { nim, nama, jurusan } = req.body;

    if (!nim || !nama || !jurusan) {
        return res.status(400).json({ message: "Semua data (nim, nama, jurusan) harus diisi!" });
    }


    connection.query(
        'INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?, ?, ?)',
        [nim, nama, jurusan],
        function (error, results) {
            if (error) {
                console.error("Error executing query:", error);
                return res.status(500).json({ message: "Gagal menambahkan data!", error });
            } 
            console.log("Data berhasil ditambahkan:", results);
            return res.status(201).json({ message: "Berhasil menambahkan data!", insertedId: results.insertId });
        }
    );
};

// mengubah data berdasarkan id
exports.ubahmahasiswa = function(req, res){
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?',[nim, nama, jurusan, id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }
            else{
                response.ok("Berhasil Ubah Data",res)
            }
        }
    );

}


// hapus data
exports.hapusmahasiswa = function(req, res){
    var id = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function(error, rows, fields){
            if(error){
                console.log(error);
            }else{
                response.ok("Berhasil Hapus Data",res);
            }
        }
    );
}