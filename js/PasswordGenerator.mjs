export function addPasswordGeneratorFunctionality() {

    const passwordInput = document.getElementById("password")
    const generateNewPasswordButton = document.getElementById("generate-new-password-button")
    const numberOfCharactersInput = document.getElementById("number-of-characters")
    const possibleCharactersTextarea = document.getElementById("possible-characters")
    const copyPasswordButton = document.getElementById("copy-password")

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

    // Trigger password generation immediately upon page load by simulating click of generate password button
    generateNewPasswordButton.dispatchEvent(new Event('click'))

    // Add copy functionality to copy button
    async function copyToClipboard(text) {

        const type = "text/plain"
        const blob = new Blob([text], { type })
        const data = [new ClipboardItem({ [type]: blob })]

        await navigator.clipboard.write(data)
        
    }
    
    copyPasswordButton.addEventListener('click', e => copyToClipboard(passwordInput.value))

    

}
