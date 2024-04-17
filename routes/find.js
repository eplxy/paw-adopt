const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', function (req, res, next) {
  res.render('Find', {});
});

router.post('/', function (req, res, next) {
  let foundPets = [];
  fs.readFile('./textfiles/pets.txt', 'utf8', function (err, data) {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      const lines = data.split('\n');

      const pettype = req.body.type;
      const petbreed = req.body.breed;
      const petage = req.body.age;
      const petgender = req.body.gender;
      const petgetalong = req.body.get_along;

      console.log('Type:', pettype);
      console.log('Breed:', petbreed);
      console.log('Age:', petage);
      console.log('Gender:', petgender);
      console.log('Get Along:', petgetalong);

      lines.forEach(function (line) {
        const pet = line.split(':');
        if (pet.length !== 0) {
          if (pettype === pet[3]) {
            if (petbreed === pet[4] || petbreed === 'NA') {
              if (petage === pet[5] || petage === 'NA') {
                if (petgender === pet[6] || petgender === 'NA') {

                  if (petgetalong === undefined) {
                    foundPets.push(pet);
                  } else {
                    let flag = true;
                    for (let i = 0; i < petgetalong.length; i++) {
                      if (!pet[7].includes(petgetalong[i])) {
                        flag = false;
                        break;
                      } else {
                        continue;
                      }
                    }
                    if (flag) {
                      foundPets.push(pet);
                    }
                  }
                }
              }
            }
          }

        }
      });

      res.render('pets', { foundPets: foundPets })

    }
  });


});

module.exports = router;
