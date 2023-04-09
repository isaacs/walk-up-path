const {posix, win32} = require('path')
const path = {
  mode: posix,
  dirname: (...args) => path.mode.dirname(...args),
  resolve: (...args) => path.mode.resolve(...args),
}

const t = require('tap')
const { walkUp } = t.mock('../', {path})

t.test('posix', async t => {
  path.mode = posix
  t.strictSame([...walkUp('/some/kinda/path')], [
    '/some/kinda/path',
    '/some/kinda',
    '/some',
    '/',
  ])
  t.strictSame([...walkUp('/')], ['/'])
  t.strictSame([...walkUp('')], [...walkUp(process.cwd())])
})

t.test('win32', async t => {
  path.mode = win32
  t.strictSame([...walkUp('c:\\some\\kinda\\path')], [
    'c:\\some\\kinda\\path',
    'c:\\some\\kinda',
    'c:\\some',
    'c:\\',
  ])
  t.strictSame([...walkUp('c:/some/kinda/path')], [
    'c:\\some\\kinda\\path',
    'c:\\some\\kinda',
    'c:\\some',
    'c:\\',
  ])
  t.strictSame([...walkUp('/')], [path.resolve(process.cwd(), '/')])
  t.strictSame([...walkUp('')], [...walkUp(process.cwd())])
})
