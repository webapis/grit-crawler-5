function searchObject(obj, searchTerms) {
    const sortedSearchTerms =searchTerms.sort((a, b) => b.length - a.length);

    // Iterate through each property of the object
    for (let key in obj) {
        // Check if the property value is a string
        if (typeof obj[key] === 'string') {
            // Check if any search term is found in the property value
            for (let i = 0; i < sortedSearchTerms.length; i++) {
                if (obj[key].replaceAll('-',' ').toLowerCase().includes(sortedSearchTerms[i].toLowerCase())) {
                 
                 
                    return sortedSearchTerms[i]; // Match found
                   
                   
                  
                }
            }
        }
    }
    return false; // No match found
}

export default searchObject



/*
function searchObject(obj, searchTerms) {
    // Iterate through each property of the object
    for (let key in obj) {
        // Check if the property value is a string
        if (typeof obj[key] === 'string') {
            // Check if any search term is found in the property value
            for (let i = 0; i < searchTerms.length; i++) {
                if (obj[key].toLowerCase().includes(searchTerms[i].toLowerCase())) {
                    return searchTerms[i]; // Match found
                }
            }
        }
    }
    return false; // No match found
}

export default searchObject
*/