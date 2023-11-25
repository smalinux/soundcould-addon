
// // SMA FIXME hardcoded
const getEnd = "http://localhost:3000/get/"

/*
 * getKey
 *
 * */
export const getKey = (key) => {
   fetch(getEnd+key)
   .then(response => response.json())
   .then(data => {
      console.log(data);
   }).catch(error => {
      console.log(error);
   })
}

/*
 * setKey
 *
 * */
export const setKey = (key, value) => {
   fetch('http://localhost:3000/set', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         key: key,
         value: value
      })
   })
      .then(response => response.json())
      .then(data => {
         console.log('Response from server:', data);
      })
      .catch(error => {
         console.error('Error:', error);
      });
}

/*
 * checkKeyExistence
 *
 * */
export const checkKeyExistence = async (url, keyToCheck) => {
  try {
    const response = await fetch("http://localhost:3000/checkKey", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: keyToCheck // Use the keyToCheck parameter
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();

    // Return true if key exists, false if it doesn't
    return data;
  } catch (error) {
    throw error; // Throw the error for handling outside the function
  }
};
