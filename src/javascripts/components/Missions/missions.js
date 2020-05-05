import firebase from 'firebase/app';
import 'firebase/auth';

import smash from '../../helpers/data/smash';
import missionCards from '../missionCards/missionCards';
import createMissionComponent from './createMission';
import utils from '../../helpers/utils';
import missionData from '../../helpers/data/missionData';

const createNewMissionFormDiv = $('#create-new-mission-form-goes-here');
const openNewMissionFormButton = $('#show-make-new-mission-form-button');


const buildMissions = () => {
  smash.getMissionsEverything()
    .then((missions) => {
      let domString = '';
      domString += '<div>';
      domString += '<button id="show-make-new-mission-form-button"><i class="fas fa-2x fa-plus-circle"></i></button>';
      domString += '<div class= "d-flex flex-wrap  justify-content-center">';

      missions.forEach((mission) => {
        domString += missionCards.missionMaker(mission);
      });
      domString += '</div>';
      domString += '</div>';
      utils.printToDom('the-mission', domString);
      // $('body').on('click', '.mission-card', buildMissions);
    })
    .catch((err) => console.error('get mission broke', err));
};


const createNewMission = () => {
  createNewMissionFormDiv.addClass('hide');
  openNewMissionFormButton.removeClass('hide');
  // make new mission object
  const newMission = {
    enemyId: $('#mission-enemy-drop-down').val(),
    name: $('#user-entered-mission-name').val(),
    planetarySectorId: $('#mission-sector-drop-down').val(),
    missionWeapon: $('#mission-weapons-drop-down').val(), // this will need to go to the missionWeapons part of firebase?
    uid: firebase.auth().currentUser.uid,
  };
  console.error('your newMission object', newMission);
  // save to firebase
  missionData.addMission(newMission)
    .then(() => {
      buildMissions();
    })
    .catch((err) => console.error('make new mission broke', err));
};

const missionClickEvents = () => {
  $('body').on('click', '#show-make-new-mission-form-button', createMissionComponent.showFormToCreateMission);
  $('body').on('click', '#submit-new-mission-form-button', createNewMission);
};
// const missionPersonnelController = (e) => {
//   e.preventDefault();
//   console.log(e.target.checked);
//   if (e.target.checked) {
//   // create a new personnel
//     const newMissionPersonnel = {
//       personnelId: e.target.closest('.form-check-label').id
//       missionId: e.target.closest('.card').id,
//       missionName: ' ',
//       weaponId: ' ',
//       uid: firebase.auth().currentUser.uid,
//     };
//   } else {
//     // delete a personnel
//   }
// };


export default { buildMissions, missionClickEvents };
