import * as Tone from "https://esm.run/tone";

let sampler = null;

function initSampler() {
    if (sampler) return sampler;

    Tone.Transport.bpm.value = 120;
    sampler = new Tone.Sampler({
        urls: {
            A1: "A1.mp3",
            A2: "A2.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/salamander/",
        onload: () => {
            console.log("Piano samples loaded!");
        }
    }).toDestination();

    return sampler;
}

window.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById("play-button");
    const clearButton = document.getElementById("clear-button");

    if (playButton) playButton.addEventListener("click", playNotes);
    if (clearButton) clearButton.addEventListener("click", clearNotes);
});

async function playNotes() {
    await Tone.start();
    
    const currentSampler = initSampler();

    if (!currentSampler.loaded) {
        console.warn("Piano is still loading, please wait...");
        return;
    }

    if (!window.activeNotes || window.activeNotes.length === 0) {
        console.warn("Žádné aktivní objekty not k přehrání.");
        return;
    }

    let currentTime = Tone.now();

    window.activeNotes.forEach(noteObj => {
        const duration = 4 / noteObj.noteLength;
        const durationValue = duration + "n";
        
        const newOctave = noteObj.octave + 3;
        const noteNameUpdated = noteObj.letter + newOctave;
        
        currentSampler.triggerAttackRelease(noteNameUpdated, durationValue, currentTime);
        currentTime += Tone.Time(durationValue).toSeconds();
    });
}

async function clearNotes() {
    const staffSvg = document.querySelector('svg.staff');
    const input = document.getElementById('note-input');
    
    if (staffSvg) {
        const oldNotes = staffSvg.querySelectorAll('.note-head');
        const lines = staffSvg.querySelectorAll('.lines');
        oldNotes.forEach(n => n.remove());
        lines.forEach(n => n.remove());
    }
    
    if (input) input.value = "";
    window.activeNotes = [];
    
    const url = new URL(window.location.href);
    url.searchParams.delete('song');
    history.pushState(null, '', url.toString());
}