dataformat = (responseData) => {
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

module.exports = {dataformat};
