import { dirname, resolve } from 'path'
export const walkUp = function* (path: string) {
  for (path = resolve(path); path;) {
    yield path
    const pp = dirname(path)
    if (pp === path) {
      break
    } else {
      path = pp
    }
  }
}
