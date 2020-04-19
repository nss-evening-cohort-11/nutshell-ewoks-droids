import utils from '../../helpers/utils';
import sectorData from '../../helpers/data/sectorData';


const showEditSectorForm = (sectorId) => {
  sectorData.getSingleSector(sectorId)
    .then((response) => {
      const sector = response.data;
      let domString = '';

      domString += '<h3>Edit Sector Below</h3>';
      domString += '<br>';
      domString += `<form class="edit-sector-form" id=${sectorId}>`;

      domString += '<div class="form-group">';
      domString += '<label for="user-entered-sector-name">Sector Name</label>';
      domString += `<input type="text" class="form-control" id="user-edited-sector-name" value=${sector.name}>`;
      domString += '</div>';

      domString += '<div class="form-group">';
      domString += '<label for="user-entered-sector-image">Sector Image</label>';
      domString += `<input type="text" class="form-control" id="user-edited-sector-image" value=${sector.imageUrl}>`;
      domString += '</div>';

      domString += '<div class="form-group">';
      domString += '<label for="user-entered-explored-info">Has this Sector been explored?</label>';
      domString += `<input type="text" class="form-control" id="user-edited-explored-info" value=${sector.explored}>`;
      domString += '</div>';

      domString += '<div class="form-group">';
      domString += '<label for="user-entered-occupied-info">Is this Sector occupied?</label>';
      domString += `<input type="text" class="form-control" id="user-edited-occupied-info" value=${sector.occupied}>`;
      domString += '</div>';

      domString += '<button type="submit" class="btn btn-primary" id="submit-user-edited-sector-infomation-button">Submit Your Edits</button>';

      domString += '</form>';

      utils.printToDom('update-create-sector-cards-here', domString);
    })
    .catch((err) => console.error('could not get single sector to update info', err));
};


export default { showEditSectorForm };
