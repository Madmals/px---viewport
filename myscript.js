
const pxvh = document.querySelector('#pxvh'),
  pxvw = document.querySelector('#pxvw'),
  vxpx = document.querySelector('#vhpx'),
  vwpx = document.querySelector('#vwpx')


chrome.tabs.query({ active: true }, (tabs) => {
  chrome.scripting.executeScript(
    {

      target: { tabId: tabs[0].id },
      function: runMessage

    })
})


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

const convertPxvh = (val) => ((100 * val) / message.window_height),
convertPxvw = (val) => ((100 * val) / message.window_width),
convertvhPx = (val) => ((message.window_height * val) / 100),
convertvwPx = (val) => ((message.window_width * val) / 100)

  pxvh.addEventListener('keypress', () => {
    setTimeout(() => {
      document.querySelector('.vha').textContent = convertPxvh(pxvh.value).toFixed(2)
    }, 200)
  })

  pxvw.addEventListener('keypress', () => {
    setTimeout(() => {
      document.querySelector('.vwb').textContent = convertPxvw(pxvw.value).toFixed(2)
    }, 200)
  })

  vxpx.addEventListener('keypress', () => {
    setTimeout(() => {
      document.querySelector('.pxa').textContent = convertvhPx(vxpx.value).toFixed(2)
    }, 200)
  })
  vwpx.addEventListener('keypress', () => {
    setTimeout(() => {
      document.querySelector('.pxb').textContent = convertvwPx(vwpx.value).toFixed(2)
    }, 200)
  })

})


const runMessage = () => {

  let a = window.innerHeight,
  b = window.innerWidth

  chrome.runtime.sendMessage({ method: 'set', window_height: a, window_width: b })

}

const allCopy = document.querySelectorAll('.clicker'),
  allInp = document.querySelectorAll('.con input'),
  allOut = document.querySelectorAll('.con p')

const allcop = [...allCopy],
  allinp = [...allInp],
  allout = [...allOut];


for (let i = 0; i < allCopy.length; i++) {
  allcop[i].addEventListener('click', async () => {
    console.log(allinp[i].value)


    let a = await navigator.clipboard.writeText(allout[i].textContent)
    // let b = await navigator.clipboard.readText(a)
    // console.log(b)

    // let content = allinp[i]
    // content.select();
    // document.execCommand("copy");



    allcop[i].textContent = 'Copied'


  })
}