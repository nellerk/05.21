document.addEventListener('DOMContentLoaded', () => {
    fetch('/vehicles')
        .then(response => response.json())
        .then(data => {
            const vehicleSection = document.getElementById('available-vehicles');
            const vehicleSelect = document.getElementById('vehicle-id');

            data.forEach(vehicle => {
                // Populate available vehicles section
                if (vehicleSection) {
                    const vehicleDiv = document.createElement('div');
                    vehicleDiv.className = 'vehicle card mb-3';
                    vehicleDiv.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${vehicle.image_url}" alt="${vehicle.brand} ${vehicle.model}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${vehicle.brand}</h5>
                                <p class="card-text">Model: ${vehicle.model}</p>
                                <p class="card-text">Year: ${vehicle.year}</p>
                                <p class="card-text">Price: $${vehicle.price}</p>
                                <p class="card-text">Is-Available: ${vehicle.isAvailable}</p>
                            </div>
                        </div>
                    </div>`;
                    vehicleSection.appendChild(vehicleDiv);
                }

                // Populate vehicle select options
                if (vehicleSelect) {
                    const option = document.createElement('option');
                    option.value = vehicle.id;
                    option.textContent = `${vehicle.brand} ${vehicle.model}`;
                    vehicleSelect.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching vehicles:', error);
        });
        
});