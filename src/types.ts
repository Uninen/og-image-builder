export interface Layer {
  id: number
  visible: boolean
  name: string
  html: string
  css: string
}

export interface BgStyle {
  background: string
  backgroundImage: string
  backgroundSize: string
}

export interface UnsplashImage {
  id: string
  author: string
  authorUrl: string
  unsplashUrl: string
  user: {
    name: string
    links: {
      html: string
    }
  }
  urls: {
    thumb: string
    raw: string
  }
  alt_description: string
  description: string
}
