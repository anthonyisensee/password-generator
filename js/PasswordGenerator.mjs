import { getMapOfCharactersFromString } from "./CharacterMapper.mjs"

export function addPasswordGeneratorFunctionality() {

    const passwordInput = document.getElementById("password")
    const generateNewPasswordButton = document.getElementById("generate-new-password-button")
    const numberOfCharactersInput = document.getElementById("number-of-characters")
    const possibleCharactersTextarea = document.getElementById("possible-characters")
    const copyPasswordButton = document.getElementById("copy-password")
    const togglePasswordVisibilityButton = document.getElementById("toggle-password-visibility")

    // Update the password value with visibility status in mind
    function updatePasswordValue(password) {

        // Always update data value
        passwordInput.dataset.value = password

        const hiddenPasswordCharacter = "•"

        // Hide the password if necessary
        if (togglePasswordVisibilityButton.dataset.checked === "true") {

            password = hiddenPasswordCharacter.repeat(password.length)

        }

        passwordInput.value = password

    }

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

        updatePasswordValue(password)

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
    
    // Enable functionality on copy to clipboard button
    copyPasswordButton.addEventListener('click', e => copyToClipboard(passwordInput.dataset.value))

    // Add functionality to the password visibility button
    togglePasswordVisibilityButton.addEventListener('click', e => {

        const isChecked = togglePasswordVisibilityButton.dataset.checked === "true"

        if (isChecked) {

            togglePasswordVisibilityButton.dataset.checked = false
            togglePasswordVisibilityButton.innerHTML = "Hide"

        } else {

            togglePasswordVisibilityButton.dataset.checked = true
            togglePasswordVisibilityButton.innerHTML = "Show"

        }

        updatePasswordValue(passwordInput.dataset.value)

    })    

}
