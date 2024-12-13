/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.glb' {
  const src: string
  export default src
}
