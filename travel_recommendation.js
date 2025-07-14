let travelData = [];

window.onload = () => {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            travelData = data;
            console.log('Data loaded:', travelData);
        })
        .catch(error => console.error('Error fetching data:', error));
};

function searchRecommendations() {
    const keyword = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!keyword) return;

    const filtered = travelData.filter(item =>
        item.category.toLowerCase().includes(keyword)
    );

    if (filtered.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    filtered.forEach(place => {
        const result = document.createElement('div');
        result.className = 'recommendation';
        result.innerHTML = `
            <h3>${place.name}</h3>
            <img src="${place.imageUrl}" alt="${place.name}" style="width: 100%; max-width: 300px;">
            <p>${place.description}</p>
        `;
        resultsDiv.appendChild(result);

        // Optional Task 10 - Display current time in the country
        if (place.timeZone) {
            const options = { timeZone: place.timeZone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
            const time = new Date().toLocaleTimeString('en-US', options);
            const timeElement = document.createElement('p');
            timeElement.textContent = Current time in ${place.name}: ${time};
            result.appendChild(timeElement);
        }
    });
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('searchInput').value = '';
}