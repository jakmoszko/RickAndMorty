export const fetchCharactersData = () => {
  return fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(data => data.results.map(item => {
    return {
      id: item.id,
      name: item.name,
      img: item.image
    }
  }))
}

export const fetchCharacterById = (ids) => {
  console.log('przed', ids)
  const joinedIDs = ids.join();

  console.log('po', joinedIDs);

  return fetch(`https://rickandmortyapi.com/api/character/${joinedIDs}`)
  .then(response => response.json())
  .then(data => {
    if (ids.length === 1) {
      return [{
        id: data.id,
        name: data.name,
        img: data.image
      }]
    }

    return data.map(item => {
      return {
        id: item.id,
        name: item.name,
        img: item.image
      }
    })
  })
}