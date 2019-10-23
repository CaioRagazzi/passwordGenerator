// DOM elements

const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandonLower,
    upper: getRandonUpper,
    number: getRandonNumber,
    symbol: getRandonSymbol,
}

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumbers = numbersEl.checked
    const hasSymbols = symbolsEl.checked
    
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length)
})

clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea')
    const password = resultEl.innerText

    if (!password) {
        return
    }

    textArea.value = password
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    alert('Password copied to clipboard!')
})

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = ''

    const typesCount = lower + upper + number + symbol

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if (typesCount === 0) {
        return ''
    }

    for (let index = 0; index < length; index += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword    
}

//generator functions

function getRandonLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandonUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandonNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandonSymbol(){
    const symbols = '!@#$%^&*(){}=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
