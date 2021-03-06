import firebase from 'firebase/app';
import 'firebase/auth';

import enemyData from '../../helpers/data/enemyData';
import enemyComponent from './enemiesComponent';

import utils from '../../helpers/utils';
import editEnemy from '../editEnemy/editEnemy';
// import './enemies.scss';

const editEnemyEvent = (e) => {
  e.preventDefault();
  const enemiesId = e.target.closest('.card').id;
  $('#enemyEditModal').modal('show');
  editEnemy.showForm(enemiesId);
};

const updateEnemies = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  const userId = uid;
  const enemiesId = e.target.closest('.edit-enemy-form-tag').id;
  const editedEnemies = {
    uid: userId,
    name: $('#edit-enemy-name').val(),
    special_skills: $('#edit-enemy-skills').val(),
    weakness: $('#edit-enemy-weakness').val(),
    imageUrl: $('#edit-enemy-image').val(),
  };

  enemyData.updateEnemy(enemiesId, editedEnemies).then(() => {
    $('#enemyEditModal').modal('hide');
    // eslint-disable-next-line no-use-before-define
    printEnemy();
  })
    .catch((err) => console.error('could not update the enemies', err));
};


// ------------------------------------------------------------add enemy
const createEnemy = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  const userId = uid;
  const newEnemy = {
    name: $('#name').val(),
    special_skills: $('#skills').val(),
    imageUrl: $('#imageUrl').val(),
    weakness: $('#weakness').val(),
    uid: userId,
  };
  enemyData.addEnemy(newEnemy)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printEnemy();
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.err('could not add enemy', err));
};
// ---------------------------------------------------------------- deletes enemy--//

const deleteEnemy = (e) => {
  const selectedEnemiesId = e.target.closest('.user-card').id;
  console.log('test me', selectedEnemiesId);
  enemyData.deleteEnemy(selectedEnemiesId)
    .then(() => {
    // eslint-disable-next-line no-use-before-define
      printEnemy();
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.err('cannot remove enemy', err));
};

// -----------------------------------------------------------------create enemy model


// ---------------------------------------------------------------- prints enemy

const printEnemy = () => {
  const userAdd = firebase.auth().currentUser === null ? '' : '<div class="icon-block"><i class="iconblue fas fa-2x fa-plus-circle"></i></div>';
  enemyData.getAllEnemies()
    .then((enemies) => {
      let domString = '';
      domString += '<div class="accordion" id="accordionExample">';
      domString += '<h2>';
      domString += '<div class="text-center">';
      domString += '<button class="btn" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">';
      domString += `${userAdd}`;
      domString += '</h2>';
      domString += '</div>';
      domString += '<div id="collapseOne" class="collapse m-2" aria-labelledby="headingOne" data-parent="#accordionExample">';
      domString += '<form class="text-center mx-auto container jusitfy-content-center">';
      domString += '<div class="form-group">';
      domString += '<div class="form-row justify-content-center">';
      domString += '<div class="col-md-3 mb-3 form-group">';
      domString += '<label for="name">Name:</label>';
      domString += '<input type="text" class="form-control" id="name">';
      domString += '</div>';
      domString += '<div class="col-md-3 mb-3">';
      domString += '<label for="state">Skills:</label>';
      domString += '<input type="text" class="form-control" id="skills">';
      domString += '</div>';
      domString += '<div class="col-md-2 mb-3">';
      domString += '<label for="country">Weakness:</label>';
      domString += '<input type="text" class="form-control" id="weakness">';
      domString += '</div>';
      domString += '</div>';
      domString += '<div class="row-md-5 mb-3 space-around ml-5 pl-4 form-check">';
      domString += '<label for="country">ImageUrl:</label>';
      domString += '<input type="text" class="form-control" id="imageUrl">';
      domString += '</div>';
      domString += '</div>';
      domString += '<div class="row justify-content-center">';
      domString += '<button class="btnblue add-enemy-btn btn btn-primary mx-auto d-block" type="submit">Add Enemy</button>';
      domString += '</div>';
      domString += '</div>';
      domString += '</form>';
      domString += '</div>';
      domString += '</div>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      enemies.forEach((enemy) => {
        domString += enemyComponent.buildEnemies(enemy);
      });
      utils.printToDom('enemy-area', domString);
    })
    .catch((err) => console.error('get enemy broke', err));
};

const clickEvents = () => {
  $('body').on('click', '.delete-enemy-btn', deleteEnemy);
  $('body').on('click', '.add-enemy-btn', createEnemy);
  $('body').on('click', '#button-save-edit-enemy', updateEnemies);
  $('body').on('click', '.edit-enemies', editEnemyEvent);
};

export default { printEnemy, clickEvents };
