let history = JSON.parse(localStorage.getItem('weather_history')) || [];

const infoBox = document.getElementById('weatherResult');
const loading = document.getElementById('loading');
const errorState = document.getElementById('error');

async function fetchWeather(city) {
    if (!city.trim()) return;
    
    // Bật trạng thái Loading
    loading.classList.remove('hidden');
    infoBox.classList.add('hidden');
    errorState.classList.add('hidden');

    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        
        // Thao tác cập nhật UI thành công (Success)
        document.getElementById('resCity').textContent = city.toUpperCase();
        document.getElementById('resTemp').textContent = data.current_condition[0].temp_C + "°C";
        document.getElementById('resHumidity').textContent = data.current_condition[0].humidity;
        document.getElementById('resDesc').textContent = data.current_condition[0].lang_vi?.[0]?.value || data.current_condition[0].weatherDesc[0].value;
        
        infoBox.classList.remove('hidden');
        updateHistory(city);
    } catch (err) {
        // Trạng thái Lỗi (Error)
        errorState.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

function updateHistory(city) {
    const formattedCity = city.trim().toLowerCase();
    history = history.filter(c => c.toLowerCase() !== formattedCity);
    history.unshift(city);
    if (history.length > 5) history.pop();
    localStorage.setItem('weather_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const box = document.getElementById('historyList');
    box.innerHTML = '';
    history.forEach(city => {
        const span = document.createElement('span');
        span.className = 'history-tag';
        span.textContent = city;
        span.addEventListener('click', () => {
            document.getElementById('cityInput').value = city;
            fetchWeather(city);
        });
        box.appendChild(span);
    });
}

document.getElementById('searchBtn').addEventListener('click', () => {
    fetchWeather(document.getElementById('cityInput').value);
});

renderHistory();