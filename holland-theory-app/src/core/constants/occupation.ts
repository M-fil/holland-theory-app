export enum OccupationCategories {
  Realistic = 'Realistic',
  Investigative = 'Investigative',
  Artistic = 'Artistic',
  Social = 'Social',
  Enterprising = 'Enterprising',
  Conventional = 'Conventional',
}

// export const OccupationColors: {
//   [prop: string]: string,
// } = {
//   Realistic: '#1F77B4',
//   Investigative: '#FABC05',
//   Artistic: '#D62727',
//   Social: '#2AA02B',
//   Enterprising: '#EE81EE',
//   Conventional: '#BCBD21',
// }

export const getOccupationColors = (opacity: string | number): {
  [prop: string]: string,
} => ({
  Realistic: `rgba(31, 119, 180, ${opacity})`,
  Investigative: `rgba(250, 188, 5, ${opacity})`,
  Artistic: `rgba(214, 39, 39, ${opacity})`,
  Social: `rgba(42, 160, 43, ${opacity})`,
  Enterprising: `rgba(238, 129, 238, ${opacity})`,
  Conventional: `rgba(188, 189, 33, ${opacity})`,
})

