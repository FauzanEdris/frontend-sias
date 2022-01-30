import Vue from 'vue'

export default function () {
  Vue.filter('excerpt', (text, length, clamp) => {
    console.log(length)
    return text.length > length ? text.slice(0, length) + clamp : text
  })
}
