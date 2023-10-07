const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    enum: ['Álava',
      'Albacete',
      'Alicante',
      'Almería',
      'Asturias',
      'Ávila',
      'Badajoz',
      'Barcelona',
      'Burgos',
      'Cáceres',
      'Cádiz',
      'Cantabria',
      'Castellón',
      'Ciudad Real',
      'Córdoba',
      'Cuenca',
      'Gerona',
      'Granada',
      'Guadalajara',
      'Guipúzcoa',
      'Huelva',
      'Huesca',
      'Islas Balears',
      'Jaén',
      'La Coruña',
      'La Rioja',
      'Las Palmas',
      'León',
      'Lérida',
      'Lugo',
      'Madrid',
      'Málaga',
      'Murcia',
      'Navarra',
      'Orense',
      'Palencia',
      'Pontevedra',
      'Salamanca',
      'Santa Cruz de Tenerife',
      'Segovia',
      'Sevilla',
      'Soria',
      'Tarragona',
      'Teruel',
      'Toledo',
      'Valencia',
      'Valladolid',
      'Vizcaya',
      'Zamora',
      'Zaragoza'
    ],

  },
  favoriteProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  productsForSale: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ]
});

module.exports = mongoose.model('User', userSchema);
