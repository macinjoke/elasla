interface Config {
  elasticsearch: {
    host: string
    port: string
  }
  slack: {
    workspace: string
  }
}

declare const CONFIG: Config

const _CONFIG = CONFIG

export { _CONFIG as CONFIG }
