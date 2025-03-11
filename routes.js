'use strict';

module.exports = function(app) {
    var jsonku = require('./controller');

    app.route('/').get(jsonku.index);

    app.route('/tampil').get(jsonku.tampilsemuamahasiswa);

    app.route('/tampil/:id').get(jsonku.tampilberdasarkanid);

    app.route('/tambahmahasiswa').post(jsonku.tambahmahasiswa);
    app.route('/ubahmahasiswa').put(jsonku.ubahmahasiswa);
}