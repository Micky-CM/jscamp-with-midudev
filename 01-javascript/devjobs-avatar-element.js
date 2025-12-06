class DevJobsAvatarElement extends HTMLElement {
  constructor() {
    super() // LLamar al constructor de HTMLElement

    this.attachShadow({ mode: 'open' }) // Crear shadow DOM
  }

  createAvatarURL(service, username) {
    return `https://unavatar.io/${service}/${username}`
  }

  render() {
    const service = this.getAttribute('service') ?? 'github'
    const username = this.getAttribute('username') ?? 'anonymous'
    const size = this.getAttribute('size') ?? '40'

    const url = this.createAvatarURL(service, username, size)

    this.shadowRoot.innerHTML = `
      <style>
        img {
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
        }
      </style>
      <img
        src="${url}"
        alt="Avatar de ${username}"
        class="avatar-image"
      />
    `
  }
  connectedCallback() {
    this.render()
  }
}

customElements.define('devjobs-avatar', DevJobsAvatarElement)