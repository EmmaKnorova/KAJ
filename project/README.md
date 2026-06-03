# Tone Piano

Webová aplikace pro psaní a přehrávání not v prohlížeči. Stačí zadat melodii jako text, aplikace ji sama vykreslí do notové osnovy a přehraje pomocí klavírního sampleru. 

Součástí je i samostatná knihovna, kde si člověk může vybrat z několika známých písniček, nechat si je načíst do editoru a rovnou si je poslechnout nebo upravit.

## Cíl projektu

Hlavním cílem bylo vytvořit jednoduchý, přehledný a interaktivní nástroj pro lidi, kteří si chtějí vizualizovat a poslechnout melodii bez nutnosti ovládat složité hudební programy.  

## Popis funkčnosti

Aplikace je rozdělena na dvě hlavní části:

1. Hlavní editor (index.html): Obsahuje textové pole, kam se píšou noty. Po odeslání formuláře skript text přechroustá a okamžitě vykreslí noty do osnovy. Pod osnovou jsou tlačítka pro přehrání celé sekvence nebo kompletní vyčištění plátna. Rozepsaná písnička se navíc průběžně ukládá do URL adresy, takže ji stačí zkopírovat a poslat dál pro sdílení.
2. Knihovna skladeb (songs.html): Nabízí seznam předpřipravených známých písniček (např. Prší prší nebo Happy Birthday). U každé skladby je integrovaný klasický audio přehrávač pro rychlý poslech a tlačítko, které celou melodii vezme, hodí ji zpět do hlavního editoru a automaticky ji tam vykreslí k další úpravě.

## Postup při vývoji


1. Návrh rozhraní a struktury: Vytvoření HTML kostry pro obě stránky a ostylování čistého layoutu (notová osnova, nápověda, tlačítka a menu).
2. Vytvoření SVG osnovy: Příprava základních pěti linek a houslového klíče pomocí vestavěných SVG prvků v HTML.
3. Objektová architektura (OOP) v JavaScriptu: Návrh tříd pro jednotlivé hudební prvky. Vytvořila se základní třída MusicalElement a z ní zděděné třídy MusicalNote (pro hlavičky not) a MusicalLine (pro nožičky not a pomocné linky pod/nad osnovou).
4. Parser textu a logika vykreslování: Naprogramování logiky, která vezme textový řetězec, pomocí regulárních výrazů z něj vytáhne tón, oktávu, délku noty a přepočítá tyto hodnoty na přesné X a Y souřadnice na plátně.
5. Zapojení audio enginu: Implementace knihovny Tone.js. Nastavení klavírního sampleru, spárování s lokálními MP3 vzorky a vyřešení časování, aby na sebe noty při přehrávání přesně navazovaly.
6. Historie a sdílení: Přidání History API pro ukládání stavu skladby do URL parametrů.

## Formát textového vstupu

Noty se zadávají jako řetězec oddělený mezerami v kombinaci: TónOktáva(Délka)

- Tón: C, D, E, F, G, A, B.
- Oktáva: 1 (nižší oktáva) nebo 2 (vyšší)
- Délka: Číslo v závorce určuje typ noty: 1 je celá, 2 je půlová a 4 je čtvrťová

Příklad vstupu: C1(4) E1(4) G1(2) A2(2)


