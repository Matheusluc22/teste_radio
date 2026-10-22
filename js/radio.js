/**
 * UniFit - Módulo de Rádio Online
 * Integração com a API Radio Browser para streaming de estações ao vivo
 */

const RADIO_DEFAULT_LOGO = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><rect width="64" height="64" rx="10" fill="%231e293b"/><circle cx="32" cy="32" r="18" fill="none" stroke="%234ade80" stroke-width="3"/><circle cx="32" cy="32" r="6" fill="%234ade80"/><path d="M18 18 L24 24 M46 18 L40 24" stroke="%234ade80" stroke-width="2.5" stroke-linecap="round"/></svg>';

let allLoadedStations = [];
let currentStationName = '';

// Busca servidores ativos da API de maneira dinâmica com timeout e fallback rápido
async function getRadioBrowserServer() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);

        const response = await fetch('https://all.api.radio-browser.info/json/servers', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const servers = await response.json();
            if (servers && servers.length > 0) {
                return `https://${servers[0].name}`;
            }
        }
    } catch (e) {
        console.warn("Não foi possível listar servidores dinamicamente, usando fallback estável.", e);
    }
    // Fallback estável de alta velocidade
    return 'https://de1.api.radio-browser.info';
}

// Função principal para buscar rádios da API
async function fetchRadios(country) {
    const radioContainer = document.getElementById('radioContainer');
    if (!radioContainer) return;

    radioContainer.innerHTML = `
        <div class="radio-loading-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 2.2rem; color: #4ADE80; margin-bottom: 0.8rem;"></i>
            <p style="color: #9CA3AF; font-size: 1.05rem;">Carregando estações de ${country}...</p>
        </div>
    `;
    
    try {
        const baseServer = await getRadioBrowserServer();
        // Limitado a 36 rádios ordenadas por popularidade/votos
        const url = `${baseServer}/json/stations/bycountry/${encodeURIComponent(country)}?limit=36&order=votes&reverse=true`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Resposta da API não foi bem-sucedida");
        const stations = await response.json();
        
        allLoadedStations = stations || [];
        renderRadios(allLoadedStations);
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        radioContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.2rem; color: #ef4444; margin-bottom: 0.75rem;"></i>
                <p style="color: #ef4444; font-size: 1.1rem; font-weight: 600;">Erro ao carregar as estações.</p>
                <p style="color: #9CA3AF; font-size: 0.95rem; margin-top: 0.35rem;">Tente trocar de país no seletor ou clique para recarregar.</p>
                <button class="btn btn-secondary btn-sm" style="margin-top: 1rem;" onclick="fetchRadios('${country}')">
                    <i class="fa-solid fa-rotate-right"></i> Tentar Novamente
                </button>
            </div>
        `;
    }
}

// Função para renderizar as estações na tela
function renderRadios(stations) {
    const radioContainer = document.getElementById('radioContainer');
    if (!radioContainer) return;

    radioContainer.innerHTML = '';
    
    if (!stations || stations.length === 0) {
        radioContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #9CA3AF;">
                <i class="fa-solid fa-radio" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.4;"></i>
                <p style="font-size: 1.1rem; color: #FFFFFF; font-weight: 600;">Nenhuma estação encontrada.</p>
                <p style="font-size: 0.9rem; margin-top: 0.25rem;">Tente buscar outro termo ou escolher outro país.</p>
            </div>
        `;
        return;
    }

    stations.forEach(station => {
        const logo = (station.favicon && station.favicon.trim().startsWith('http')) 
            ? station.favicon 
            : RADIO_DEFAULT_LOGO;

        const card = document.createElement('div');
        const isCurrentPlaying = (currentStationName && currentStationName === station.name);
        card.className = `radio-card ${isCurrentPlaying ? 'playing' : ''}`;
        card.setAttribute('data-name', (station.name || '').toLowerCase());
        card.setAttribute('data-tags', (station.tags || '').toLowerCase());
        
        const tagsFormatted = station.tags 
            ? station.tags.split(',').slice(0, 2).map(t => t.trim()).filter(Boolean).join(', ') 
            : 'Geral';

        card.innerHTML = `
            <div class="radio-card-img-wrap">
                <img src="${logo}" onerror="this.onerror=null; this.src='${RADIO_DEFAULT_LOGO}';" alt="Logo">
            </div>
            <div class="radio-card-body">
                <div class="radio-name" title="${station.name || 'Rádio'}">${station.name || 'Estação sem nome'}</div>
                <div class="radio-tags" title="${tagsFormatted}">${tagsFormatted}</div>
            </div>
            <div class="radio-play-indicator" title="Ouvir agora">
                <i class="fa-solid ${isCurrentPlaying ? 'fa-volume-high' : 'fa-play'}"></i>
            </div>
        `;
        
        card.addEventListener('click', () => {
            playRadio(station.url_resolved || station.url, station.name, card);
        });
        
        radioContainer.appendChild(card);
    });
}

// Função para carregar o áudio no player
function playRadio(streamUrl, stationName, cardElement = null) {
    if (!streamUrl) {
        if (window.showUniFitToast) {
            window.showUniFitToast(`Esta rádio não possui link de transmissão ativo.`, 'warning');
        } else {
            alert(`Esta rádio não possui link de transmissão ativo.`);
        }
        return;
    }

    // AJUSTE: Converte o link do streaming individual para HTTPS em tempo de execução
    if (window.location.protocol === 'https:' && streamUrl.startsWith('http://')) {
        streamUrl = streamUrl.replace('http://', 'https://');
    }

    const audioPlayer = document.getElementById('audioPlayer');
    const playerInfo = document.getElementById('playerInfo');
    const playerIconPulse = document.getElementById('playerIconPulse');
    const playerBar = document.getElementById('radioPlayerBar');

    if (!audioPlayer) return;

    currentStationName = stationName;
    audioPlayer.src = streamUrl;
    
    if (playerInfo) {
        playerInfo.textContent = `Tocando agora: ${stationName}`;
        playerInfo.setAttribute('title', stationName);
    }

    if (playerBar) {
        playerBar.classList.add('active');
    }

    // Atualiza estado visual dos cards
    document.querySelectorAll('.radio-card').forEach(c => {
        c.classList.remove('playing');
        const icon = c.querySelector('.radio-play-indicator i');
        if (icon) {
            icon.className = 'fa-solid fa-play';
        }
    });

    if (cardElement) {
        cardElement.classList.add('playing');
        const activeIcon = cardElement.querySelector('.radio-play-indicator i');
        if (activeIcon) activeIcon.className = 'fa-solid fa-volume-high';
    }

    // Tenta reprodução
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            if (playerIconPulse) playerIconPulse.classList.add('playing');
            if (window.showUniFitToast) {
                window.showUniFitToast(`Sintonizado em: ${stationName} 📻`, 'green');
            }
        }).catch(error => {
            if (playerIconPulse) playerIconPulse.classList.remove('playing');
            console.error("Erro de reprodução:", error);
            
            const msg = `Não foi possível reproduzir "${stationName}".\n\nIsso ocorre porque o servidor desta rádio específica está fora do ar ou não aceita conexões criptografadas HTTPS no streaming dela.`;
            if (window.showUniFitToast) {
                window.showUniFitToast(`Não foi possível reproduzir "${stationName}". Servidor offline ou restrição HTTPS.`, 'warning');
            } else {
                alert(msg);
            }
        });
    }
}

// Parar rádio
function stopRadioPlayer() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playerInfo = document.getElementById('playerInfo');
    const playerIconPulse = document.getElementById('playerIconPulse');

    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.removeAttribute('src');
    }

    currentStationName = '';
    if (playerInfo) playerInfo.textContent = 'Nenhuma rádio tocando';
    if (playerIconPulse) playerIconPulse.classList.remove('playing');

    document.querySelectorAll('.radio-card').forEach(c => {
        c.classList.remove('playing');
        const icon = c.querySelector('.radio-play-indicator i');
        if (icon) icon.className = 'fa-solid fa-play';
    });

    if (window.showUniFitToast) {
        window.showUniFitToast('Rádio pausada', 'info');
    }
}

// Filtro rápido de busca por texto na lista carregada
function filterLocalRadios() {
    const searchInput = document.getElementById('radioSearchInput');
    if (!searchInput) return;

    const term = searchInput.value.trim().toLowerCase();
    if (!term) {
        renderRadios(allLoadedStations);
        return;
    }

    const filtered = allLoadedStations.filter(st => {
        const name = (st.name || '').toLowerCase();
        const tags = (st.tags || '').toLowerCase();
        return name.includes(term) || tags.includes(term);
    });

    renderRadios(filtered);
}

// Filtro rápido por botões de tag
function filterByRadioTag(tag) {
    // Atualiza estado ativo dos botões
    document.querySelectorAll('.radio-tag-btn').forEach(btn => {
        if ((!tag && btn.textContent.trim().toLowerCase() === 'todas') || 
            (tag && btn.textContent.trim().toLowerCase().includes(tag))) {
            btn.classList.add('active');
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-primary');
        } else {
            btn.classList.remove('active');
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
        }
    });

    const searchInput = document.getElementById('radioSearchInput');
    if (searchInput) searchInput.value = '';

    if (!tag) {
        renderRadios(allLoadedStations);
        return;
    }

    const filtered = allLoadedStations.filter(st => {
        const tags = (st.tags || '').toLowerCase();
        return tags.includes(tag.toLowerCase());
    });

    renderRadios(filtered);
}

// Inicialização de eventos
function initRadioModule() {
    const countrySelect = document.getElementById('countrySelect');
    const audioPlayer = document.getElementById('audioPlayer');
    const playerIconPulse = document.getElementById('playerIconPulse');

    if (countrySelect && !countrySelect.dataset.initialized) {
        countrySelect.dataset.initialized = "true";
        countrySelect.addEventListener('change', (e) => {
            fetchRadios(e.target.value);
        });
    }

    if (audioPlayer && !audioPlayer.dataset.initialized) {
        audioPlayer.dataset.initialized = "true";
        audioPlayer.addEventListener('play', () => {
            if (playerIconPulse) playerIconPulse.classList.add('playing');
        });
        audioPlayer.addEventListener('pause', () => {
            if (playerIconPulse) playerIconPulse.classList.remove('playing');
        });
    }

    if (allLoadedStations.length === 0) {
        fetchRadios(countrySelect ? countrySelect.value : 'Brazil');
    }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initRadioModule, 100);
} else {
    document.addEventListener('DOMContentLoaded', initRadioModule);
}

// Exporta globalmente para compatibilidade total
window.getRadioBrowserServer = getRadioBrowserServer;
window.fetchRadios = fetchRadios;
window.renderRadios = renderRadios;
window.playRadio = playRadio;
window.stopRadioPlayer = stopRadioPlayer;
window.filterLocalRadios = filterLocalRadios;
window.filterByRadioTag = filterByRadioTag;
window.initRadioModule = initRadioModule;
