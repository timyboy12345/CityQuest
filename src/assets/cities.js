export const cities = [{
    "id": "eindhoven",
    "name": "Eindhoven",
    "description": "De stad van het licht, Philips en PSV. Ga op avontuur met professor Frits en ontdek alles over de lichtstad.",
    "image": "https://www.thisiseindhoven.com/getmedia/55de9618-0f86-4896-bf06-f24daca594a5/zomer-Radegast-terras-Max-Kneefel-(2).JPG?width=966&resizemode=force",
    "steps": [
        {
            "id": 0,
            "type": "text",
            "title": "Je eerste wandeling",
            "content": "Je gaat de eerste stappen zetten! Zometeen begin je een wandeling door Eindhoven om inspiratie op te doen voor jullie volgende uitvinding. Onderweg moet je puzzels oplossen, vragen beantwoorden en goed navigeren. Wanneer je in de buurt bent van een checkpoint krijg je vanzelf de volgende uitdaging te zien. Zodra je de uitdaging hebt voltooid kan je naar de volgende checkpoint. Als je alle uitdagingen hebt voltooid wordt je naar het eindpunt genavigeerd, een gezellige plek in het centrum waar je de dag nog op een leuke manier kan afsluiten.\n### Heb je een probleem?\nBij een probleem kan je altijd contact opnemen met de contact-knop die je op je scherm ziet. Je kan ook altijd om hints vragen via dezelfde knop."
        },
        {
            "id": 1,
            "type": "text",
            "title": "Welkom in Eindhoven",
            "content": "Dit is Eindhoven, de stad van het licht, inventiviteit en creativiteit. Jullie barsten van de ideeen en zijn in Eindhoven aangekomen om inspiratie op te doen voor een nieuwe uitvinding, want waar kan dit nu beter dan in Eindhoven? Het is tevens de stad van de creativiteit, met evenementen als Dutch Design week, Glow en de Maker Days.\n### Jouw aankomst bij \"De Radio\"\nJe bent zojuist aangekomen op Eindhoven Centraal, het drukste treinstation van Noord-Brabant, waar dagelijks meer dan 65.000 mensen in- en uitstappen en 40% van de reizigers aankomt per fiets.\n\nEen veelgehoord \"weetje\" is dat het gebouw gebaseerd is op een Philips-radio (de Box15U), maar wat veel mensen niet weten is dat deze radio ontworpen is 4 jaar na de bouw van het station. Het station zou zelfs als inspiratiebron zijn gebruikt van de radio, het verhaal zit dus andersom in elkaar! Je kan het gebouw dus nog steeds gerust \"De Radio\" noemen.\n\nOm inspiratie op te doen voor jullie uitvinding gaan we makkelijk beginnen, we gaan naar het Philips Museum, dé plek waar je meer te weten kan komen over dit belangrijke bedrijf in de Eindhovense geschiedenis."
        },
        {
            "id": 2,
            "type": "location",
            "target": {
                type: "circle",
                radius: 10,
                lat: 51.43936641524416,
                lng: 5.475545308378065,
            }
        },
        {
            "id": 3,
            "type": "text",
            "title": "Het Philipsmuseum",
            "content": "Welkom bij The Blob. Een grote, ronde verschijning in de binnenstad van Eindhoven. Er hebben meerdere winkels in gehuisd, maar het uiterlijk is altijd hetzelfde gebleven. Tijdens Glow zie je hier af en toe de mooiste projecties, je kon er ooit een drankje doen en kan er altijd al kleding kopen."
        }
    ]
},
    {
        "id": "veldhoven",
        "name": "Veldhoven",
        "description": "Ga in dit interactieve avontuur op pad door Veldhoven, ",
        "image": "https://rijnboutt.nl/wp-content/uploads/2023/03/Citycentrum-Veldhoven-Rijnboutt.jpg",
        "steps": [
            {
                "id": 0,
                "type": "text",
                "title": "Je eerste wandeling",
                "content": "..."
            },
            {
                "id": 1,
                "type": "text",
                "title": "Welkom in Veldhoven",
                "content": "..."
            },
            {
                "id": 2,
                "type": "location",
                "radius": 20,
                "target": {
                    type: "poly",
                    points: [
                        {
                            lat: 51.42959735450574,
                            lng: 5.400552342224122
                        },
                        {
                            lat: 51.42959735450574,
                            lng: 5.399329662322999
                        },
                        {
                            lat: 51.42906265942788,
                            lng: 5.399377942085267
                        },
                        {
                            lat: 51.42906265942788,
                            lng: 5.400552342224122
                        }
                    ]
                }
            },
            {
                "id": 3,
                "type": "question",
                "title": "De ronde van Veldhoven",
                "content": "Veldhoven is al meer dan 100 jaar oud, in 2021 is zelfs het 100-jarig jubileum gevierd. Maar wanneer is Veldhoven precies gesticht?",
                hints: [{
                    content: "Reken 100 jaar terug vanaf 2021, in welk jaar is Veldhoven dan gesticht?"
                }],
                questions: [
                    {
                        text: "1 mei 1921",
                        right: true,
                    },
                    {
                        text: "30 april 1920",
                        right: false,
                        explanation: "Als Veldhoven zou zijn opgericht in 1920 zou het jubileum in 2020 hebben plaatsgevonden"
                    },
                    {
                        text: "25 februari 1921",
                        right: false,
                        explanation: "Veldhoven is iets later dit jaar opgericht"
                    },
                    {
                        text: "8 september 1922",
                        right: false,
                        explanation: "Als Veldhoven zou zijn opgericht in 1922 zou het jubileum in 2022 hebben plaatsgevonden"
                    }
                ]
            },
            {
                id: 4,
                type: "text",
                title: "Het 100-jarig plantsoen",
                content: "Helemaal goed! Veldhoven is opgericht in "
            }
        ]
    },
    {
        "id": "utrecht",
        "name": "Utrecht",
        "description": "Ontdek het geheim van de Domstad! Reis door de eeuwenoude stad Utrecht en ontrafel een eeuwenoud mysterie dat verborgen ligt onder de Domtoren.",
        image: "https://static1.squarespace.com/static/62091b41ab8403213f45ce37/62091d650184b53a6288c113/621796128818726cf41bef38/1678440267186/Utrecht+canal.jpg?format=1500w",
        "steps": [
            {
                "id": 0,
                "type": "text",
                "title": "Je eerste wandeling",
                "content": "Je gaat de eerste stappen zetten! Zometeen begin je een wandeling door Utrecht om een eeuwenoud geheim van de Domtoren te onthullen. Onderweg moet je puzzels oplossen, vragen beantwoorden en goed navigeren. Wanneer je in de buurt bent van een checkpoint krijg je vanzelf de volgende uitdaging te zien. Zodra je de uitdaging hebt voltooid kan je naar de volgende checkpoint. Als je alle uitdagingen hebt voltooid wordt je naar het eindpunt genavigeerd, een gezellige plek in het centrum waar je de dag nog op een leuke manier kan afsluiten.\n### Heb je een probleem?\nBij een probleem kan je altijd contact opnemen met de contact-knop die je op je scherm ziet. Je kan ook altijd om hints vragen via dezelfde knop."
            },
            {
                "id": 1,
                "type": "text",
                "title": "De Eerste Clue: Domplein",
                "content": "Je begint je avontuur op het beroemde Domplein. Onder dit plein liggen de overblijfselen van de oude Romeinse stad. Zoek naar een verborgen inscriptie die je naar de volgende aanwijzing zal leiden."
            },
            {
                "id": 2,
                "type": "text",
                "title": "De Grachten en de Oudegracht",
                "content": "Verken de grachten van Utrecht, waaronder de beroemde Oudegracht. In een van de kelders langs de gracht liggen verloren kronieken die je verder helpen met het ontsluieren van het mysterie."
            },
            {
                "id": 3,
                "type": "text",
                "title": "Het Academiegebouw en de Drift",
                "content": "Op deze historische plekken ontdek je oude geschriften die een verbinding leggen tussen de universiteit en het geheim van de Domtoren. Zoek in de archieven naar aanwijzingen."
            },
            {
                "id": 4,
                "type": "text",
                "title": "De Utrechtse Kerken",
                "content": "Bezoek de Janskerk en de Pieterskerk. In deze oude kerken zijn aanwijzingen te vinden die je naar een verborgen sleutel leiden. Deze sleutel opent een verborgen kamer in de Domtoren."
            },
            {
                "id": 4,
                "type": "text",
                "title": "Het Geheim van de Domtoren",
                "content": "Je hebt nu genoeg aanwijzingen verzameld. Ontgrendel de verborgen kamer in de Domtoren en ontrafel het eeuwenoude geheim dat Utrecht heeft beschermd."
            }
        ]
    }

]
