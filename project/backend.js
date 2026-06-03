const noteMap = {
    'C1': 160, 'D1': 150, 'E1': 140, 'F1': 130,
    'G1': 120, 'A1': 110, 'B1': 100,
    'C2': 90, 'D2': 80, 'E2': 70, 'F2': 60,
    'G2': 50, 'A2': 40, 'B2': 30
};
const ledgerLines = ['C1', 'A2', 'B2'];
//global variable available for playNotes.js
window.activeNotes = [];

// basic class for all music elements inclucing notes, ledger lines and stems
class MusicalElement {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.svgNS = "http://www.w3.org/2000/svg";
        this.element = null; 
    }

    static clear(staffSvg) {
        if (staffSvg) {
            staffSvg.querySelectorAll('.musical-element').forEach(el => el.remove());
        }
    }

    remove() {
        if (this.element) this.element.remove();
    }
}

// separate class for music notes
class MusicalNote extends MusicalElement {
    constructor(noteString, x, y) {
        super(x, y);
        this.name = noteString.slice(0, 2); 
        this.letter = noteString.charAt(0).toUpperCase();
        this.octave = parseInt(noteString.charAt(1), 10);
        
        const lengthPart = noteString.slice(2).replace(/[()]/g, '');
        this.noteLength = parseInt(lengthPart, 10); 
        
        this.fullString = noteString;
    }

    render(staffSvg) {
        this.element = document.createElementNS(this.svgNS, 'circle');
        this.element.setAttribute('cx', this.x);
        this.element.setAttribute('cy', this.y);
        this.element.setAttribute('r', 10);
        this.element.setAttribute('stroke', 'black');
        this.element.setAttribute('stroke-width', '4');
        this.element.setAttribute('class', 'musical-element note-head');
        this.element.setAttribute('note-length', this.noteLength);
        this.element.setAttribute('note-name', this.name);
        this.element.setAttribute('fill', this.noteLength < 2 ? 'black' : 'none');

        staffSvg.appendChild(this.element);
    }
}

// for ledger lines and stems
class MusicalLine extends MusicalElement {
    constructor(x1, y1, x2, y2, specificClass) {
        super(x1, y1); 
        this.x2 = x2;
        this.y2 = y2;
        this.specificClass = specificClass; 
    }

    render(staffSvg) {
        this.element = document.createElementNS(this.svgNS, 'line');
        this.element.setAttribute('x1', this.x);
        this.element.setAttribute('y1', this.y);
        this.element.setAttribute('x2', this.x2);
        this.element.setAttribute('y2', this.y2);
        this.element.setAttribute('stroke', 'black');
        this.element.setAttribute('stroke-width', '4');
        this.element.setAttribute('class', `musical-element ${this.specificClass}`);

        staffSvg.appendChild(this.element);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('note-form');
    const input = document.getElementById('note-input');
    const staffSvg = document.querySelector('svg.staff');

    if (!input || !staffSvg) return;

    // using URL API
    const currentUrl = new URL(window.location.href);
    const songFromUrl = currentUrl.searchParams.get('song');

    if (songFromUrl) {
        input.value = songFromUrl;
        drawNotes(songFromUrl, staffSvg);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = input.value.trim();

            if (text) {
                drawNotes(text, staffSvg);
                updateHistoryURL(text);
            }
        });
    }
});

window.addEventListener('popstate', (e) => {
    const staffSvg = document.querySelector('svg.staff');
    const input = document.getElementById('note-input');
    if (!staffSvg) return;

    if (e.state && e.state.notes) {
        if (input) input.value = e.state.notes;
        drawNotes(e.state.notes, staffSvg);
    } else {
        if (input) input.value = "";
        MusicalElement.clear(staffSvg);
        window.activeNotes = [];
    }
});

// setting up History API
function updateHistoryURL(songString) {
    if (!songString) return;

    const url = new URL(window.location.href);
    url.searchParams.set('song', songString);

    history.pushState({ notes: songString }, '', url.toString());
}

function drawNotes(inputText, staffSvg) {
    MusicalElement.clear(staffSvg);
    window.activeNotes = [];

    const notesArray = inputText.toUpperCase().split(/\s+/);
    let currentX = 120; 

    notesArray.forEach(noteStr => {
        const yPos = noteMap[noteStr.slice(0, 2)];

        if (yPos !== undefined) {
            createNoteElement(staffSvg, currentX, yPos, noteStr);
            currentX += 50;
        }
    });
}

function createNoteElement(staffSvg, currentX, yPos, noteStr) {
    const musicalNote = new MusicalNote(noteStr, currentX, yPos);
    window.activeNotes.push(musicalNote);

    // creating the note stem for notes shorter than 4 beats
    // if note is lower than B1, the stem faces up, otherwise down
    if (musicalNote.noteLength < 4) {
        const up = yPos < 110;
        let x1, x2, y1, y2;
        if (!up) {
            x1 = currentX + 10; 
            x2 = currentX + 10; 
            y1 = yPos; 
            y2 = yPos - 70;
        } else {
            x1 = currentX - 10; 
            x2 = currentX - 10; 
            y1 = yPos; 
            y2 = yPos + 70;
        }
        const stem = new MusicalLine(x1, y1, x2, y2, 'lines');
        stem.render(staffSvg);
    }

    if (ledgerLines.includes(musicalNote.name)) {
        let y1 = yPos;
        let y2 = yPos;
        if (musicalNote.name == "B2") { 
            y1 = yPos + 10; 
            y2 = yPos + 10; 
        }
        const ledgerLine = new MusicalLine(currentX - 20, y1, currentX + 20, y2, 'lines');
        ledgerLine.render(staffSvg);
    }

    musicalNote.render(staffSvg);
}
