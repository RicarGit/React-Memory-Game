declare module 'styled-components' {
  export interface DefaultTheme {
    light: {
      buttonBg: '#1550FF',
      buttonLabel: '#fff',
      infoLabel: '#6A7D8B',
      infoValue: '#101C40',
      background: '#fff',
      boxShadow: 'none',
      frontBorder: '4px solid #1550FF',
      backBorder: '3px solid #101C40',
      alignCenter: 'none'
    },
    dark: {
      buttonBg: '#000',
      buttonLabel: 'lightskyblue',
      infoLabel: 'lightskyblue',
      infoValue: 'lightskyblue',
      background: '#000',
      boxShadow: 'inset 0 0 24px lightskyblue',
      frontBorder: 'none',
      backBorder: 'none',
      alignCenter: 'center'
    }
  }
}

export { }