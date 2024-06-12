// script.js

function fetchLocation() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    const results = data.results[0];
                    const formattedAddress = results.formatted_address;
                    const latitude = results.geometry.location.lat;
                    const longitude = results.geometry.location.lng;
                    
                    document.getElementById('result').innerHTML = `
                        <p><strong>Formatted Address:</strong> ${formattedAddress}</p>
                        <p><strong>Latitude:</strong> ${latitude}</p>
                        <p><strong>Longitude:</strong> ${longitude}</p>
                    `;
                } else {
                    document.getElementById('result').innerHTML = `<p>No results found.</p>`;
                }
            })
            .catch(error => {
                document.getElementById('result').innerHTML = `<p>Error: ${error}</p>`;
            });
    } else {
        document.getElementById('result').innerHTML = `<p>Please enter a location.</p>`;
    }
}
