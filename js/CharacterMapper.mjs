export function getMapOfCharactersFromString(possibleCharactersString) {
    
    const characterMap = new Map()

    // Loop over all individual characters
    for (let i = 0; i < possibleCharactersString.length; i++) {

        // Simplify the reference to the individual character
        const character = possibleCharactersString[i]

        const characterInMap = characterMap.get(character) !== undefined
        if (!characterInMap) {
            
            // Add the character to the map
            characterMap.set(character, 1)
            
        } else {
            
            // Increment the number of references if it's already there
            const numberOfReferences = characterMap.get(character)
            characterMap.set(character, numberOfReferences + 1)

        }

    }

    return characterMap

}

