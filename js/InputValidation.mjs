import { getMapOfCharactersFromString } from "./CharacterMapper.mjs"

export function addInputValidation() {

    const numberOfCharactersInput = document.getElementById("number-of-characters")
    const possibleCharactersTextarea = document.getElementById("possible-characters")
    const generateNewPasswordButton = document.getElementById("generate-new-password-button")


    function clearHelp(inputElement) {

        const helpContainer = inputElement.closest('div.field').querySelector('div.help')

        helpContainer.innerHTML = ""

    }

    function addHelp(inputElement, helpMessage, identifyingClass, bulmaStatusClass = "") {

        const helpContainer = inputElement.closest('div.field').querySelector('div.help')

        const alreadyExistingHelpElement = helpContainer.querySelector(`p.help.${identifyingClass}`)

        if (alreadyExistingHelpElement) {
            alreadyExistingHelpElement.remove()
        }

        helpContainer.innerHTML += `
            <p class="help ${identifyingClass} ${bulmaStatusClass}">${helpMessage}</p>
        `

    }

    function updateGenerateButtonStatus() {

        let everythingValid = true

        document.querySelectorAll("[data-is-valid]").forEach(el => {

            const validityStatus = el.dataset.isValid === "true"

            everythingValid = everythingValid && validityStatus

        })

        if (everythingValid) {

            console.log("Removing disabled attribute")

            generateNewPasswordButton.removeAttribute("disabled")
            
        } else {

            console.log("Adding disabled attribute")
            
            generateNewPasswordButton.setAttribute("disabled", "true")

        }

    }

    numberOfCharactersInput.addEventListener("input", e => {

        clearHelp(numberOfCharactersInput)

        let isValid = true

        if (new Number(numberOfCharactersInput.value) < new Number(numberOfCharactersInput.min)) {
            addHelp(numberOfCharactersInput, `Password must have at least ${numberOfCharactersInput.min} characters.`, "too-small", "is-danger")
            numberOfCharactersInput.classList.add("is-danger")
            isValid = false
        }

        if (new Number(numberOfCharactersInput.value) > new Number(numberOfCharactersInput.max)) {
            addHelp(numberOfCharactersInput, `Password must have at most ${numberOfCharactersInput.max} characters.`, "too-large", "is-danger")
            isValid = false
        }

        if (!numberOfCharactersInput.value.match("^[0-9]*$")) {

            addHelp(numberOfCharactersInput, `Number must be a whole, positive integer.`, "not-whole-positive-integer", "is-danger")
            isValid = false

        }

        isValid ? numberOfCharactersInput.classList.remove('is-danger') : numberOfCharactersInput.classList.add('is-danger')
        numberOfCharactersInput.dataset.isValid = isValid


        updateGenerateButtonStatus()

    })

    possibleCharactersTextarea.addEventListener("input", e => {

        clearHelp(possibleCharactersTextarea)

        const possibleCharactersMap = getMapOfCharactersFromString(possibleCharactersTextarea.value)

        console.log(possibleCharactersMap)

        const charactersOccurringMoreThanOnce = []

        possibleCharactersMap.forEach((value, key) => {
            
            if (value > 1) {
                
                charactersOccurringMoreThanOnce.push(key)
                
            }
            
        })

        if (charactersOccurringMoreThanOnce.length > 0) {
            
            let message = ""

            if (charactersOccurringMoreThanOnce.length === 1) {
                
                message = `The character ${charactersOccurringMoreThanOnce[0]} was `

            } else if (charactersOccurringMoreThanOnce.length === 2) {

                message = `The characters ${charactersOccurringMoreThanOnce[0]} and ${charactersOccurringMoreThanOnce[1]} were `

            } else {

                message = `The characters`

                for (let i = 0; i < charactersOccurringMoreThanOnce.length - 1; i++) {
                    message += ` ${charactersOccurringMoreThanOnce[i]},`
                }

                message += ` and ${charactersOccurringMoreThanOnce[charactersOccurringMoreThanOnce.length - 1]} were `

            }

            message += `included more than once. This will not increase any character's frequency.`

            addHelp(possibleCharactersTextarea, message, "character-frequency")

        }


    })

}