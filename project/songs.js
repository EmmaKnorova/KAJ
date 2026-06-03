document.addEventListener('DOMContentLoaded', () => {
    const songButtons = document.querySelectorAll('.song-btn');

    songButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const songNotes = e.target.getAttribute('data-notes');
            
            if (songNotes) {
                const targetUrl = new URL('index.html', window.location.origin);
                targetUrl.searchParams.set('song', songNotes);
                window.location.href = targetUrl.toString();
            }
        });
    });
});