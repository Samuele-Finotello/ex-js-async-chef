async function fetchJson(url) {
  const response = await fetch(url);
  const object = await response.json();
  return object;
}

async function getChefBirthday(id) {
  let recipe;

  try {
    recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`)
  } catch (error) {
    throw new Error(`Non posso recuperare la ricetta con id ${id}`)
  }

  if (recipe.message) {
    throw new Error(`Ricetta con id ${id} non trovata`)
  }

  const userId = recipe.userId;

  let chef;

  try {
    chef = await fetchJson(`https://dummyjson.com/users/${userId}`)
  } catch (error) {
    throw new Error(`Non posso recuperare lo chef con id ${userId}`)
  }

  if (chef.message) {
    throw new Error(`Chef con id ${userId} non trovato`)
  }

  return chef.birthDate;
}

(async () => {
  try {
    const chefBirthday = await getChefBirthday(4);
    const formattedChefBirthday = dayjs(chefBirthday).format('DD/MM/YYYY')
    console.log('Data di nascita dello chef: ', formattedChefBirthday)
  } catch (error) {
    console.error(error)
  }
})();