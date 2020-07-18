/* global $, localStorage, Shell */

const errors = {
  noWriteAccess: 'Error: you do not have write access to this folder',
  fileNotFound: 'Error: file or folder not found in current directory',
  fileNotSpecified: 'Error: you did not specify a file or filder'
}

const struct = {
  home: ['about', 'blog', 'cv', 'contact'],
  about: ['experience', 'interests', 'past-projects', 'skills']
}

const commands = {}
let systemData = {}
const homePath = 'jackdolgin/home'

const getDirectory = () => localStorage.directory
const setDirectory = (dir) => { localStorage.directory = dir }

// turn on fullscreen
const registerFullscreenToggle = () => {
  $('.button.green').click(() => {
    $('.terminal-window').toggleClass('fullscreen')
  })
}

// create new folder in current folder
commands.mkdir = () => errors.noWriteAccess

// create new folder in current folder
commands.touch = () => errors.noWriteAccess

// remove file from current folder
commands.rm = () => errors.noWriteAccess

// view contents of specified folder
commands.ls = (folder) => {
  if (folder === '..' || folder === '~') {
    return systemData['home']
  }
  return systemData[getDirectory()]
}

// view list of possible commands
commands.start = () => {
    setDirectory('home')
    return systemData.start
}

commands.home = () => {
    setDirectory('home')
    return systemData.home
}

// display current path
commands.path = () => {
  const dir = getDirectory()
  return dir === 'home' ? homePath : `${homePath}/${dir}`
}

// see command history
commands.history = () => {
  let history = localStorage.history
  history = history ? Object.values(JSON.parse(history)) : []
  return `<p>${history.join('<br>')}</p>`
}

// move into specified folder
commands.view = (name) => {
    if (!name) return errors.fileNotSpecified
    const dir = getDirectory()
    const dirs = Object.keys(struct)
    const nameKey = name.split('.')
    const newDir = name ? name.trim() : ''

    if (nameKey[0] in systemData && struct[dir].includes(nameKey[0]) && nameKey.pop() === 'txt') {
        return systemData[nameKey[0]]
  } else if (dirs.includes(newDir) && dir !== newDir) {
      setDirectory(newDir)
      return systemData[newDir]
  }
  return errors.fileNotFound
}

// initialize cli
$(() => {
  registerFullscreenToggle()
  const cmd = document.getElementById('terminal')
  const terminal = new Shell(cmd, commands)

  $.ajaxSetup({ cache: false })
  $.get('js/system_data.json', (data) => {
    systemData = data
  })
})
