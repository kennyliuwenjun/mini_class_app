peopleformat = (responseData) => {
  const data = {};
  for (row in responseData){
    let one = responseData[row];
    if (data[one.id]){
      data[one.id]['classes'].push(one.class_code);
    } else {
      data[one.id] = {
        classes : [one.class_code],
        email : one.email,
        first_name : one.first_name,
        last_name : one.last_name
      }
    }
  }
  return data;
}

oneClassFormat = (responseData) => {
  const data = {};
  data.first_name = responseData[0].first_name
  data.last_name = responseData[0].last_name
  data.classes = []
  for (row in responseData){
    let one = responseData[row];
    data.classes.push(one.class_code);
  }
  return data;
}

module.exports = {peopleformat,oneClassFormat};
