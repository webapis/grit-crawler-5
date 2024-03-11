export default function extractBackgroundImage(backgroundImage) {

    // Check if there's a background image set
    if (backgroundImage && backgroundImage !== 'none') {
        // Extract the URL using regular expression
        const urlRegex = /url\('(.*)'\)/;
        const match = urlRegex.exec(backgroundImage);

        // Check if there's a match
        if (match) {
            // Extract the first capturing group (the URL)
            const imageUrl = match[1];
            console.log(imageUrl);  // This will log the extracted image URL
            return imageUrl
        } else {
            console.log('No image URL found in background-image');
        }
    } else {
        console.log('No background image set');
    }
}