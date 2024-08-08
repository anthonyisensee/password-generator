import { getMapOfCharactersFromString } from "./CharacterMapper.mjs"

export function addPasswordGeneratorFunctionality() {

    const passwordInput = document.getElementById("password")
    const generateNewPasswordButton = document.getElementById("generate-new-password-button")
    const numberOfCharactersInput = document.getElementById("number-of-characters")
    const possibleCharactersTextarea = document.getElementById("possible-characters")
    const copyPasswordButton = document.getElementById("copy-password")

    generateNewPasswordButton.addEventListener("click", e => {

        const possibleCharactersString = possibleCharactersTextarea.value
        const characterMap = getMapOfCharactersFromString(possibleCharactersString)

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
