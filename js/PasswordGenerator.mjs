export function addPasswordGeneratorFunctionality() {

    const passwordInput = document.getElementById("password")
    const generateNewPasswordButton = document.getElementById("generate-new-password-button")
    const numberOfCharactersInput = document.getElementById("number-of-characters")
    const possibleCharactersTextarea = document.getElementById("possible-characters")

    generateNewPasswordButton.addEventListener("click", e => {

        const possibleCharactersString = possibleCharactersTextarea.value
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

        const numberArray = new Uint16Array(numberOfCharactersInput.value)
        const randomNumbers = window.crypto.getRandomValues(numberArray)

        let password = ""

        for (let i = 0; i < numberArray.length; i++) {

            const randomCharacter = possibleCharactersString[numberArray[i] % characterMap.size]
            password += randomCharacter

        }

        passwordInput.value = password

    })

    generateNewPasswordButton.dispatchEvent(new Event('click'))

}
