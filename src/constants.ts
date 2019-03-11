interface Config {
  backend: {
    host: string
    port: string
  }
  slack: {
    workspace: string
  }
  mail: {
    domain: string
  }
}

declare const CONFIG: Config

const _CONFIG = CONFIG

export { _CONFIG as CONFIG }
