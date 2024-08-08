import { addInputValidation } from './InputValidation.mjs'
import { addPasswordGeneratorFunctionality } from './PasswordGenerator.mjs'

document.addEventListener("DOMContentLoaded", () => {

    addInputValidation()
    addPasswordGeneratorFunctionality()

})
