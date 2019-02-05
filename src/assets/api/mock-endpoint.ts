export const endpoint: any = {
  title: 'Add new user',
  url: 'https://jsonplaceholder.typicode.com/',
  method: 'POST',
  headers: {
    Authorization: 'Bearer eawke!ddxaweaarglebargleaw,1',
    'Content-Type': 'application/json'
  },
  body: [
    {
      name: 'email',
      type: 'email',
      max: 24,
      min: 3,
    },
    {
      name: 'full-name',
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      name: 'phone',
      type: 'tel',
      pattern: '/\d\d\d-\d\d\d\d/',
    },
  ]
}