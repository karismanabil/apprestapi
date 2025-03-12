'use strict';

exports.ok = function(values, res){
    var data = {
        'status':200,
        'values':values
    };
    
     res.json(data);
     res.end();
}


// response untuk nested matkul
exports.oknested = function (values, res) {
    // Lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        // Jika mahasiswa sudah ada di akumulasi
        if(akumulasikan[item.nama]){
        // buat var group nama mahasiwa
            const group = akumulasikan[item.nama];
            // cek jika isi array adalah matakuliah
            if(Array.isArray(group.matakuliah)){
                // tambahkan val ke dalam group matkul
                group.matakuliah.push(item.matakuliah);
            }else{
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        }
        else{
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    // Ubah hasil dari objek ke array
    var data = {
        status: 200,
        values: Object.values(hasil) // Konversi objek ke array
    };

    res.json(data);
};
