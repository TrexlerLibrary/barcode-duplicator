var $  = function (sel) { return document.querySelector(sel)    }

var form = $('.barcode-form')
var barcode = $('#barcode')
var copies = $('#copies')
var clear = $('.clear')
var barcodeTarget = $('.barcode-target')

form.addEventListener('submit', function (ev) {
  ev.preventDefault()

  if (!barcode.value) return

  var c = parseInt(copies.value, 10) || 1
  var i = 0

  clearChildren(barcodeTarget)
  while (c --> 0) barcodeTarget.appendChild(generateBarcode(barcode.value))

  barcode.value = ''
})

clear.addEventListener('click', function (ev) {
  ev.preventDefault()

  form.reset()
  clearChildren(barcodeTarget)
})

function clearChildren (el) {
  while (el.firstChild) el.removeChild(el.firstChild)
}

function generateBarcode (b) {
  var wrapper = document.createElement('div')
  wrapper.className = 'barcode-wrapper'

  var bc = DrawHTMLBarcode_Code39(
    b,        // data
    0,        // checkDigit
    'yes',    // humanReadable
    'in',     // units
    0,        // minBarWidth
    3,        // width
    .35,      // height
    3,        // barWidthRatio
    'bottom', // textLocation
    'center', // textAlignment
    '',       // textStyle
    'black',  // foreColor
    'white'   // backColor
  )

  wrapper.innerHTML = bc

  // we need to get gnar b/c the DrawHTMLBarcode_Code39 output is text + not html
  wrapper.firstChild.lastChild.textContent = wrapper.firstChild.lastChild.textContent.replace(/\*/g, '')

  return wrapper
}
