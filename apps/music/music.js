// ==================== DOM Elements ====================
const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPause');
const progressFill = document.querySelector('.progress-fill');
const timeCurrent = document.querySelector('.time-current');
const timeTotal = document.querySelector('.time-total');
const nowPlayingTitle = document.querySelector('.now-playing-title');
const nowPlayingArtist = document.querySelector('.now-playing-artist');
const nowPlayingCover = document.querySelector('.now-playing-cover');

let allSongs = [];
let currentTrackIndex = 0;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function loadTrack(track, coverImg = null) {
    audio.src = track.file;
    nowPlayingTitle.textContent = track.title;
    nowPlayingArtist.textContent = track.artist;
    timeTotal.textContent = track.duration;
    if (coverImg) {
        nowPlayingCover.innerHTML = `<img src="${coverImg}" alt="Album Cover" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">`;
    } else {
        nowPlayingCover.innerHTML = '<span class="now-playing-emoji">🎵</span>';
    }
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
}


audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
        timeCurrent.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
    playPauseBtn.textContent = '▶️';
    if (currentTrackIndex < allSongs.length - 1) {
        currentTrackIndex++;
        loadTrack(allSongs[currentTrackIndex].song, allSongs[currentTrackIndex].cover);
        audio.play();
        playPauseBtn.textContent = '⏸️';
    }
});


playPauseBtn.addEventListener('click', togglePlay);



document.querySelectorAll('.album-card').forEach(card => {
    const songData = JSON.parse(card.getAttribute('data-song'));
    const coverImg = card.querySelector('img').src;
    allSongs.push({ song: songData, cover: coverImg });
    
    card.addEventListener('click', () => {
        const index = allSongs.findIndex(item => item.song.file === songData.file);
        currentTrackIndex = index;
        loadTrack(songData, coverImg);
        audio.play();
        playPauseBtn.textContent = '⏸️';
    });
});


document.querySelectorAll('.recent-card').forEach(card => {
    const songData = JSON.parse(card.getAttribute('data-song'));
    const coverImg = card.querySelector('img').src;
    allSongs.push({ song: songData, cover: coverImg });
    
    card.addEventListener('click', () => {
        const index = allSongs.findIndex(item => item.song.file === songData.file);
        currentTrackIndex = index;
        loadTrack(songData, coverImg);
        audio.play();
        playPauseBtn.textContent = '⏸️';
    });
});


document.getElementById('prev').addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
        loadTrack(allSongs[currentTrackIndex].song, allSongs[currentTrackIndex].cover);
        audio.play();
        playPauseBtn.textContent = '⏸️';
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (currentTrackIndex < allSongs.length - 1) {
        currentTrackIndex++;
        loadTrack(allSongs[currentTrackIndex].song, allSongs[currentTrackIndex].cover);
        audio.play();
        playPauseBtn.textContent = '⏸️';
    }
});

document.querySelector('.volume-slider').addEventListener('click', (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    audio.volume = Math.max(0, Math.min(1, percent));
    document.querySelector('.volume-fill').style.width = (percent * 100) + '%';
});