export const BASE_DATE = new Date('2022-11-18T18:00:00')
export const SPELL = 'Juro solemnemente que mis intenciones no son buenas'
export const NAME_LEFT = 'Kevin'
export const NAME_RIGHT = 'Anabella'

export const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/̀-ͯ/g, '')
    .replace(new RegExp('[\\u0300-\\u036f]', 'g'), '')
    .trim()
    .replace(/\s+/g, ' ')
