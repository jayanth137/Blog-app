import moment from 'moment';

function formatDate(dateString) {
  let date = moment(dateString);
  let formattedDate = date.format('MMMM Do YYYY, h:mm:ss a');
  return formattedDate;
}
export default formatDate;
