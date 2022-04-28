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
  author: string
  authorUrl: string
  unsplashUrl: string
}
