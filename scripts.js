
const appsOnDisplay = document.getElementById('appsDisplay');

// Show current time and date
function updateClock() {
    const now = new Date();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = days[now.getDay()];
    const dayOfMonth = now.getDate();
    const month = months[now.getMonth()];
    let hours = now.getHours();
    const minutes = now.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = String(minutes).padStart(2, '0');

    const formattedTime = `${dayOfWeek} ${dayOfMonth} ${month} ${hours}:${formattedMinutes} ${ampm}`;

    document.getElementById('display-time').textContent = formattedTime;
}
updateClock();
setInterval(updateClock, 1000);

const appsButtons = document.querySelectorAll('.appsButton');

appsButtons.forEach(button => {
    button.addEventListener('click',  function toggleIframe() {
        // Obtenemos el elemento iframe y el botón
        var iframeFinder = document.getElementById('appsShow');

        console.log(iframeFinder)
        if (iframeFinder) {
            appsOnDisplay.removeChild(iframeFinder);
        } else {

            const iframeFinder = document.createElement('iframe');

            iframeFinder.classList.add('iframeStyles');
            iframeFinder.setAttribute("id", "appsShow");

            iframeFinder.src = 'apps/cesar/apps.html'; // URL a mostrar
            iframeFinder.width = '100%'; // Ancho completo del div
            iframeFinder.height = '100%'; // Alto completo del div
            iframeFinder.frameBorder = '0'; // Sin borde
            iframeFinder.title = 'Apps';

            appsOnDisplay.appendChild(iframeFinder);

        }

    });
});

// For the terminal
const terminalButtons = document.querySelectorAll('.terminalButton');

terminalButtons.forEach(button => {
    button.addEventListener('click', function toggleIframe() {
        // Obtenemos el elemento iframe y el botón
        var iframeTerminal = document.getElementById('terminalShow');

        console.log(iframeTerminal)
        if (iframeTerminal) {
            appsOnDisplay.removeChild(iframeTerminal);
        } else {

            const iframeTerminal = document.createElement('iframe');

            iframeTerminal.classList.add('iframeStyles');
            iframeTerminal.setAttribute("id", "terminalShow");

            iframeTerminal.src = 'apps/cesar/terminal.html';
            iframeTerminal.width = '100%';
            iframeTerminal.height = '100%';
            iframeTerminal.frameBorder = '0';
            iframeTerminal.title = 'App Terminal';

            appsOnDisplay.appendChild(iframeTerminal);

        }

    });
})

// For the finder
const finderButtons = document.querySelectorAll('.finderButton');

finderButtons.forEach(button => {
    button.addEventListener('click', function toggleIframe() {
        // Obtenemos el elemento iframe y el botón
        var iframeTerminal = document.getElementById('finderShow');

        console.log(iframeTerminal)
        if (iframeTerminal) {
            appsOnDisplay.removeChild(iframeTerminal);
        } else {

            const iframeTerminal = document.createElement('iframe');

            iframeTerminal.classList.add('iframeStylesMax');
            iframeTerminal.setAttribute("id", "finderShow");

            iframeTerminal.src = 'apps/finder/finder.html';
            iframeTerminal.width = '100%';
            iframeTerminal.height = '100%';
            iframeTerminal.frameBorder = '0';
            iframeTerminal.title = 'App Finder';

            appsOnDisplay.appendChild(iframeTerminal);

        }

    });
})

// For the music
const musicButtons = document.querySelectorAll('.musicButton');

musicButtons.forEach(button => {
    button.addEventListener('click', function toggleIframe() {
        // Obtenemos el elemento iframe y el botón
        var iframeTerminal = document.getElementById('musicShow');

        console.log(iframeTerminal)
        if (iframeTerminal) {
            appsOnDisplay.removeChild(iframeTerminal);
        } else {

            const iframeTerminal = document.createElement('iframe');

            iframeTerminal.classList.add('iframeStylesMax');
            iframeTerminal.setAttribute("id", "musicShow");

            iframeTerminal.src = 'apps/music/music.html';
            iframeTerminal.width = '100%';
            iframeTerminal.height = '100%';
            iframeTerminal.frameBorder = '0';
            iframeTerminal.title = 'App Music';

            appsOnDisplay.appendChild(iframeTerminal);

        }

    });
})

