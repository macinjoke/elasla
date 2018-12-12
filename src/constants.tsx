interface Config {
  elasticsearch: {
    host: string
    port: string
  }
}

declare const CONFIG: Config

const _CONFIG = CONFIG

export { _CONFIG as CONFIG }
