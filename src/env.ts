declare global {
    interface Window {
      env: any
    }
}
  
type EnvType = {
    REACT_APP_TODAY: string,
    REACT_APP_PROGRAM_PATH: string,
}

export const env: EnvType = { ...process.env, ...window.env }